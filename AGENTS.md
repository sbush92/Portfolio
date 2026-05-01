# AGENTS

## Purpose

- Use this file as the default working guide for changes in this repository.
- Prefer existing project docs over inference: see [README.md](README.md) and [frontend/README.md](frontend/README.md).

## Repo Shape

- This is a split portfolio app with a React + TypeScript + Vite frontend in `frontend/` and an Express + PostgreSQL backend in `backend/`.
- Frontend application code lives under `frontend/src/`.
- Frontend routing is centralized in `frontend/src/AppRoutes.tsx`; shared page chrome is composed in `frontend/src/App.tsx`.
- The backend entrypoint is `backend/app.js`.
- Database access is centralized in `backend/db/index.js` via environment-backed `pg` client configuration.
- Container deployment uses `docker-compose.yml`, `Dockerfile.front`, `backend/Dockerfile.back`, and the Jenkins pipeline in `Jenkinsfile`.

## Commands

- Install dependencies from the repo root with `npm install`.
- Start local frontend development from the repo root with `npx vite frontend --config frontend/vite.config.ts`.
- Build the frontend from the repo root with `npx vite build frontend --config frontend/vite.config.ts`.
- Preview the production frontend locally with `npx vite preview frontend --config frontend/vite.config.ts`.
- Lint frontend source from the repo root with `npx eslint frontend/src --ext .ts,.tsx --config frontend/eslint.config.js`.
- Run a backend JavaScript syntax check with `node --check backend/app.js`.
- Format the repo with `npm run format` and verify formatting with `npm run format:check`.

## Working Rules

- Prefer root npm scripts instead of invoking toolchains directly unless you are debugging a script failure.
- Keep frontend changes inside `frontend/src/` unless the task explicitly requires static assets or Vite config updates.
- Keep backend changes close to `backend/app.js` and `backend/db/index.js`; do not add new API structure unless the task needs it.
- Preserve the existing React style: function components, route-level components under `frontend/src/components/`, and theme wiring through MUI's `ThemeProvider`.
- Preserve the existing backend style: CommonJS modules and direct Express route handlers.

## Pitfalls

- `npm start` only starts the Vite frontend. It does not start the Express backend.
- The current root test suite is a narrow Mocha + jsdom smoke test in `e2e-spec.js`; it does not validate the live frontend-backend integration.
- `backend/routes/blog.js` is currently empty, so backend behavior is owned by `backend/app.js` unless that changes in the task.
- Backend database access depends on environment variables loaded from `backend/.env`.

## Validation

- For frontend-only changes, prefer `npx eslint frontend/src --ext .ts,.tsx --config frontend/eslint.config.js` and then `npx vite build frontend --config frontend/vite.config.ts`.
- For repo-wide changes that affect shipped behavior, run the frontend lint/build pair and call out that there is no focused backend test suite in this checkout.
- For backend-only changes, run `node --check` on the touched `backend/*.js` files and call out the missing backend automated coverage.
