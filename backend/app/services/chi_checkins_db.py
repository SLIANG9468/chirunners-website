from concurrent.futures import ThreadPoolExecutor

from app.extensions import db
from app.models import City, Visit
from app.services.smugmug_api import resolve_smug_display_url

__all__ = [
    "locations_summary_from_db",
    "photos_payload_for_city",
    "serialize_visit_photo",
    "warm_smugmug_cache_for_all_visits",
]


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
                "id": city.id,
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


def _parse_city_pk(location_id) -> int | None:
    try:
        pk = int(location_id)
    except (TypeError, ValueError):
        return None
    return pk if pk > 0 else None


def photos_payload_for_city(location_id, flask_app=None) -> dict | None:
    city_pk = _parse_city_pk(location_id)
    if city_pk is None:
        return None
    city = db.session.get(City, city_pk)
    if not city:
        return None

    if flask_app is not None and city.visits:
        _prefetch_smug_urls_for_visits(flask_app, city.visits)
    visits_sorted = sorted(
        city.visits,
        key=lambda v: (
            v.visit_date is None,
            v.visit_date.isoformat() if v.visit_date else "",
            v.id,
        ),
    )
    photos = [serialize_visit_photo(v, flask_app) for v in visits_sorted]
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
        "id": city.id,
        "city": city.city_en,
        "country": city.country_en,
        "cityZh": _optional_zh(city.city_zh),
        "countryZh": _optional_zh(city.country_zh),
        "photos": photos,
        "count": len(photos),
        "imageUrlHint": image_url_hint,
    }


def _optional_zh(value) -> str | None:
    if value is None:
        return None
    s = str(value).strip()
    return s or None
