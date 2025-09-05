Responsive Portfolio Website

# Portfolio

A modern, responsive portfolio website and blog for Samuel Bush. This project showcases professional experience, technical skills, and selected projects, and includes a personal tech blog.

## Features

- **Responsive Design:** Works on desktop and mobile devices.
- **Single Page Navigation:** Home, About, Work, Blog, and Contact sections.
- **Project Gallery:** Highlights selected projects with links to live demos and source code.
- **Personal Blog:** Tech posts and updates, with pagination.
- **Accessible & Modern UI:** Built with semantic HTML5, CSS Grid/Flexbox, and FontAwesome icons.
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

2. Install dependencies:
	 ```sh
	 npm install
	 ```

### Running Locally

Start a local development server:
```sh
npm start
```
This will launch the site at [http://localhost:1234](http://localhost:1234).

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

- `index.html` – Home page
- `about.html` – About me
- `work.html` – Project gallery
- `blog.html` – Blog with pagination
- `contact.html` – Contact information
- `js/` – JavaScript files for interactivity
- `css/` – Main stylesheet
- `img/` – Images and project screenshots

## Continuous Integration

- Automated linting and testing on push and pull requests via GitHub Actions.
- See `.github/workflows/` for workflow definitions.

## License

This project is licensed under the ISC License.

Contents of this site are © Copyright 2025 Samuel Bush. All rights reserved.