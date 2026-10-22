# Gachiakuta

Anime Gachiakuta fan website.
Live Link - https://gachiakuta.vercel.app/

## Stack

- React 18 + Vite + Tailwind CSS v4
- GSAP (ScrollTrigger, SplitText) + Lenis for smooth scrolling
- three.js for the procedural, cel-shaded 3D scenes (no model files — everything is built in code)

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run preview  # serve the production build
```

## Structure

```
src/
  components/   Nav, Footer, Loader, Cursor, SmoothScroll, ThreeCanvas
  sections/     Home page sections (Hero, Divide, Cast, Watchman, Jinki)
  pages/        Home (+ useHomeAnimations), Characters
  data/         Character and Watchman Series content
  three/        three.js scenes, toon/outline helpers, Watchman item models
  lib/          gsap setup, tilt, intro handshake, utils
public/img/     Optimised WebP images
```

## Performance notes

- Images are pre-optimised WebP with responsive sizes; add new ones under `public/img/`.
- three.js and every scene are lazy-loaded; `ThreeCanvas` renders only while on screen,
  caps device pixel ratio and drops resolution on slow devices.
- All animation respects `prefers-reduced-motion` (Lenis, GSAP timelines and 3D motion are disabled or calmed).
