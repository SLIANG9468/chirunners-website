# Chi Runners website

Club website: React/Vite frontend (`frontend/`) + Flask backend (`backend/`), deployed to Render (`render.yaml`).

## Dev commands

- Backend: `cd backend && source venv/bin/activate && python run.py` (default port 5001; override with `FLASK_PORT`)
- Frontend: `cd frontend && npm run dev` (Vite proxies `/api` and `/media` to the backend on 127.0.0.1:5001 — see `vite.config.js`)
- Lint frontend: `cd frontend && npm run lint`
- Build frontend: `cd frontend && npm run build`

Run backend and frontend dev servers in separate terminals; no manual CORS setup needed locally since Vite proxies API calls.

## Backend

- App factory: `backend/app/__init__.py`; entry point: `backend/run.py`
- Python venv lives at `backend/venv` (the populated one — ignore the stray `backend/.venv` and the root-level `.venv`, neither belongs to this backend)
- DB: SQLite fallback at `backend/data/app.db` (gitignored) when `DATABASE_URL` is unset; Postgres in production. Migrations via Alembic under `backend/migrations/`

## Env files

- Copy `backend/.env.example` → `backend/.env` and `frontend/.env.example` → `frontend/.env` as needed; never commit, print, or read the contents of `.env` files
- Local frontend dev should leave `VITE_API_BASE_URL` unset (proxy handles it)

## Deploy

Render Blueprint (`render.yaml`) wires `chirunners-api` (Flask/gunicorn) and `chirunners-web` (static Vite build). The file has inline comments explaining non-obvious constraints (gunicorn bind args, DB wiring) — read them before changing anything there.
