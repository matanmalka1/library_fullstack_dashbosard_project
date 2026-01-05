## Gemini Library

Frontend-only bookstore experience built with React, JavaScript, and Vite. All data lives in `localStorage`, and the catalog is seeded from `constants.js` on first run.

## Features

- Browse books, view details, and search/filter through the catalog
- Cart, wishlist, and checkout flow
- Auth with user sessions stored in `localStorage`
- Orders history and admin/manager dashboards (role-gated routes)

## Tech Stack

- React 19 + JavaScript
- Vite 6
- React Router 7
- lucide-react icons

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Data and Storage

- The app uses `localStorage` for books, users, auth sessions, carts, wishlists, and orders.
- Seeded books live in `constants.js` (`INITIAL_BOOKS`) and are loaded if no books exist.
- To reset the app to a clean state, clear your browser `localStorage`.

## Project Structure

- `App.jsx` defines routes and layout
- `pages/` contains route-level screens
- `components/` contains reusable UI
- `context/` provides auth and cart state
- `services/` is a localStorage-backed API layer
- `types.js` and `constants.js` define shared enums and seed data
