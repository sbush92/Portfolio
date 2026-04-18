# Portfolio

A modern portfolio application with a React + Vite frontend and a Node/Express backend. The frontend showcases professional experience, technical skills, selected projects, and a personal tech blog.

## Features

- **Responsive Design:** Works on desktop and mobile devices.
- **Single Page Navigation:** React Router powered Home, About, Work, Blog, and Contact routes.
- **Project Gallery:** Highlights selected projects with links to live demos and source code.
- **Personal Blog:** Tech posts and updates, with pagination.
- **Accessible & Modern UI:** Built with React, Vite, and MUI.
- **Automated Quality Checks:** Linting and testing via GitHub Actions.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
	 ```sh
	 git clone https://github.com/sbush92/Portfolio.git
	 cd Portfolio
	 ```

2. Install workspace dependencies:
	 ```sh
	 npm install
	 ```

This installs the root tooling plus the frontend and backend workspace dependencies.

### Running Locally

Start the Vite frontend locally:
```sh
npm start
```
This will launch the SPA at [http://localhost:5173](http://localhost:5173).

Build the frontend for production:
```sh
npm run build
```

Preview the production build locally:
```sh
npm run preview
```

### Linting and Testing

- Run ESLint:
	```sh
	npm run lint
	```
- Run tests:
	```sh
	npm test
	```

## Project Structure

- `frontend/` - React + TypeScript + Vite single-page app
- `backend/` - Express API and database integration
- `public/` - Legacy static assets still referenced by the frontend
- `e2e-spec.js` - Project test coverage

## Continuous Integration

- Automated linting and testing on push and pull requests via GitHub Actions.
- See `.github/workflows/` for workflow definitions.

## License

This project is licensed under the ISC License.

Contents of this site are © Copyright 2025 Samuel Bush. All rights reserved.