---
description: "Use when editing Express routes, PostgreSQL access, or backend JavaScript in backend/. Covers CommonJS patterns, env-backed database setup, frontend proxy expectations, and backend validation limits."
name: "Portfolio Backend Instructions"
applyTo: "backend/**/*.js"
---

# Portfolio Backend Instructions

- Keep backend changes close to `backend/app.js` and `backend/db/index.js` unless the task clearly benefits from extracting a new module.
- Preserve the current backend style: CommonJS modules, direct Express route handlers, and straightforward request/response flow.
- Database access is centralized in `backend/db/index.js` and depends on environment variables loaded from `backend/.env`.
- `backend/routes/blog.js` is currently empty. Do not assume it is wired into the app without checking first.
- Frontend development expects the Vite proxy in `frontend/vite.config.ts`: `/api/*` requests are proxied to port `8080` and rewritten to backend paths. If you change backend routes, coordinate the frontend endpoint path or env config.
- There is no meaningful backend test script today. For backend-only work, run `node --check` on the touched backend JavaScript files, keep changes small, and explicitly call out missing automated coverage.
- If a backend change affects shipped behavior across the app, pair the frontend lint/build commands with the backend syntax check, while noting that this still does not exercise live frontend-backend integration.
