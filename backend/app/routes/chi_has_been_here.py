from flask import Blueprint, abort, current_app, jsonify

from app.services import chi_checkins_db as chk

chi_has_been_here_bp = Blueprint("chi_has_been_here", __name__)


@chi_has_been_here_bp.route("/api/chi-has-been-here/locations", methods=["GET"])
def list_locations():
    summary, count = chk.locations_summary_from_db()
    return jsonify({"locations": summary, "count": count})


@chi_has_been_here_bp.route(
    "/api/chi-has-been-here/locations/<int:location_id>/photos", methods=["GET"]
)
def location_photos(location_id: int):
    payload = chk.photos_payload_for_city(location_id, current_app)
    if not payload:
        abort(404)
    return jsonify(payload)
