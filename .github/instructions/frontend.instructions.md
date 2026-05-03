---
description: "Use when editing frontend React components, routing, styling, or Vite client code in frontend/src. Covers MUI theme usage, route ownership, API proxy assumptions, and validation steps."
name: "Portfolio Frontend Instructions"
applyTo: "frontend/src/**/*.ts, frontend/src/**/*.tsx"
---

# Portfolio Frontend Instructions

- Keep app code in `frontend/src/`; only touch `frontend/public/` or Vite config when the task explicitly needs static assets or tooling changes.
- Route composition lives in `frontend/src/AppRoutes.tsx`. Shared chrome lives in `frontend/src/App.tsx` with the MUI `ThemeProvider`, router, header, and footer.
- Follow the existing component style: function components, route-level screens in `frontend/src/components/`, and minimal abstraction unless duplication is real.
- Reuse the shared theme in `frontend/src/theme.ts` instead of introducing component-local palette drift unless the task is a deliberate design change.
- Frontend API calls should assume the Vite dev proxy in `frontend/vite.config.ts`: requests to `/api/*` are forwarded to `http://localhost:8080` and rewritten to backend paths.
- When changing blog data loading, keep `VITE_BLOG_API_ENDPOINT` support intact or update the consuming code and config together.
- Prefer the working frontend validation commands from the repo root: `npx eslint frontend/src --ext .ts,.tsx --config frontend/eslint.config.js` and then `npx vite build frontend --config frontend/vite.config.ts`.
- Do not claim frontend-backend integration is covered by tests; the current root test suite is a narrow Mocha + jsdom smoke test.
