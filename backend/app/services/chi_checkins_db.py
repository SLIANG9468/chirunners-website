import json
import re
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from pathlib import Path

import requests
from sqlalchemy import delete as sql_delete
from sqlalchemy.orm import Session

from app.extensions import db
from app.models import City, Visit
from app.services.smugmug_api import resolve_smug_display_url

__all__ = [
    "slugify_city_country",
    "normalize_source_rows",
    "normalize_locations_backup_rows",
    "merge_normalized_with_db_coordinates",
    "write_normalized_locations_to_db",
    "locations_summary_from_db",
    "photos_payload_for_city",
    "serialize_visit_photo",
    "parse_visit_date_field",
    "read_json_optional",
    "warm_smugmug_cache_for_all_visits",
]


def slugify_city_country(city: str, country: str) -> str:
    value = f"{city}-{country}".lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value


def read_json_optional(path: Path) -> list:
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def parse_visit_date_field(raw) -> date | None:
    if raw is None:
        return None
    s = str(raw).strip()
    if not s:
        return None
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})", s)
    if not m:
        return None
    try:
        return date(int(m[1]), int(m[2]), int(m[3]))
    except ValueError:
        return None


def normalize_locations_backup_rows(locations_rows: list) -> list[dict]:
    out: list[dict] = []
    for row in locations_rows:
        if isinstance(row, dict) and row.get("id"):
            out.append(row)
    return sorted(out, key=lambda x: (x.get("country", ""), x.get("city", "")))


def normalize_source_rows(source_rows: list[dict]) -> list[dict]:
    by_location: dict[str, dict] = {}

    for row in source_rows:
        city = str(row.get("city", "")).strip()
        country = str(row.get("country", "")).strip()
        if not city or not country:
            continue

        location_id = slugify_city_country(city, country)
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
        visit_dict = {
            "date": row.get("date", ""),
            "filename": row.get("filename", ""),
            "runnerName": runner_name,
        }
        place_note = row.get("placeNote", "")
        if isinstance(place_note, str) and place_note.strip():
            visit_dict["placeNote"] = place_note.strip()

        for opt_key in (
            "smugmugImageKey",
            "runnerNameEn",
            "runnerNameZh",
            "placeNoteEn",
            "placeNoteZh",
        ):
            v = row.get(opt_key)
            if isinstance(v, str) and v.strip():
                visit_dict[opt_key] = v.strip()

        by_location[location_id]["visits"].append(visit_dict)

    return sorted(by_location.values(), key=lambda x: (x["country"], x["city"]))


def merge_normalized_with_db_coordinates(normalized: list[dict], session: Session) -> tuple[list[dict], dict]:
    cities = session.query(City).all()
    prev_by_slug = {c.slug: c for c in cities}
    reused = 0
    need_geocode: list[str] = []
    for loc in normalized:
        prev = prev_by_slug.get(loc["id"])
        if prev and prev.lat is not None and prev.lng is not None:
            loc["lat"] = float(prev.lat)
            loc["lng"] = float(prev.lng)
            reused += 1
        else:
            loc["lat"] = None
            loc["lng"] = None
            need_geocode.append(loc["id"])
    return normalized, {"reusedCoordinates": reused, "needGeocode": need_geocode}


def _visit_visit_dict_to_model(city_pk: int, visit_dict: dict) -> Visit:
    filename = str(visit_dict.get("filename", "")).strip()
    if not filename:
        raise ValueError("visit missing filename")

    rn_en = visit_dict.get("runnerNameEn")
    rn_zh = visit_dict.get("runnerNameZh")
    legacy_rn = visit_dict.get("runnerName", "")
    if isinstance(legacy_rn, str):
        legacy_rn = legacy_rn.strip()
    else:
        legacy_rn = str(legacy_rn or "").strip()

    pn_en = visit_dict.get("placeNoteEn")
    pn_zh = visit_dict.get("placeNoteZh")
    legacy_pn = visit_dict.get("placeNote", "")
    if isinstance(legacy_pn, str):
        legacy_pn = legacy_pn.strip()
    else:
        legacy_pn = str(legacy_pn or "").strip()

    def _str_or_none(x) -> str | None:
        if x is None:
            return None
        s = str(x).strip()
        return s or None

    smug = visit_dict.get("smugmugImageKey")
    if isinstance(smug, str):
        smug = smug.strip() or None
    else:
        smug = None

    return Visit(
        city_id=city_pk,
        visit_date=parse_visit_date_field(visit_dict.get("date")),
        filename=filename,
        smugmug_image_key=smug,
        runner_name_en=_str_or_none(rn_en),
        runner_name_zh=_str_or_none(rn_zh) or (legacy_rn or None),
        place_note_en=_str_or_none(pn_en),
        place_note_zh=_str_or_none(pn_zh) or (legacy_pn or None),
    )


def write_normalized_locations_to_db(normalized: list[dict]) -> None:
    for loc in normalized:
        slug = loc["id"]
        city_row = db.session.query(City).filter_by(slug=slug).one_or_none()
        visits_data = loc.get("visits") or []

        if city_row is None:
            city_row = City(
                slug=slug,
                city_en=str(loc.get("city", "")).strip(),
                country_en=str(loc.get("country", "")).strip(),
                city_zh=loc.get("cityZh"),
                country_zh=loc.get("countryZh"),
                lat=loc.get("lat"),
                lng=loc.get("lng"),
            )
            db.session.add(city_row)
            db.session.flush()
        else:
            city_row.city_en = str(loc.get("city", city_row.city_en)).strip()
            city_row.country_en = str(loc.get("country", city_row.country_en)).strip()
            if loc.get("cityZh") is not None:
                city_row.city_zh = loc["cityZh"]
            if loc.get("countryZh") is not None:
                city_row.country_zh = loc["countryZh"]
            lat, lng = loc.get("lat"), loc.get("lng")
            if lat is not None and lng is not None:
                city_row.lat = lat
                city_row.lng = lng

        db.session.execute(sql_delete(Visit).where(Visit.city_id == city_row.id))

        for v in visits_data:
            db.session.add(_visit_visit_dict_to_model(city_row.id, v))

    db.session.commit()


def _optional_zh(value) -> str | None:
    if value is None:
        return None
    s = str(value).strip()
    return s or None


def locations_summary_from_db() -> tuple[list[dict], int]:
    rows = (
        db.session.query(City)
        .order_by(City.country_en.asc(), City.city_en.asc())
        .all()
    )
    summary: list[dict] = []
    for city in rows:
        if city.lat is None or city.lng is None:
            continue
        n_visits = len(city.visits)
        summary.append(
            {
                "id": city.slug,
                "city": city.city_en,
                "country": city.country_en,
                "cityZh": _optional_zh(city.city_zh),
                "countryZh": _optional_zh(city.country_zh),
                "lat": city.lat,
                "lng": city.lng,
                "photoCount": n_visits,
            }
        )
    return summary, len(summary)


def serialize_visit_photo(visit: Visit, flask_app=None) -> dict:
    zh_rn = (visit.runner_name_zh or "").strip()
    en_rn = (visit.runner_name_en or "").strip()
    zh_pn = (visit.place_note_zh or "").strip()
    en_pn = (visit.place_note_en or "").strip()

    fallback_runner = zh_rn or en_rn

    photo = {
        "date": visit.visit_date.isoformat() if visit.visit_date else "",
        "filename": visit.filename,
        "runnerNameEn": en_rn if en_rn else None,
        "runnerNameZh": zh_rn if zh_rn else None,
        "placeNoteEn": en_pn if en_pn else None,
        "placeNoteZh": zh_pn if zh_pn else None,
        "runnerName": fallback_runner,
    }
    if zh_pn:
        photo["placeNote"] = zh_pn
    elif en_pn:
        photo["placeNote"] = en_pn

    smug_key = visit.smugmug_image_key
    if isinstance(smug_key, str) and smug_key.strip():
        sk = smug_key.strip()
        photo["smugmugImageKey"] = sk
        if flask_app is not None:
            resolved = resolve_smug_display_url(flask_app, sk)
            if resolved:
                photo["url"] = resolved
                photo["smugmugUrlResolved"] = True

    return photo


def _prefetch_smug_urls_for_visits(flask_app, visits: list) -> None:
    """Warm URL cache in parallel: each key first hits SmugMug HTML once; serial was slow for many visits."""
    seen: set[str] = set()
    keys: list[str] = []
    for v in visits:
        sk = getattr(v, "smugmug_image_key", None)
        if not isinstance(sk, str) or not sk.strip():
            continue
        k = sk.strip()
        if k not in seen:
            seen.add(k)
            keys.append(k)
    if not keys:
        return
    max_workers = min(8, len(keys))

    def _one(key: str) -> None:
        resolve_smug_display_url(flask_app, key)

    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        pool.map(_one, keys)


def warm_smugmug_cache_for_all_visits(flask_app) -> None:
    """Resolve og:image for every distinct Smug key in DB (parallel); for startup background warm."""
    visits = (
        db.session.query(Visit)
        .filter(Visit.smugmug_image_key.isnot(None))
        .filter(Visit.smugmug_image_key != "")
        .all()
    )
    log = getattr(flask_app, "logger", None)
    if log:
        seen: set[str] = set()
        for v in visits:
            sk = getattr(v, "smugmug_image_key", None)
            if isinstance(sk, str) and sk.strip():
                seen.add(sk.strip())
        log.info(
            "SmugMug cache warm: %s unique keys from %s visits",
            len(seen),
            len(visits),
        )
    _prefetch_smug_urls_for_visits(flask_app, visits)


def photos_payload_for_city(location_id: str, flask_app=None) -> dict | None:
    city = db.session.query(City).filter_by(slug=location_id).one_or_none()
    if not city:
        return None

    if flask_app is not None and city.visits:
        _prefetch_smug_urls_for_visits(flask_app, city.visits)
    photos = [serialize_visit_photo(v, flask_app) for v in city.visits]
    nick = ""
    if flask_app is not None:
        nick = (flask_app.config.get("SMUGMUG_NICKNAME") or "").strip()
    any_key = any(
        isinstance(v.smugmug_image_key, str) and v.smugmug_image_key.strip() for v in city.visits
    )
    any_url = any(bool(p.get("url")) for p in photos)
    image_url_hint = None
    if city.visits and not any_url:
        if not nick:
            image_url_hint = "missing_nickname"
        elif not any_key:
            image_url_hint = "missing_smugmug_keys"
    return {
        "id": city.slug,
        "city": city.city_en,
        "country": city.country_en,
        "cityZh": _optional_zh(city.city_zh),
        "countryZh": _optional_zh(city.country_zh),
        "photos": photos,
        "count": len(photos),
        "imageUrlHint": image_url_hint,
    }


def geocode_city_country(city: str, country: str, token: str) -> tuple[float, float]:
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
