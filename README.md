## Gemini Library

Frontend-only bookstore experience built with React, TypeScript, and Vite. All data lives in `localStorage`, and the catalog is seeded from `constants.ts` on first run.

## Features

- Browse books, view details, and search/filter through the catalog
- Cart, wishlist, and checkout flow
- Auth with user sessions stored in `localStorage`
- Orders history and admin/manager dashboards (role-gated routes)

## Tech Stack

- React 19 + TypeScript
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
- Seeded books live in `constants.ts` (`INITIAL_BOOKS`) and are loaded if no books exist.
- To reset the app to a clean state, clear your browser `localStorage`.

## Project Structure

- `App.tsx` defines routes and layout
- `pages/` contains route-level screens
- `components/` contains reusable UI
- `context/` provides auth and cart state
- `services/` is a localStorage-backed API layer
- `types.ts` and `constants.ts` define shared types and seed data
