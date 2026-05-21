from flask import Blueprint, jsonify

from app.extensions import db
from app.models import City

health_bp = Blueprint("health", __name__)


@health_bp.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@health_bp.route("/api/health/db", methods=["GET"])
def health_db():
    """Verify Postgres schema matches models (e.g. after dropping city.slug)."""
    try:
        city_count = db.session.query(City).count()
        return jsonify({"status": "ok", "cities": city_count})
    except Exception as exc:
        return jsonify({"status": "error", "message": str(exc)}), 503

