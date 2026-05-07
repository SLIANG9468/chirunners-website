import os
from pathlib import Path

import click
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from sqlalchemy import delete as sql_delete

from app.extensions import db, migrate


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


def _register_cli_commands(flask_app: Flask) -> None:
    from app.models import City, Visit
    from app.services import chi_checkins_db as chk

    @flask_app.cli.command("seed-chi-from-json")
    @click.option("--force/--no-force", default=False)
    def seed_chi_from_json(force: bool) -> None:
        """Load city + visit rows from chi_has_been_here_locations.json (see config key)."""

        from pathlib import Path

        if not force:
            if db.session.query(City).first() is not None:
                raise click.UsageError(
                    "Database already has chi check-in rows. Re-run with --force to truncate and reload."
                )

        locations_path = Path(flask_app.config["CHI_HAS_BEEN_HERE_LOCATIONS_FILE"]).resolve()
        rows = chk.read_json_optional(locations_path)
        normalized = chk.normalize_locations_backup_rows(rows)
        if not normalized:
            raise click.UsageError(f"No usable rows found in {locations_path}")

        if force:
            db.session.execute(sql_delete(Visit))
            db.session.execute(sql_delete(City))
            db.session.commit()

        chk.write_normalized_locations_to_db(normalized)
        visit_total = sum(len(x.get("visits") or []) for x in normalized)
        click.echo(
            f"Seeded chi check-ins from {locations_path}: "
            f"{len(normalized)} cities, {visit_total} visits."
        )


def create_app() -> Flask:
    backend_dir = Path(__file__).resolve().parents[1]
    load_dotenv(backend_dir / ".env")

    flask_app = Flask(__name__)
    default_home_hero_photo_dir = backend_dir / "photos" / "home-hero"
    default_chi_photo_dir = backend_dir / "photos" / "chi-has-been-here"
    default_chi_source_file = backend_dir / "data" / "chi_has_been_here_source.json"
    default_chi_locations_file = backend_dir / "data" / "chi_has_been_here_locations.json"
    default_volunteer_race_albums_dir = backend_dir / "photos" / "volunteer-race-albums"

    flask_app.config["SQLALCHEMY_DATABASE_URI"] = _database_uri(backend_dir)
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    flask_app.config["HOME_HERO_PHOTO_DIR"] = os.getenv(
        "HOME_HERO_PHOTO_DIR", str(default_home_hero_photo_dir)
    )
    flask_app.config["CHI_HAS_BEEN_HERE_PHOTO_DIR"] = os.getenv(
        "CHI_HAS_BEEN_HERE_PHOTO_DIR", str(default_chi_photo_dir)
    )
    flask_app.config["CHI_HAS_BEEN_HERE_SOURCE_FILE"] = os.getenv(
        "CHI_HAS_BEEN_HERE_SOURCE_FILE", str(default_chi_source_file)
    )
    flask_app.config["CHI_HAS_BEEN_HERE_LOCATIONS_FILE"] = os.getenv(
        "CHI_HAS_BEEN_HERE_LOCATIONS_FILE", str(default_chi_locations_file)
    )
    flask_app.config["MAPBOX_ACCESS_TOKEN"] = os.getenv("MAPBOX_ACCESS_TOKEN", "")
    flask_app.config["VOLUNTEER_RACE_ALBUMS_DIR"] = os.getenv(
        "VOLUNTEER_RACE_ALBUMS_DIR", str(default_volunteer_race_albums_dir)
    )

    db.init_app(flask_app)
    migrate.init_app(flask_app, db)
    import app.models  # noqa: F401  # pylint: disable=unused-import — register tables

    _register_cli_commands(flask_app)

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
    return flask_app
