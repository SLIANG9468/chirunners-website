import random
from pathlib import Path

from flask import Blueprint, abort, current_app, jsonify, send_from_directory, url_for

all_community_events_bp = Blueprint("all_community_events", __name__)

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
_shared_photo_order: list[str] = []
_shared_photo_version = 0


def _get_photo_dir() -> Path:
    return Path(current_app.config["ALL_COMMUNITY_EVENTS_PHOTO_DIR"]).resolve()


def _get_photo_file_names(photo_dir: Path) -> list[str]:
    if not photo_dir.exists() or not photo_dir.is_dir():
        return []

    return [
        entry.name
        for entry in photo_dir.iterdir()
        if entry.is_file() and entry.suffix.lower() in ALLOWED_IMAGE_EXTENSIONS
    ]


def _refresh_shared_photo_order(photo_dir: Path) -> None:
    global _shared_photo_order
    global _shared_photo_version

    files = _get_photo_file_names(photo_dir)
    random.shuffle(files)
    _shared_photo_order = files
    _shared_photo_version += 1


@all_community_events_bp.route("/api/all-community-events/photos", methods=["GET"])
def list_all_community_event_photos():
    photo_dir = _get_photo_dir()
    current_files = set(_get_photo_file_names(photo_dir))

    if not _shared_photo_order:
        _refresh_shared_photo_order(photo_dir)
    elif set(_shared_photo_order) != current_files:
        # Keep all clients in sync whenever photo folder contents change.
        _refresh_shared_photo_order(photo_dir)

    urls = [
        url_for("all_community_events.get_all_community_event_photo", filename=name)
        for name in _shared_photo_order
    ]
    return jsonify({"photos": urls, "count": len(urls), "version": _shared_photo_version})


@all_community_events_bp.route("/api/all-community-events/refresh", methods=["POST"])
def refresh_all_community_event_photos():
    photo_dir = _get_photo_dir()
    _refresh_shared_photo_order(photo_dir)

    urls = [
        url_for("all_community_events.get_all_community_event_photo", filename=name)
        for name in _shared_photo_order
    ]
    return jsonify(
        {
            "photos": urls,
            "count": len(urls),
            "version": _shared_photo_version,
        }
    )


@all_community_events_bp.route(
    "/media/all-community-events/<filename>", methods=["GET"]
)
def get_all_community_event_photo(filename: str):
    photo_dir = _get_photo_dir()
    requested_file = (photo_dir / filename).resolve()

    if photo_dir not in requested_file.parents:
        abort(404)
    if not requested_file.is_file():
        abort(404)
    if requested_file.suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        abort(404)

    return send_from_directory(str(photo_dir), filename)

