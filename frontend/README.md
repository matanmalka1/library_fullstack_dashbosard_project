## Library

Bookstore experience built with React, JavaScript, and Vite. Auth and user management are backed by the Express API, while the catalog and shopping data still live in `localStorage` for now.

## Features

- Browse books, view details, and search/filter through the catalog
- Cart, wishlist, and checkout flow
- Auth and user management via the backend API
- Orders history and admin/manager dashboards (role-gated routes)

## Tech Stack

- React 19 + JavaScript
- Vite 6
- React Router 7
- lucide-react icons

## Getting Started

Set the API base URL (defaults to `http://localhost:3000/api/v1`):

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Docker

Build a production image (static files served by Nginx):

```bash
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:3000/api/v1 \
  -t bookstore-frontend:latest .
```

Run the container (serves on host port 5173):

```bash
docker run --rm -p 5173:80 bookstore-frontend:latest
```

Notes:

- The `VITE_API_BASE_URL` build-arg is injected at build time for Vite. Set it to your backend’s public URL.
- The container serves static files via Nginx with SPA fallback configured.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Data and Storage

- The app now uses the backend API for books, carts, wishlists, and orders.
- `localStorage` is used primarily for auth state and small client-side caches.

## Default User Accounts

Use the backend seed users (see backend README) or register a new account from the UI.

## Project Structure

- `App.jsx` defines routes and layout
- `pages/` contains route-level screens
- `components/` contains reusable UI
- `context/` provides auth and cart state
- `services/api/` is a modular API layer that talks to the Express backend via `http.js`
  - `http.js` - Axios HTTP client configured with `VITE_API_BASE_URL`
  - `core.js` - Storage helpers for auth and small caches
  - `auth.js` - Authentication services
  - `books.js` - Book management
  - `index.js` - Main API export (`api`)
- `types.js` defines shared enums and `constants.js` defines shared UI constants (e.g., categories)
