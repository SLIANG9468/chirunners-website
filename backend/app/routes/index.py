from flask import Blueprint, jsonify

index_bp = Blueprint("index", __name__)


@index_bp.route("/", methods=["GET"])
def index():
    # Non-API route just to confirm the server is up.
    return jsonify({"message": "Flask backend is running"})

