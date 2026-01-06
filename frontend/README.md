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

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Data and Storage

- The app uses `localStorage` for books, carts, wishlists, and orders.
- Seeded books live in `constants.js` (`INITIAL_BOOKS`) and are loaded if no books exist.
- To reset the app to a clean state, clear your browser `localStorage`.

## Default User Accounts

Use the backend seed users (see backend README) or register a new account from the UI.

## Project Structure

- `App.jsx` defines routes and layout
- `pages/` contains route-level screens
- `components/` contains reusable UI
- `context/` provides auth and cart state
- `services/api/` is a modular localStorage-backed API layer
  - `core.js` - Storage utilities
  - `auth.js` - Authentication services
  - `books.js` - Book management
  - `index.js` - Main API export
- `types.js` and `constants.js` define shared enums and seed data
