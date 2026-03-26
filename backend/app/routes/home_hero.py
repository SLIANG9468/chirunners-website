import random
from pathlib import Path

from flask import Blueprint, abort, current_app, jsonify, send_from_directory, url_for

home_hero_bp = Blueprint("home_hero", __name__)

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
_shared_photo_order: list[str] = []
_shared_photo_version = 0


def _get_photo_dir() -> Path:
    return Path(current_app.config["HOME_HERO_PHOTO_DIR"]).resolve()


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


@home_hero_bp.route("/api/home-hero/photos", methods=["GET"])
def list_home_hero_photos():
    photo_dir = _get_photo_dir()
    current_files = set(_get_photo_file_names(photo_dir))

    if not _shared_photo_order:
        _refresh_shared_photo_order(photo_dir)
    elif set(_shared_photo_order) != current_files:
        _refresh_shared_photo_order(photo_dir)

    urls = [
        url_for("home_hero.get_home_hero_photo", filename=name)
        for name in _shared_photo_order
    ]
    return jsonify({"photos": urls, "count": len(urls), "version": _shared_photo_version})


@home_hero_bp.route("/api/home-hero/refresh", methods=["POST"])
def refresh_home_hero_photos():
    photo_dir = _get_photo_dir()
    _refresh_shared_photo_order(photo_dir)

    urls = [
        url_for("home_hero.get_home_hero_photo", filename=name)
        for name in _shared_photo_order
    ]
    return jsonify({"photos": urls, "count": len(urls), "version": _shared_photo_version})


@home_hero_bp.route("/media/home-hero/<filename>", methods=["GET"])
def get_home_hero_photo(filename: str):
    photo_dir = _get_photo_dir()
    requested_file = (photo_dir / filename).resolve()

    if photo_dir not in requested_file.parents:
        abort(404)
    if not requested_file.is_file():
        abort(404)
    if requested_file.suffix.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        abort(404)

    return send_from_directory(str(photo_dir), filename)

