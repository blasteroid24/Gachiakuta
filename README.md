# Requiem React App Boilerplate

A blazing fast, modern React scaffolding setup built with Vite. It provides a beautiful, minimal, and fully responsive starting point for web applications.

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Language**: TypeScript

## Features

- **Lightning Fast HMR**: Instant feedback during development thanks to Vite.
- **Beautiful Minimal UI**: A clean, typography-focused starting template with custom background gradients and modern glassmorphism elements.
- **Fully Responsive**: Out-of-the-box support for mobile (phones), tablets (iPads), and desktop screens. 
- **Mobile Menu Toggle**: A built-in animated mobile navigation overlay.
- **Pre-configured Paths**: Aliases set up out of the box (`@/` maps to `src/`).

## Screenshots & Demos

Check out the responsive layout across devices:

- **Desktop View**:

![Desktop View 1](https://res.cloudinary.com/duw6ht4tk/image/upload/v1778145181/Screenshot_2026-05-07_144030_kg2d6z.png)

![Desktop View 2](https://res.cloudinary.com/duw6ht4tk/image/upload/v1778145180/Screenshot_2026-05-07_144040_pabn10.png)

- **Mobile View**:

![Mobile View](https://res.cloudinary.com/duw6ht4tk/image/upload/v1778145180/Screenshot_2026-05-07_144058_lpitqw.png)
## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── layout/         # Header and Footer components
├── pages/              # Route components (Home, About)
├── App.tsx             # Main router configuration
├── main.tsx            # React application entry point
└── index.css           # Global Tailwind imports and custom styles
```
