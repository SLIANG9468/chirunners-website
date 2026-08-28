"""WeChat group QR codes for the Chicago Marathon pages, hosted on SmugMug.

The user replaces the photo in place on SmugMug each week (same SmugMug page
URL, new image underneath), so this route just re-resolves on a short cache
cycle and redirects <img> requests straight to SmugMug's CDN — no code change
or deploy needed for a weekly QR refresh.
"""

from flask import Blueprint, abort, current_app, redirect

from app.services.smugmug_api import resolve_smug_display_url

marathon_qr_bp = Blueprint("marathon_qr", __name__)

# Re-resolve every hour rather than the ~10-year default used for Chi Has Been
# Here photos, since these images are expected to change weekly.
_QR_CACHE_TTL_SECONDS = 3600

QR_SMUGMUG_PAGE_URLS = {
    "chicago-marathon-hub": "https://chirunners.smugmug.com/Website/QRCode/i-FxdBS89/A",
    "hotel": "https://chirunners.smugmug.com/Website/QRCode/i-7hvpRTc/A",
    "carb-loading-dinner": "https://chirunners.smugmug.com/Website/QRCode/i-4Gwztnj/A",
    "volunteer": "https://chirunners.smugmug.com/Website/QRCode/i-t59mLvq/A",
    "photography": "https://chirunners.smugmug.com/Website/QRCode/i-HG7NSMt/A",
}


@marathon_qr_bp.route("/api/marathon-welcome/qr/<key>", methods=["GET"])
def get_marathon_qr(key: str):
    page_url = QR_SMUGMUG_PAGE_URLS.get(key)
    if not page_url:
        abort(404)

    resolved = resolve_smug_display_url(
        current_app, page_url, ttl_override_seconds=_QR_CACHE_TTL_SECONDS
    )
    if not resolved:
        abort(404)

    response = redirect(resolved, code=302)
    response.headers["Cache-Control"] = "no-store"
    return response
