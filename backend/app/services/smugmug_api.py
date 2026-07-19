"""Public SmugMug photo URLs for Chi-has-been-here: gallery page → direct image (og:image), no OAuth."""

from __future__ import annotations

import re
import threading
import time

import requests

_cache_lock: threading.Lock | None = None
_url_cache: dict[str, tuple[float, str | None]] = {}


def _cache_lock_for_worker() -> threading.Lock:
    """Create the lock in each gunicorn worker (safe if --preload is disabled)."""
    global _cache_lock
    if _cache_lock is None:
        _cache_lock = threading.Lock()
    return _cache_lock

_DEFAULT_GALLERY_FOLDER = "Website/ChiHasBeenHere"

# SmugMug 相册页是 HTML；浏览器能打开，但 <img> 需要真实图片地址（og:image 指向 photos.smugmug.com 的 jpg）。
_OG_IMAGE_RE = re.compile(
    r'property="og:image"\s+content="(https://[^"]+)"',
    re.I,
)

_FETCH_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

# ~10 years (365-day years) when SMUGMUG_IMAGE_URL_CACHE_SECONDS is unset.
_DEFAULT_SMUG_CACHE_TTL_S = 10 * 365 * 24 * 3600
# Monotonic expiry far in the future: env 0 / negative / inf = cache for process lifetime.
_INFINITE_SMUG_CACHE_TTL_S = 10**12
# Do not pin failed resolves (e.g. temporarily unlisted gallery) for the success TTL.
_FAILED_RESOLVE_CACHE_TTL_S = 5 * 60


def _gallery_folder(flask_app) -> str:
    raw = (flask_app.config.get("SMUGMUG_GALLERY_FOLDER_PATH") or "").strip().strip("/")
    return raw or _DEFAULT_GALLERY_FOLDER


def _public_gallery_page_url(flask_app, image_key: str) -> str | None:
    nick = (flask_app.config.get("SMUGMUG_NICKNAME") or "").strip()
    if not nick:
        return None
    key = image_key.strip()
    if not key:
        return None
    folder = _gallery_folder(flask_app)
    path = f"{folder}/{key.strip('/')}"
    return f"https://{nick}.smugmug.com/{path}"


def _looks_like_direct_cdn_image(url: str) -> bool:
    if "photos.smugmug.com" in url:
        return True
    base = url.split("?", 1)[0].lower()
    return base.endswith((".jpg", ".jpeg", ".webp", ".png", ".gif"))


def _og_image_from_smug_page(page_url: str, log) -> str | None:
    try:
        r = requests.get(
            page_url,
            headers={
                "User-Agent": _FETCH_UA,
                "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
            },
            timeout=22,
        )
    except requests.RequestException as exc:
        if log is not None:
            log.warning("SmugMug 页面请求失败 url=%s err=%s", page_url, exc)
        return None
    if not r.ok:
        if log is not None:
            log.warning("SmugMug 页面 HTTP 错误 url=%s status=%s", page_url, r.status_code)
        return None
    m = _OG_IMAGE_RE.search(r.text)
    if not m:
        if log is not None:
            log.warning("SmugMug 页面未找到 og:image url=%s", page_url)
        return None
    return m.group(1).replace("&amp;", "&")


def _resolve_to_direct_image_url(flask_app, slug: str, log) -> str | None:
    """返回可在 <img src> 中使用的 https 图片 URL。"""
    slug = slug.strip()
    if not slug:
        return None

    if slug.startswith("http://") or slug.startswith("https://"):
        if _looks_like_direct_cdn_image(slug):
            return slug
        return _og_image_from_smug_page(slug, log)

    page_url = _public_gallery_page_url(flask_app, slug)
    if not page_url:
        return None
    return _og_image_from_smug_page(page_url, log)


def _cache_ttl_seconds(flask_app) -> int:
    """Positive = TTL seconds. Unset = long default (~10y). 0, negative, inf = effectively infinite."""
    raw = flask_app.config.get("SMUGMUG_IMAGE_URL_CACHE_SECONDS")
    if raw is None:
        return _DEFAULT_SMUG_CACHE_TTL_S
    if isinstance(raw, int):
        if raw == 0 or raw < 0:
            return _INFINITE_SMUG_CACHE_TTL_S
        return raw
    s = str(raw).strip()
    if not s:
        return _DEFAULT_SMUG_CACHE_TTL_S
    low = s.lower()
    if low in ("0", "inf", "infinite", "forever"):
        return _INFINITE_SMUG_CACHE_TTL_S
    try:
        n = int(s, 10)
    except (TypeError, ValueError):
        return _DEFAULT_SMUG_CACHE_TTL_S
    if n == 0 or n < 0:
        return _INFINITE_SMUG_CACHE_TTL_S
    return n


def _smug_resolve_cache_key(flask_app, image_slug: str) -> str:
    folder = _gallery_folder(flask_app)
    nick = (flask_app.config.get("SMUGMUG_NICKNAME") or "").strip()
    return f"{nick}\x1f{folder}\x1f{image_slug}"


def resolve_smug_display_url(flask_app, image_key: str | None) -> str | None:
    """解析 SmugMug：相册页拉取 og:image，得到真实图片 URL（供 <img> 使用）。"""
    if not image_key:
        return None
    if not isinstance(image_key, str):
        return None
    slug = image_key.strip()
    if not slug:
        return None

    ttl = _cache_ttl_seconds(flask_app)
    now = time.monotonic()
    cache_key = _smug_resolve_cache_key(flask_app, slug)

    log = getattr(flask_app, "logger", None)
    want_log = getattr(flask_app, "debug", False) or bool(
        flask_app.config.get("SMUGMUG_LOG_RESOLVE_FAILURES")
    )
    log_resolve = log if want_log else None

    with _cache_lock_for_worker():
        hit = _url_cache.get(cache_key)
        if hit is not None:
            expiry, cached = hit
            if expiry > now:
                return cached

    resolved = _resolve_to_direct_image_url(flask_app, slug, log_resolve)
    store_ttl = ttl if resolved else min(ttl, _FAILED_RESOLVE_CACHE_TTL_S)

    with _cache_lock_for_worker():
        _url_cache[cache_key] = (now + store_ttl, resolved)

    return resolved
