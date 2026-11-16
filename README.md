# Paddock Labs

A React + TypeScript landing page for kart telemetry and AI coaching.

## Development

Use Node.js 24 and npm (the project uses `package-lock.json`).

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run build
npm run lint
npm run preview
```

The build type-checks the application before creating `dist/`.

## Structure

- `src/App.tsx`: composes all page sections.
- `src/components/`: Navbar, Hero, About, AI Coaching, Telemetry Simulator,
  Team, Contact, Footer, and their section styles.
- `src/index.css`: Tailwind and shared base styles.
- `src/App.css`: application layout only.
- `src/assets/` and `public/`: local assets.
- `vite.config.ts`: the single Vite configuration, with React and Tailwind.

The navbar links to the home, about, product specifications, AI coaching,
telemetry simulator, team, contact, and footer targets. On smaller screens,
the menu button reveals the same navigation. Anchor targets account for the
fixed navbar.

## Demo limitations

Telemetry and AI comparisons use simulated/sample data. The kart illustration
is a static concept, not an interactive 3D model. The contact form is a local
demo and does not send messages to a server.
