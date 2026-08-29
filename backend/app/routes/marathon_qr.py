"""WeChat group QR codes and photographer portraits for the Chicago Marathon
pages, hosted on SmugMug.

The user replaces these photos in place on SmugMug (same SmugMug page URL,
new image underneath), so these routes just re-resolve on a short cache
cycle and redirect <img> requests straight to SmugMug's CDN — no code change
or deploy needed to refresh a QR code or swap a portrait.

Keys are looked up from a fixed, backend-owned dict rather than accepting an
arbitrary SmugMug URL from the frontend, so this can't be used to make the
server fetch arbitrary attacker-supplied URLs (SSRF).
"""

from flask import Blueprint, abort, current_app, redirect

from app.services.smugmug_api import resolve_smug_display_url

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
}

PHOTOGRAPHER_PHOTO_SMUGMUG_PAGE_URLS = {
    "yun-oldshue": "https://chirunners.smugmug.com/Website/Photographer/i-xjTnrCr/A",
    "yansong-lin": "https://chirunners.smugmug.com/Website/Photographer/i-LwwD52n/A",
}


def _resolve_and_redirect(page_url: str):
    resolved = resolve_smug_display_url(
        current_app, page_url, ttl_override_seconds=_SHORT_CACHE_TTL_SECONDS
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
