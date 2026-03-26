import os

from app import create_app

app = create_app()


def main() -> None:
    # Default 5001: macOS often uses 5000 for AirPlay Receiver.
    port = int(os.getenv("FLASK_PORT", "5001"))
    # Listen on 0.0.0.0 so it works with localhost and (optionally) LAN.
    app.run(host="0.0.0.0", port=port, debug=True)


if __name__ == "__main__":
    main()

