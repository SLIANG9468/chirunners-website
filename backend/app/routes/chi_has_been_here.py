from pathlib import Path

from flask import Blueprint, abort, current_app, jsonify

from app.extensions import db
from app.services import chi_checkins_db as chk

chi_has_been_here_bp = Blueprint("chi_has_been_here", __name__)


def _source_data_path() -> Path:
    return Path(current_app.config["CHI_HAS_BEEN_HERE_SOURCE_FILE"]).resolve()


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


@chi_has_been_here_bp.route("/api/chi-has-been-here/geocode-refresh", methods=["POST"])
def geocode_refresh():
    """Legacy: read CHI_HAS_BEEN_HERE_SOURCE_FILE, geocode cities, write Postgres only."""
    source_rows = chk.read_json_optional(_source_data_path())
    normalized = chk.normalize_source_rows(source_rows)

    token = current_app.config.get("MAPBOX_ACCESS_TOKEN", "")
    geocoded = 0
    for loc in normalized:
        lat, lng = chk.geocode_city_country(loc["city"], loc["country"], token)
        loc["lat"] = lat
        loc["lng"] = lng
        geocoded += 1

    chk.write_normalized_locations_to_db(normalized)
    return jsonify({"status": "ok", "locations": len(normalized), "geocoded": geocoded})


@chi_has_been_here_bp.route("/api/chi-has-been-here/locations-refresh", methods=["POST"])
def locations_refresh():
    """Legacy: rebuild Postgres from CHI_HAS_BEEN_HERE_SOURCE_FILE; reuse lat/lng from DB when possible."""
    source_rows = chk.read_json_optional(_source_data_path())
    normalized = chk.normalize_source_rows(source_rows)
    merged, stats = chk.merge_normalized_with_db_coordinates(normalized, db.session)
    chk.write_normalized_locations_to_db(merged)
    return jsonify(
        {
            "status": "ok",
            "locations": len(merged),
            **stats,
        }
    )
