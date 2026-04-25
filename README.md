# Ankit Kotnala Portfolio

Personal portfolio website for Ankit Kotnala, built with React, TypeScript, Vite, GSAP, and Three.js. The site presents my work as an AI and Backend Engineer through an animated, interactive portfolio experience.

Live site: [ankit-kotnala.github.io](https://ankit-kotnala.github.io)

## Overview

This portfolio includes:

- Animated landing experience with GSAP-powered text and scroll effects
- Interactive Three.js character scene using React Three Fiber and Drei
- Sections for profile, technical capabilities, career journey, projects, stack, and contact details
- Centralized portfolio content in `src/data/portfolioContent.ts`
- Static assets for images, encrypted character models, HDR lighting, and Draco decoding
- GitHub Pages deployment through the `gh-pages` package

## Tech Stack

- React 18
- TypeScript
- Vite
- GSAP and `@gsap/react`
- Three.js
- React Three Fiber
- Drei
- React Three Postprocessing
- React Icons
- Vercel Analytics

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Type-checks the app and creates a production build in `dist/`. |
| `npm run lint` | Runs ESLint across the project. |
| `npm run preview` | Serves the production build locally. |
| `npm run deploy` | Builds and publishes `dist/` to GitHub Pages. |

## Project Structure

```text
.
|-- public/
|   |-- draco/              # Draco decoder assets for compressed 3D models
|   |-- images/             # Portfolio images and preview assets
|   `-- models/             # Character model, HDR environment, and model helpers
|-- src/
|   |-- components/         # Portfolio sections, UI pieces, and 3D scene
|   |-- context/            # Loading state provider
|   |-- data/               # Portfolio profile, work, journey, and stack content
|   |-- App.tsx
|   `-- main.tsx
|-- index.html
|-- package.json
`-- vite.config.ts
```

## Content Updates

Most portfolio copy is managed from:

```text
src/data/portfolioContent.ts
```

Update this file to change the profile summary, projects, experience, contact links, and displayed technology stack without digging through individual components.

## GSAP Plugins Note

This project currently references `gsap-trial`. GSAP trial plugins are intended for local development and testing, and they should not be used for production hosting. If a production deployment depends on Club GSAP plugins, install and configure the licensed Club GSAP package instead.

GSAP installation docs: [gsap.com/docs/v3/Installation](https://gsap.com/docs/v3/Installation/)

## Deployment

The project is configured for GitHub Pages.

```bash
npm run deploy
```

This runs the production build and publishes the generated `dist/` directory using `gh-pages`.

## License

This project is open source and available under the [MIT License](LICENSE).
