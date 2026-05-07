import json
from pathlib import Path

from flask import Blueprint, abort, current_app, jsonify, send_from_directory

from app.extensions import db
from app.services import chi_checkins_db as chk

chi_has_been_here_bp = Blueprint("chi_has_been_here", __name__)


def _source_data_path() -> Path:
    return Path(current_app.config["CHI_HAS_BEEN_HERE_SOURCE_FILE"]).resolve()


def _locations_data_path() -> Path:
    return Path(current_app.config["CHI_HAS_BEEN_HERE_LOCATIONS_FILE"]).resolve()


def _photo_base_dir() -> Path:
    return Path(current_app.config["CHI_HAS_BEEN_HERE_PHOTO_DIR"]).resolve()


def _write_json_backup(path: Path, data) -> None:
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


@chi_has_been_here_bp.route("/api/chi-has-been-here/locations", methods=["GET"])
def list_locations():
    summary, count = chk.locations_summary_from_db()
    return jsonify({"locations": summary, "count": count})


@chi_has_been_here_bp.route(
    "/api/chi-has-been-here/locations/<location_id>/photos", methods=["GET"]
)
def location_photos(location_id: str):
    payload = chk.photos_payload_for_city(location_id)
    if not payload:
        abort(404)
    return jsonify(payload)


@chi_has_been_here_bp.route(
    "/media/chi-has-been-here/<location_id>/<filename>", methods=["GET"]
)
def media_photo(location_id: str, filename: str):
    base_dir = _photo_base_dir()
    location_dir = (base_dir / location_id).resolve()
    requested_file = (location_dir / filename).resolve()

    if base_dir not in requested_file.parents:
        abort(404)
    if not requested_file.is_file():
        abort(404)

    return send_from_directory(str(location_dir), filename)


@chi_has_been_here_bp.route("/api/chi-has-been-here/geocode-refresh", methods=["POST"])
def geocode_refresh():
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
    _write_json_backup(_locations_data_path(), normalized)
    return jsonify({"status": "ok", "locations": len(normalized), "geocoded": geocoded})


@chi_has_been_here_bp.route("/api/chi-has-been-here/locations-refresh", methods=["POST"])
def locations_refresh():
    """Rebuild visits from source JSON; reuse lat/lng from the database when possible.

    Also writes `chi_has_been_here_locations.json` as a backup snapshot of the merged result.
    """
    source_rows = chk.read_json_optional(_source_data_path())
    normalized = chk.normalize_source_rows(source_rows)
    merged, stats = chk.merge_normalized_with_db_coordinates(normalized, db.session)
    chk.write_normalized_locations_to_db(merged)
    _write_json_backup(_locations_data_path(), merged)
    return jsonify(
        {
            "status": "ok",
            "locations": len(merged),
            **stats,
        }
    )
