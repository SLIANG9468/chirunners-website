"""SmugMug API v2 helpers: OAuth-signed requests and image URL resolution."""

from __future__ import annotations

import re
import threading
import time
from urllib.parse import parse_qsl, quote, urlencode, urlsplit, urlunsplit

import requests
from requests_oauthlib import OAuth1Session

API_ORIGIN = "https://api.smugmug.com"
OAUTH_ORIGIN = "https://secure.smugmug.com"
REQUEST_TOKEN_URL = OAUTH_ORIGIN + "/services/oauth/1.0a/getRequestToken"
ACCESS_TOKEN_URL = OAUTH_ORIGIN + "/services/oauth/1.0a/getAccessToken"
AUTHORIZE_URL = OAUTH_ORIGIN + "/services/oauth/1.0a/authorize"

_cache_lock = threading.Lock()
_url_cache: dict[str, tuple[float, str | None]] = {}

_auth_lock = threading.Lock()
_auth_nickname_attempted = False
_auth_nickname_cached: str | None = None


def smug_credentials_configured(flask_app) -> bool:
    """True when Key, Secret, and access token pair look present."""
    cfg = flask_app.config
    key = (cfg.get("SMUGMUG_API_KEY") or "").strip()
    secret = (cfg.get("SMUGMUG_API_SECRET") or "").strip()
    atk = (cfg.get("SMUGMUG_ACCESS_TOKEN") or "").strip()
    ats = (cfg.get("SMUGMUG_ACCESS_TOKEN_SECRET") or "").strip()
    return bool(key and secret and atk and ats)


def oauth_session(flask_app) -> OAuth1Session | None:
    if not smug_credentials_configured(flask_app):
        return None
    cfg = flask_app.config
    return OAuth1Session(
        (cfg["SMUGMUG_API_KEY"] or "").strip(),
        client_secret=(cfg["SMUGMUG_API_SECRET"] or "").strip(),
        resource_owner_key=(cfg["SMUGMUG_ACCESS_TOKEN"] or "").strip(),
        resource_owner_secret=(cfg["SMUGMUG_ACCESS_TOKEN_SECRET"] or "").strip(),
        signature_method="HMAC-SHA1",
    )


def augment_authorize_url(base_url: str, *, access: str = "Full", permissions: str = "Read") -> str:
    parts = urlsplit(base_url)
    query = list(parse_qsl(parts.query, keep_blank_values=True))
    query.extend([("Access", access), ("Permissions", permissions)])
    return urlunsplit(
        (
            parts.scheme,
            parts.netloc,
            parts.path,
            urlencode(query),
            parts.fragment,
        )
    )


def run_oauth_oob_interactive(flask_app) -> None:
    """Print authorize URL + prompt for pin; echoes env lines for Render / `.env`."""
    import click

    cfg = flask_app.config
    ck = (cfg.get("SMUGMUG_API_KEY") or "").strip()
    cs = (cfg.get("SMUGMUG_API_SECRET") or "").strip()
    if not ck or not cs:
        raise click.UsageError(
            "Set SMUGMUG_API_KEY and SMUGMUG_API_SECRET in environment or `.env`, then rerun."
        )

    oauth = OAuth1Session(ck, client_secret=cs, callback_uri="oob", signature_method="HMAC-SHA1")
    oauth.fetch_request_token(REQUEST_TOKEN_URL)
    bare_auth = oauth.authorization_url(AUTHORIZE_URL)
    auth_url = augment_authorize_url(bare_auth, access="Full", permissions="Read")
    click.echo("Authorize this app in a browser while logged into the owning SmugMug account:\n")
    click.echo(auth_url)
    click.echo("")
    verifier = click.prompt(
        "Enter the six-digit verification code shown by SmugMug after you authorize",
        type=str,
    ).strip()

    oauth.fetch_access_token(ACCESS_TOKEN_URL, verifier=verifier)
    final = oauth.token or {}
    at = (final.get("oauth_token") or "").strip()
    ats = (final.get("oauth_token_secret") or "").strip()
    if not at or not ats:
        raise click.UsageError(
            "SmugMug did not return access tokens; verify the pin and credentials."
        )
    click.echo("")
    click.echo("Paste into Render Dashboard → chirunners-api → Environment:")
    click.echo("")
    click.echo(f"SMUGMUG_ACCESS_TOKEN={at}")
    click.echo(f"SMUGMUG_ACCESS_TOKEN_SECRET={ats}")


def _cache_ttl_seconds(flask_app) -> int:
    raw = flask_app.config.get("SMUGMUG_IMAGE_URL_CACHE_SECONDS")
    try:
        n = int(raw) if raw is not None else 1800
    except (TypeError, ValueError):
        n = 1800
    return max(0, n)


def _absolute_uri(uri_fragment: str) -> str:
    u = uri_fragment.strip()
    if u.startswith("http://") or u.startswith("https://"):
        return u
    if u.startswith("/"):
        return f"{API_ORIGIN}{u}"
    return f"{API_ORIGIN}/{u.lstrip('/')}"


def _candidate_image_api_urls(raw: str) -> list[str]:
    """Build GET URLs to try; DB may store bare ImageKey or a full /api/v2/... path."""
    s = raw.strip()
    if not s:
        return []
    out: list[str] = []
    seen: set[str] = set()

    def add(u: str) -> None:
        u = u.strip()
        if u and u not in seen:
            seen.add(u)
            out.append(u)

    if s.startswith("https://api.smugmug.com"):
        add(s.split("?", 1)[0])
        return out
    if s.startswith("/api/v2/"):
        add(API_ORIGIN + s.split("?", 1)[0])
        return out
    # Pasted path without leading slash, or embedded in a longer string
    if "/api/v2/" in s:
        idx = s.find("/api/v2/")
        tail = s[idx:].split("?", 1)[0].split("#", 1)[0]
        add(API_ORIGIN + tail)
        return out
    # Bare key: primary Image endpoint (works for global ImageKey)
    add(f"{API_ORIGIN}/api/v2/image/{s}")
    # SmugMug often uses a trailing version segment (e.g. …-0) on Image keys
    if not re.search(r"-\d+$", s):
        add(f"{API_ORIGIN}/api/v2/image/{s}-0")
    return out


def _image_block_from_payload(payload: dict) -> dict:
    resp = payload.get("Response") or {}
    return resp.get("Image") or resp.get("AlbumImage") or {}


def _auth_user_nickname(sess: OAuth1Session, log) -> str | None:
    """OAuth user NickName for nicknameurlpathlookup (cached per process)."""
    global _auth_nickname_attempted, _auth_nickname_cached  # noqa: PLW0603
    with _auth_lock:
        if _auth_nickname_attempted:
            return _auth_nickname_cached
        _auth_nickname_attempted = True
        r = sess.get(
            f"{API_ORIGIN}/api/v2!authuser",
            headers={"Accept": "application/json"},
            timeout=30,
        )
        if not r.ok:
            if log is not None:
                log.warning(
                    "SmugMug !authuser failed status=%s body[:200]=%r",
                    r.status_code,
                    (r.text or "")[:200],
                )
            _auth_nickname_cached = None
            return None
        try:
            payload = r.json()
        except ValueError:
            _auth_nickname_cached = None
            return None
        user = payload.get("Response", {}).get("User") or {}
        nick = user.get("NickName") or user.get("Nickname")
        if isinstance(nick, str) and nick.strip():
            _auth_nickname_cached = nick.strip()
            return _auth_nickname_cached
        _auth_nickname_cached = None
        return None


def _object_from_nickname_urlpath_payload(payload: dict) -> dict | None:
    """Pick the best object from urlpath lookup (prefer image-like over Folder)."""
    resp = payload.get("Response") or {}
    # Prefer explicit image types; Locator order often lists Folder before Album.
    for k in ("AlbumImage", "Image", "Album", "Folder", "Page"):
        obj = resp.get(k)
        if isinstance(obj, dict) and obj:
            return obj
    loc = resp.get("Locator")
    if isinstance(loc, str):
        for part in loc.replace(" ", "").split(","):
            if not part:
                continue
            obj = resp.get(part)
            if isinstance(obj, dict) and obj:
                return obj
    return None


def _urlpath_lookup_payload(sess: OAuth1Session, nick: str, urlpath: str, log) -> dict | None:
    """GET nicknameurlpathlookup; return parsed JSON dict or None."""
    r = sess.get(
        f"{API_ORIGIN}/api/v2!nicknameurlpathlookup",
        params={"nickname": nick, "urlpath": urlpath},
        headers={"Accept": "application/json"},
        timeout=45,
    )
    if not r.ok:
        if log is not None:
            log.warning(
                "SmugMug nicknameurlpathlookup failed nick=%r urlpath=%r status=%s body[:200]=%r",
                nick,
                urlpath,
                r.status_code,
                (r.text or "")[:200],
            )
        return None
    try:
        payload = r.json()
    except ValueError:
        return None
    try:
        ok = int(payload.get("Code", 0)) == 200
    except (TypeError, ValueError):
        ok = payload.get("Code") == 200
    if not ok:
        return None
    return payload


def _user_urlpath_lookup_payload(sess: OAuth1Session, nick: str, urlpath: str, log) -> dict | None:
    """Alternate: GET /api/v2/user/{nick}!urlpathlookup?urlpath=…"""
    path_nick = quote(nick, safe="")
    r = sess.get(
        f"{API_ORIGIN}/api/v2/user/{path_nick}!urlpathlookup",
        params={"urlpath": urlpath},
        headers={"Accept": "application/json"},
        timeout=45,
    )
    if not r.ok:
        if log is not None:
            log.warning(
                "SmugMug user urlpathlookup failed nick=%r urlpath=%r status=%s body[:200]=%r",
                nick,
                urlpath,
                r.status_code,
                (r.text or "")[:200],
            )
        return None
    try:
        payload = r.json()
    except ValueError:
        return None
    try:
        ok = int(payload.get("Code", 0)) == 200
    except (TypeError, ValueError):
        ok = payload.get("Code") == 200
    if not ok:
        return None
    return payload


def _albumimages_pages(sess: OAuth1Session, start_uri: str) -> list[dict]:
    """Flatten paginated AlbumImage list from album !images."""
    out: list[dict] = []
    uri = start_uri
    for _ in range(80):
        r = sess.get(
            _absolute_uri(uri),
            headers={"Accept": "application/json"},
            timeout=45,
        )
        if not r.ok:
            break
        try:
            payload = r.json()
        except ValueError:
            break
        resp = payload.get("Response") or {}
        chunk = resp.get("AlbumImage")
        if isinstance(chunk, list):
            out.extend(chunk)
        elif isinstance(chunk, dict):
            out.append(chunk)
        pages = resp.get("Pages") or {}
        nxt = pages.get("NextPage")
        if isinstance(nxt, str) and nxt.strip():
            uri = nxt.strip()
            if not uri.startswith("http"):
                uri = _absolute_uri(uri)
            continue
        break
    return out


def _resolve_via_album_image_scan(
    sess: OAuth1Session, flask_app, image_key: str, log
) -> str | None:
    """Lookup album by folder path only, then find AlbumImage whose UrlPath/Uri contains i-… key."""
    folder = (flask_app.config.get("SMUGMUG_GALLERY_FOLDER_PATH") or "").strip()
    if not folder:
        return None
    ik = image_key.strip()
    if not ik:
        return None
    nick = _auth_user_nickname(sess, log)
    if not nick:
        return None
    urlpath = folder.strip("/")
    payload = _urlpath_lookup_payload(sess, nick, urlpath, log) or _user_urlpath_lookup_payload(
        sess, nick, urlpath, log
    )
    if not payload:
        return None
    album = (payload.get("Response") or {}).get("Album")
    if not isinstance(album, dict):
        return None
    uris = album.get("Uris") if isinstance(album.get("Uris"), dict) else {}
    aim = uris.get("AlbumImages") or uris.get("Images")
    start = None
    if isinstance(aim, dict):
        u = aim.get("Uri")
        if isinstance(u, str) and u.strip():
            start = u.strip()
    if not start and isinstance(album.get("Uri"), str) and album["Uri"].strip():
        start = album["Uri"].strip().rstrip("/") + "!images"
    if not start:
        return None
    for row in _albumimages_pages(sess, start):
        if not isinstance(row, dict):
            continue
        up = str(row.get("UrlPath") or "")
        uri = str(row.get("Uri") or "")
        if ik in up or ik in uri or up.rstrip("/").endswith("/" + ik):
            got = _extract_display_url_from_image(sess, row)
            if got:
                return got
    return None


def _resolve_via_folder_urlpath_lookup(
    sess: OAuth1Session, flask_app, image_key: str, log
) -> str | None:
    """Resolve organize-style keys (e.g. i-xxx) using nickname + folder urlpath."""
    folder = (flask_app.config.get("SMUGMUG_GALLERY_FOLDER_PATH") or "").strip()
    if not folder:
        return None
    ik = image_key.strip()
    if not ik:
        return None
    urlpath_full = f"{folder.strip('/')}/{ik.strip('/')}"
    nick = _auth_user_nickname(sess, log)
    if not nick:
        return None

    for urlpath in (urlpath_full, f"{urlpath_full}-0"):
        for payload in (
            _urlpath_lookup_payload(sess, nick, urlpath, log),
            _user_urlpath_lookup_payload(sess, nick, urlpath, log),
        ):
            if not payload:
                continue
            obj = _object_from_nickname_urlpath_payload(payload)
            if not obj:
                continue
            got = _extract_display_url_from_image(sess, obj)
            if got:
                return got

    return _resolve_via_album_image_scan(sess, flask_app, ik, log)


def _extract_display_url_from_image(sess: OAuth1Session, img: dict) -> str | None:
    archived = img.get("ArchivedUri")
    if isinstance(archived, str) and archived.startswith("http"):
        return archived

    uris = img.get("Uris") if isinstance(img.get("Uris"), dict) else {}
    preferred_keys = ["LargestImage", "ImageDownload", "LargeImage", "LargestVideo"]
    preferred = [k for k in preferred_keys if k in uris]

    for name in preferred:
        link = uris.get(name)
        if not isinstance(link, dict):
            continue
        suburi = link.get("Uri")
        if not isinstance(suburi, str) or not suburi.strip():
            continue
        sub = sess.get(
            _absolute_uri(suburi),
            headers={"Accept": "application/json"},
            timeout=45,
        )
        if not sub.ok:
            continue
        block = sub.json().get("Response", {}).get(name) or {}
        url = block.get("Url")
        if isinstance(url, str) and url.startswith("http"):
            return url

    isd = uris.get("ImageSizeDetails")
    if isinstance(isd, dict) and isinstance(isd.get("Uri"), str):
        sub = sess.get(
            _absolute_uri(isd["Uri"]),
            headers={"Accept": "application/json"},
            timeout=45,
        )
        if sub.ok:
            detail = sub.json().get("Response", {}).get("ImageSizeDetails")
            sizes: list = []
            if isinstance(detail, dict):
                sized = detail.get("ImageSizes")
                if isinstance(sized, dict) and isinstance(sized.get("ImageSize"), list):
                    sizes = sized["ImageSize"]
            elif isinstance(detail, list):
                sizes = detail
            best_url = None
            best_px = -1
            for row in sizes:
                if not isinstance(row, dict):
                    continue
                u = row.get("Url") or row.get("DownloadUri")
                if not isinstance(u, str) or not u.startswith("http"):
                    continue
                w = row.get("Width")
                try:
                    wn = int(w) if w is not None else 0
                except (TypeError, ValueError):
                    wn = 0
                if wn >= best_px:
                    best_px = wn
                    best_url = u
            if best_url:
                return best_url

    return None


def fetch_image_display_url(
    sess: OAuth1Session, image_key: str, log=None, flask_app=None
) -> str | None:
    """Return a browser-ready https URL for the image, or None."""
    ik = image_key.strip()
    if not ik:
        return None

    last_error: tuple[str, int, str] | None = None
    for get_url in _candidate_image_api_urls(ik):
        r = sess.get(get_url, headers={"Accept": "application/json"}, timeout=45)
        if r.status_code == 404:
            last_error = (get_url, 404, "")
            continue
        if not r.ok:
            last_error = (get_url, r.status_code, (r.text or "")[:300])
            continue
        try:
            payload = r.json()
        except ValueError:
            last_error = (get_url, r.status_code, "non-json body")
            continue

        img = _image_block_from_payload(payload)
        if not img:
            last_error = (get_url, r.status_code, "empty Image/AlbumImage in JSON")
            continue

        resolved = _extract_display_url_from_image(sess, img)
        if resolved:
            return resolved
        last_error = (get_url, r.status_code, "no Url in Uris/ArchivedUri")

    if flask_app is not None:
        via_path = _resolve_via_folder_urlpath_lookup(sess, flask_app, ik, log)
        if via_path:
            return via_path

    if log is not None and last_error:
        gu, code, snippet = last_error
        log.warning(
            "SmugMug image resolve failed key=%r last_url=%s status=%s detail=%r",
            ik,
            gu,
            code,
            snippet,
        )
    return None


def _smug_resolve_cache_key(flask_app, image_slug: str) -> str:
    """Include gallery folder in cache key so adding SMUGMUG_* path invalidates stale None entries."""
    folder = (flask_app.config.get("SMUGMUG_GALLERY_FOLDER_PATH") or "").strip()
    if folder:
        return f"{image_slug}\x1f{folder}"
    return image_slug


def resolve_smug_display_url(flask_app, image_key: str | None) -> str | None:
    """OAuth-resolve `image_key`; cached per key for SMUGMUG_IMAGE_URL_CACHE_SECONDS."""
    if not image_key:
        return None
    if not isinstance(image_key, str):
        return None
    slug = image_key.strip()
    if not slug:
        return None

    sess = oauth_session(flask_app)
    if sess is None:
        return None

    ttl = _cache_ttl_seconds(flask_app)
    now = time.monotonic()
    cache_key = _smug_resolve_cache_key(flask_app, slug)

    log = getattr(flask_app, "logger", None)
    want_log = getattr(flask_app, "debug", False) or bool(
        flask_app.config.get("SMUGMUG_LOG_RESOLVE_FAILURES")
    )
    log_resolve = log if want_log else None

    if ttl <= 0:
        return fetch_image_display_url(sess, slug, log=log_resolve, flask_app=flask_app)

    with _cache_lock:
        hit = _url_cache.get(cache_key)
        if hit is not None:
            expiry, cached = hit
            if expiry > now:
                return cached

    resolved = fetch_image_display_url(sess, slug, log=log_resolve, flask_app=flask_app)

    with _cache_lock:
        _url_cache[cache_key] = (now + ttl, resolved)

    return resolved
