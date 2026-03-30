import os
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS


def create_app() -> Flask:
    backend_dir = Path(__file__).resolve().parents[1]
    # Load MAPBOX_ACCESS_TOKEN, FLASK_PORT, etc. from backend/.env (not committed).
    load_dotenv(backend_dir / ".env")

    app = Flask(__name__)
    default_photo_dir = backend_dir / "photos" / "all-community-events"
    default_home_hero_photo_dir = backend_dir / "photos" / "home-hero"
    default_chi_photo_dir = backend_dir / "photos" / "chi-has-been-here"
    default_chi_source_file = backend_dir / "data" / "chi_has_been_here_source.json"
    default_chi_locations_file = backend_dir / "data" / "chi_has_been_here_locations.json"
    app.config["ALL_COMMUNITY_EVENTS_PHOTO_DIR"] = os.getenv(
        "ALL_COMMUNITY_EVENTS_PHOTO_DIR", str(default_photo_dir)
    )
    app.config["HOME_HERO_PHOTO_DIR"] = os.getenv(
        "HOME_HERO_PHOTO_DIR", str(default_home_hero_photo_dir)
    )
    app.config["CHI_HAS_BEEN_HERE_PHOTO_DIR"] = os.getenv(
        "CHI_HAS_BEEN_HERE_PHOTO_DIR", str(default_chi_photo_dir)
    )
    app.config["CHI_HAS_BEEN_HERE_SOURCE_FILE"] = os.getenv(
        "CHI_HAS_BEEN_HERE_SOURCE_FILE", str(default_chi_source_file)
    )
    app.config["CHI_HAS_BEEN_HERE_LOCATIONS_FILE"] = os.getenv(
        "CHI_HAS_BEEN_HERE_LOCATIONS_FILE", str(default_chi_locations_file)
    )
    app.config["MAPBOX_ACCESS_TOKEN"] = os.getenv("MAPBOX_ACCESS_TOKEN", "")

    # Local dev: allow all. Production: set CORS_ORIGINS to your frontend URL(s), comma-separated.
    cors_origins = os.getenv("CORS_ORIGINS", "").strip()
    if cors_origins:
        origins = [o.strip() for o in cors_origins.split(",") if o.strip()]
        CORS(app, origins=origins if origins else "*")
    else:
        CORS(app)

    # Routes
    from .routes.index import index_bp
    from .routes.health import health_bp
    from .routes.all_community_events import all_community_events_bp
    from .routes.home_hero import home_hero_bp
    from .routes.chi_has_been_here import chi_has_been_here_bp

    app.register_blueprint(index_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(all_community_events_bp)
    app.register_blueprint(home_hero_bp)
    app.register_blueprint(chi_has_been_here_bp)
    return app

