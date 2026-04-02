import random
import re
from pathlib import Path

from flask import Blueprint, abort, current_app, jsonify, send_from_directory, url_for

volunteer_race_albums_bp = Blueprint("volunteer_race_albums", __name__)

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
ALBUM_ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
MAX_ALBUM_ID_LEN = 80

_album_orders: dict[str, list[str]] = {}
_album_versions: dict[str, int] = {}


def _album_base_dir() -> Path:
    return Path(current_app.config["VOLUNTEER_RACE_ALBUMS_DIR"]).resolve()


def _valid_album_id(album_id: str) -> bool:
    if not album_id or len(album_id) > MAX_ALBUM_ID_LEN:
        return False
    return ALBUM_ID_RE.fullmatch(album_id) is not None


def _album_dir(album_id: str) -> Path | None:
    if not _valid_album_id(album_id):
        return None
    base = _album_base_dir()
    resolved = (base / album_id).resolve()
    if resolved.parent != base:
        return None
    return resolved


def _list_photo_filenames(photo_dir: Path) -> list[str]:
    if not photo_dir.is_dir():
        return []
    return [
        entry.name
        for entry in photo_dir.iterdir()
        if entry.is_file() and entry.suffix.lower() in ALLOWED_IMAGE_EXTENSIONS
    ]


def _refresh_album_order(album_id: str, photo_dir: Path) -> None:
    files = _list_photo_filenames(photo_dir)
    random.shuffle(files)
    _album_orders[album_id] = files
    _album_versions[album_id] = _album_versions.get(album_id, 0) + 1


def _ensure_album_order(album_id: str, photo_dir: Path) -> None:
    current_files = set(_list_photo_filenames(photo_dir))
    order = _album_orders.get(album_id, [])
    if not order or set(order) != current_files:
        _refresh_album_order(album_id, photo_dir)


@volunteer_race_albums_bp.route(
    "/api/volunteer-race-albums/<album_id>/photos", methods=["GET"]
)
def list_volunteer_race_album_photos(album_id: str):
    photo_dir = _album_dir(album_id)
    if photo_dir is None:
        abort(404)

    _ensure_album_order(album_id, photo_dir)
    order = _album_orders[album_id]
    urls = [
        url_for(
            "volunteer_race_albums.get_volunteer_race_album_photo",
            album_id=album_id,
            filename=name,
        )
        for name in order
    ]
    return jsonify(
        {
            "photos": urls,
            "count": len(urls),
            "version": _album_versions.get(album_id, 0),
        }
    )


@volunteer_race_albums_bp.route(
    "/api/volunteer-race-albums/<album_id>/refresh", methods=["POST"]
)
def refresh_volunteer_race_album_photos(album_id: str):
    photo_dir = _album_dir(album_id)
    if photo_dir is None:
        abort(404)

    _refresh_album_order(album_id, photo_dir)
    order = _album_orders[album_id]
    urls = [
        url_for(
            "volunteer_race_albums.get_volunteer_race_album_photo",
            album_id=album_id,
            filename=name,
        )
        for name in order
    ]
    return jsonify(
        {
            "photos": urls,
            "count": len(urls),
            "version": _album_versions[album_id],
        }
    )


@volunteer_race_albums_bp.route(
    "/media/volunteer-race-albums/<album_id>/<filename>", methods=["GET"]
)
def get_volunteer_race_album_photo(album_id: str, filename: str):
    photo_dir = _album_dir(album_id)
    if photo_dir is None:
        abort(404)

    requested = (photo_dir / filename).resolve()
    if photo_dir not in requested.parents:
        abort(404)
    if not requested.is_file():
        abort(404)
    if requested.suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        abort(404)

    return send_from_directory(str(photo_dir), filename)
