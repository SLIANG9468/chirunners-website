"""WeChat group QR codes, photographer portraits, and event photos for the
Chicago Marathon pages, hosted on SmugMug.

The user replaces QR codes and portraits in place on SmugMug (same SmugMug
page URL, new image underneath), so those routes re-resolve on a short cache
cycle and redirect <img> requests straight to SmugMug's CDN — no code change
or deploy needed to refresh a QR code or swap a portrait. Past-event photos
(e.g. the carb-loading dinner gallery) are a fixed set that won't be swapped
in place, so those resolve on the long default TTL instead.

Keys are looked up from a fixed, backend-owned dict rather than accepting an
arbitrary SmugMug URL from the frontend, so this can't be used to make the
server fetch arbitrary attacker-supplied URLs (SSRF).
"""

import requests
from flask import Blueprint, Response, abort, current_app, redirect, request, stream_with_context

from app.services.smugmug_api import resolve_smug_display_url, resolve_smug_video_url

marathon_qr_bp = Blueprint("marathon_qr", __name__)

# Re-resolve every hour rather than the ~10-year default used for Chi Has Been
# Here photos, since these images are expected to change on a short cycle.
_SHORT_CACHE_TTL_SECONDS = 3600

QR_SMUGMUG_PAGE_URLS = {
    "chicago-marathon-hub": "https://chirunners.smugmug.com/Website/QRCode/i-FxdBS89/A",
    "hotel": "https://chirunners.smugmug.com/Website/QRCode/i-7hvpRTc/A",
    "carb-loading-dinner": "https://chirunners.smugmug.com/Website/QRCode/i-4Gwztnj/A",
    "volunteer": "https://chirunners.smugmug.com/Website/QRCode/i-t59mLvq/A",
    "photography": "https://chirunners.smugmug.com/Website/QRCode/i-HG7NSMt/A",
    "bus": "https://chirunners.smugmug.com/Website/QRCode/i-NqQJDF9/A",
}

PHOTOGRAPHER_PHOTO_SMUGMUG_PAGE_URLS = {
    "yun-oldshue": "https://chirunners.smugmug.com/Website/Photographer/i-xjTnrCr/A",
    "yansong-lin": "https://chirunners.smugmug.com/Website/Photographer/i-LwwD52n/A",
}

CARB_LOADING_PHOTO_SMUGMUG_PAGE_URLS = {
    "carb-loading-1": "https://chirunners.smugmug.com/Website/Website-photo/i-4Bbj6hL/A",
    "carb-loading-2": "https://chirunners.smugmug.com/Website/Website-photo/i-QT3s48x/A",
    "carb-loading-3": "https://chirunners.smugmug.com/Website/Website-photo/i-pD9hGXt/A",
    "carb-loading-4": "https://chirunners.smugmug.com/Website/Website-photo/i-8pFsrsM/A",
    "carb-loading-5": "https://chirunners.smugmug.com/Website/Website-photo/i-QZ6TsF2/A",
    "carb-loading-6": "https://chirunners.smugmug.com/Website/Website-photo/i-hVfTszz/A",
}

SPEAKER_PHOTO_SMUGMUG_PAGE_URLS = {
    "danrui": "https://chirunners.smugmug.com/Website/Website-photo/i-mtzM4wN/A",
    "haiting": "https://chirunners.smugmug.com/Website/Website-photo/i-v79Srxp/A",
    "tian-wang": "https://chirunners.smugmug.com/Website/Website-photo/i-26P2Bwp/A",
}

HERO_VIDEO_SMUGMUG_PAGE_URLS = {
    "carb-loading": "https://chirunners.smugmug.com/Website/Videos/2026-Video/i-VqKSJnh/A",
}

# SmugMug rejects direct video requests that don't carry its own Referer, so
# (unlike photos) we can't just redirect the browser — we proxy the bytes
# through this server instead, forwarding Range so seeking/scrubbing works.
_VIDEO_FETCH_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
_VIDEO_REFERER = "https://chirunners.smugmug.com/"
_VIDEO_PASSTHROUGH_HEADERS = ("Content-Type", "Content-Length", "Content-Range", "Accept-Ranges")


def _resolve_and_redirect(page_url: str, ttl_override_seconds: int | None = _SHORT_CACHE_TTL_SECONDS):
    resolved = resolve_smug_display_url(
        current_app, page_url, ttl_override_seconds=ttl_override_seconds
    )
    if not resolved:
        abort(404)

    response = redirect(resolved, code=302)
    response.headers["Cache-Control"] = "no-store"
    return response


@marathon_qr_bp.route("/api/marathon-welcome/qr/<key>", methods=["GET"])
def get_marathon_qr(key: str):
    page_url = QR_SMUGMUG_PAGE_URLS.get(key)
    if not page_url:
        abort(404)
    return _resolve_and_redirect(page_url)


@marathon_qr_bp.route("/api/marathon-welcome/photographer-photo/<key>", methods=["GET"])
def get_photographer_photo(key: str):
    page_url = PHOTOGRAPHER_PHOTO_SMUGMUG_PAGE_URLS.get(key)
    if not page_url:
        abort(404)
    return _resolve_and_redirect(page_url)


@marathon_qr_bp.route("/api/marathon-welcome/carb-loading-photo/<key>", methods=["GET"])
def get_carb_loading_photo(key: str):
    page_url = CARB_LOADING_PHOTO_SMUGMUG_PAGE_URLS.get(key)
    if not page_url:
        abort(404)
    return _resolve_and_redirect(page_url, ttl_override_seconds=None)


@marathon_qr_bp.route("/api/marathon-welcome/speaker-photo/<key>", methods=["GET"])
def get_speaker_photo(key: str):
    page_url = SPEAKER_PHOTO_SMUGMUG_PAGE_URLS.get(key)
    if not page_url:
        abort(404)
    return _resolve_and_redirect(page_url)


@marathon_qr_bp.route("/api/marathon-welcome/hero-video/<key>", methods=["GET"])
def get_hero_video(key: str):
    page_url = HERO_VIDEO_SMUGMUG_PAGE_URLS.get(key)
    if not page_url:
        abort(404)

    video_url = resolve_smug_video_url(current_app, page_url)
    if not video_url:
        abort(404)

    proxy_headers = {"User-Agent": _VIDEO_FETCH_UA, "Referer": _VIDEO_REFERER}
    range_header = request.headers.get("Range")
    if range_header:
        proxy_headers["Range"] = range_header

    try:
        upstream = requests.get(video_url, headers=proxy_headers, stream=True, timeout=30)
    except requests.RequestException:
        abort(502)

    response_headers = {
        name: upstream.headers[name]
        for name in _VIDEO_PASSTHROUGH_HEADERS
        if name in upstream.headers
    }
    response_headers["Cache-Control"] = "public, max-age=86400"

    return Response(
        stream_with_context(upstream.iter_content(chunk_size=64 * 1024)),
        status=upstream.status_code,
        headers=response_headers,
    )
