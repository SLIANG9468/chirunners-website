import json
import re
from pathlib import Path

import requests
from flask import Blueprint, abort, current_app, jsonify, send_from_directory

chi_has_been_here_bp = Blueprint("chi_has_been_here", __name__)


def _slugify_city_country(city: str, country: str) -> str:
    value = f"{city}-{country}".lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value


def _read_json(path: Path):
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def _write_json(path: Path, data) -> None:
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def _source_data_path() -> Path:
    return Path(current_app.config["CHI_HAS_BEEN_HERE_SOURCE_FILE"]).resolve()


def _locations_data_path() -> Path:
    return Path(current_app.config["CHI_HAS_BEEN_HERE_LOCATIONS_FILE"]).resolve()


def _photo_base_dir() -> Path:
    return Path(current_app.config["CHI_HAS_BEEN_HERE_PHOTO_DIR"]).resolve()


def _mapbox_token() -> str:
    return current_app.config.get("MAPBOX_ACCESS_TOKEN", "")


def _geocode_city_country(city: str, country: str) -> tuple[float, float]:
    token = _mapbox_token()
    if not token:
        raise RuntimeError("MAPBOX_ACCESS_TOKEN is not configured.")

    query = f"{city}, {country}"
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{query}.json"
    response = requests.get(
        url,
        params={"access_token": token, "limit": 1},
        timeout=10,
    )
    response.raise_for_status()
    data = response.json()
    features = data.get("features", [])
    if not features:
        raise RuntimeError(f"No geocoding result for {query}")

    lng, lat = features[0]["center"]
    return float(lat), float(lng)


def _normalize_source_to_locations(source_rows: list[dict]) -> list[dict]:
    by_location: dict[str, dict] = {}

    for row in source_rows:
        city = str(row.get("city", "")).strip()
        country = str(row.get("country", "")).strip()
        if not city or not country:
            continue

        location_id = _slugify_city_country(city, country)
        if location_id not in by_location:
            by_location[location_id] = {
                "id": location_id,
                "city": city,
                "country": country,
                "lat": None,
                "lng": None,
                "visits": [],
            }

        runner_name = row.get("runnerName", "")
        visit = {
            "date": row.get("date", ""),
            "type": row.get("type", ""),
            "filename": row.get("filename", ""),
            "runnerName": runner_name,
        }
        place_note = row.get("placeNote", "")
        if isinstance(place_note, str) and place_note.strip():
            visit["placeNote"] = place_note.strip()

        by_location[location_id]["visits"].append(visit)

    return sorted(by_location.values(), key=lambda x: (x["country"], x["city"]))


def _merge_locations_reusing_coords(
    source_rows: list[dict], previous_locations: list[dict]
) -> tuple[list[dict], dict]:
    """Rebuild visits from source; copy lat/lng from previous file when location id matches."""
    merged = _normalize_source_to_locations(source_rows)
    prev_by_id = {
        item["id"]: item
        for item in previous_locations
        if isinstance(item, dict) and item.get("id")
    }
    reused = 0
    need_geocode: list[str] = []
    for loc in merged:
        prev = prev_by_id.get(loc["id"])
        if prev and prev.get("lat") is not None and prev.get("lng") is not None:
            loc["lat"] = float(prev["lat"])
            loc["lng"] = float(prev["lng"])
            reused += 1
        else:
            loc["lat"] = None
            loc["lng"] = None
            need_geocode.append(loc["id"])
    return merged, {"reusedCoordinates": reused, "needGeocode": need_geocode}


@chi_has_been_here_bp.route("/api/chi-has-been-here/locations", methods=["GET"])
def list_locations():
    locations = _read_json(_locations_data_path())
    summary = [
        {
            "id": item["id"],
            "city": item["city"],
            "country": item["country"],
            "lat": item["lat"],
            "lng": item["lng"],
            "photoCount": len(item.get("visits", [])),
        }
        for item in locations
        if item.get("lat") is not None and item.get("lng") is not None
    ]
    return jsonify({"locations": summary, "count": len(summary)})


@chi_has_been_here_bp.route(
    "/api/chi-has-been-here/locations/<location_id>/photos", methods=["GET"]
)
def location_photos(location_id: str):
    locations = _read_json(_locations_data_path())
    selected = next((item for item in locations if item.get("id") == location_id), None)
    if not selected:
        abort(404)

    photos = []
    for visit in selected.get("visits", []):
        filename = visit.get("filename", "")
        if not filename:
            continue
        photo = {
            "date": visit.get("date", ""),
            "type": visit.get("type", ""),
            "filename": filename,
            # Return only one name field to the frontend.
            "runnerName": visit.get("runnerName", ""),
            "url": f"/media/chi-has-been-here/{location_id}/{filename}",
        }
        pn = visit.get("placeNote", "")
        if isinstance(pn, str) and pn.strip():
            photo["placeNote"] = pn.strip()
        photos.append(photo)

    return jsonify(
        {
            "id": selected["id"],
            "city": selected["city"],
            "country": selected["country"],
            "photos": photos,
            "count": len(photos),
        }
    )


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
    source_rows = _read_json(_source_data_path())
    locations = _normalize_source_to_locations(source_rows)

    geocoded = 0
    for location in locations:
        lat, lng = _geocode_city_country(location["city"], location["country"])
        location["lat"] = lat
        location["lng"] = lng
        geocoded += 1

    _write_json(_locations_data_path(), locations)
    return jsonify({"status": "ok", "locations": len(locations), "geocoded": geocoded})


@chi_has_been_here_bp.route("/api/chi-has-been-here/locations-refresh", methods=["POST"])
def locations_refresh():
    """Rebuild `visits` from source JSON; reuse lat/lng from existing locations file.

    Use this when Mapbox is unavailable or you only changed visits/filenames for known cities.
    For brand-new cities, run geocode-refresh when online, or set lat/lng manually.
    """
    source_rows = _read_json(_source_data_path())
    previous = _read_json(_locations_data_path())
    merged, stats = _merge_locations_reusing_coords(source_rows, previous)
    _write_json(_locations_data_path(), merged)
    return jsonify(
        {
            "status": "ok",
            "locations": len(merged),
            **stats,
        }
    )

