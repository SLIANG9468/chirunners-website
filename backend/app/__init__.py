import logging
import os
import threading
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from app.extensions import db


def _database_uri(backend_dir: Path) -> str:
    raw = os.getenv("DATABASE_URL", "").strip()
    if raw:
        # Render Postgres sometimes uses postgres:// URLs; SQLAlchemy expects postgresql://
        if raw.startswith("postgres://"):
            return "postgresql://" + raw[len("postgres://") :]
        return raw

    data_dir = backend_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    sqlite_path = (data_dir / "app.db").resolve()
    return "sqlite:///" + str(sqlite_path)


def create_app() -> Flask:
    backend_dir = Path(__file__).resolve().parents[1]
    load_dotenv(backend_dir / ".env")

    flask_app = Flask(__name__)
    default_home_hero_photo_dir = backend_dir / "photos" / "home-hero"
    default_volunteer_race_albums_dir = backend_dir / "photos" / "volunteer-race-albums"

    flask_app.config["SQLALCHEMY_DATABASE_URI"] = _database_uri(backend_dir)
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    flask_app.config["HOME_HERO_PHOTO_DIR"] = os.getenv(
        "HOME_HERO_PHOTO_DIR", str(default_home_hero_photo_dir)
    )
    flask_app.config["SMUGMUG_NICKNAME"] = os.getenv("SMUGMUG_NICKNAME", "").strip()
    _smug_ttl = os.getenv("SMUGMUG_IMAGE_URL_CACHE_SECONDS", "").strip()
    flask_app.config["SMUGMUG_IMAGE_URL_CACHE_SECONDS"] = _smug_ttl or None
    # Optional override; default in smugmug_api is Website/ChiHasBeenHere.
    _smug_folder = (
        os.getenv("SMUGMUG_GALLERY_FOLDER_PATH", "").strip()
        or os.getenv("SMUGMUG_GALLERY_PATH_CHI", "").strip()
        or os.getenv("SMUGMUG_GALLERY_PATH", "").strip()
    )
    flask_app.config["SMUGMUG_GALLERY_FOLDER_PATH"] = _smug_folder
    flask_app.config["VOLUNTEER_RACE_ALBUMS_DIR"] = os.getenv(
        "VOLUNTEER_RACE_ALBUMS_DIR", str(default_volunteer_race_albums_dir)
    )

    db.init_app(flask_app)
    import app.models  # noqa: F401  # pylint: disable=unused-import — register tables

    cors_origins = os.getenv("CORS_ORIGINS", "").strip()
    if cors_origins:
        origins = [o.strip() for o in cors_origins.split(",") if o.strip()]
        CORS(flask_app, origins=origins if origins else "*")
    else:
        CORS(flask_app)

    from .routes.index import index_bp
    from .routes.health import health_bp
    from .routes.home_hero import home_hero_bp
    from .routes.chi_has_been_here import chi_has_been_here_bp
    from .routes.volunteer_race_albums import volunteer_race_albums_bp

    flask_app.register_blueprint(index_bp)
    flask_app.register_blueprint(health_bp)
    flask_app.register_blueprint(home_hero_bp)
    flask_app.register_blueprint(chi_has_been_here_bp)
    flask_app.register_blueprint(volunteer_race_albums_bp)

    def _warm_smugmug_cache_worker() -> None:
        try:
            with flask_app.app_context():
                from app.services.chi_checkins_db import warm_smugmug_cache_for_all_visits

                warm_smugmug_cache_for_all_visits(flask_app)
        except Exception:
            logging.getLogger(__name__).exception("SmugMug cache warm failed")

    threading.Thread(target=_warm_smugmug_cache_worker, daemon=True).start()
    return flask_app
