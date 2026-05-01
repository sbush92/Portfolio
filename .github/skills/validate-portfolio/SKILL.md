---
name: validate-portfolio
description: 'Validate changes in this Portfolio repo. Use for deciding and running the right checks for frontend-only, backend-only, or repo-wide work, and for reporting known coverage gaps.'
argument-hint: 'Describe what changed, for example: frontend only, backend API only, or full-stack blog flow'
user-invocable: true
---

# Validate Portfolio Changes

Use this skill when you need to choose the right validation steps for this repository without re-deriving the command matrix each time.

## Decide Scope

1. Treat changes under `frontend/src/`, `frontend/public/`, or `frontend/vite.config.ts` as frontend-focused unless backend files also changed.
2. Treat changes under `backend/` as backend-focused unless frontend files or shared deployment files also changed.
3. Treat changes spanning frontend and backend, or touching container/deployment files, as repo-wide.

## Validation Procedure

### Frontend-only changes

1. Run `npx eslint frontend/src --ext .ts,.tsx --config frontend/eslint.config.js` from the repo root.
2. Run `npx vite build frontend --config frontend/vite.config.ts` from the repo root.
3. If the change touches API consumption, routing, or pagination behavior, mention that automated coverage is still limited to the root smoke test.

### Backend-only changes

1. Run `node --check` for each touched backend JavaScript file.
2. If the change affects API contracts used by the frontend, also run `npx vite build frontend --config frontend/vite.config.ts` to catch client-side integration breakage where possible.
3. State explicitly that the repo has no focused backend test suite.

### Repo-wide or user-visible behavior changes

1. Run `npx eslint frontend/src --ext .ts,.tsx --config frontend/eslint.config.js` from the repo root.
2. Run `npx vite build frontend --config frontend/vite.config.ts` from the repo root.
3. If backend files were touched, also run `node --check` on the touched backend JavaScript files.
4. Report that these checks still do not cover live frontend-backend integration.

## Known Constraints

- `npm start` only starts the Vite frontend.
- Backend runtime behavior is mainly owned by `backend/app.js`.
- Frontend local API calls generally go through `/api/*`, which Vite proxies to `http://localhost:8080` and rewrites to backend paths.
- Database-backed backend behavior depends on `backend/.env`.

## Expected Output

- Name the chosen validation scope.
- List the exact commands or checks run.
- Call out any coverage gaps that remain after validation.
