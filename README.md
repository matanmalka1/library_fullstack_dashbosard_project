## Gemini Library

Frontend-only bookstore experience built with React, JavaScript, Vite, and Tailwind CSS. All data lives in `localStorage`, and the catalog is seeded from `constants.js` on first run.

## Features

- Browse books, view details, and search/filter through the catalog
- Cart, wishlist, and checkout flow
- Auth with user sessions stored in `localStorage`
- Orders history and admin/manager dashboards (role-gated routes)

## Tech Stack

- React 19 + JavaScript
- Vite 6
- Tailwind CSS 4
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

## Styling

- Tailwind utilities are used across the UI; global styles and keyframes live in `src/main.css`.
- Theme tokens are configured in `tailwind.config.js`.

## Data and Storage

- The app uses `localStorage` for books, users, auth sessions, carts, wishlists, and orders.
- Seeded books live in `constants.js` (`INITIAL_BOOKS`) and are loaded if no books exist.
- To reset the app to a clean state, clear your browser `localStorage`.

## Default User Accounts

For testing purposes, you can create these accounts or use the registration flow:

- **Admin**: admin@gmail.com / password (must be created via registration)
- **Manager**: manager@gmail.com / password (must be created via registration)
- **User**: user@gmail.com / password (must be created via registration)

Note: Role assignment is manual in this demo. By default, all registered users have USER role.

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
