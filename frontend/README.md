## Frontend

React + Vite SPA for the bookstore experience. Auth, catalog, carts, wishlists, orders, and dashboards are backed by the Express API.

## Features

- Catalog browsing with search, category filters, price ceiling, and sort (newest, price, rating)
- Book detail pages with wishlist toggle, low-stock messaging, and approved review display + submission (with moderation)
- Auth: email/password sign-up & login, OAuth callback support, protected/role-gated routes, and token refresh handling
- Cart and checkout: add/update/remove items, address capture, order placement, and success flow
- Orders: purchase history with cancellation; manager view to update order statuses
- Wishlist: save/remove favorites and sync per user
- Dashboards: manager inventory CRUD (create/edit/delete books, category selection, stock/status tracking); admin review approvals/deletions and user role management

## Stack

- React 19
- Vite 6
- React Router 7
- Tailwind CSS 4
- lucide-react icons

## API Endpoints (backend)

Base URL: `${VITE_API_BASE_URL}/api/v1`

- Auth
  - POST `/auth/register` – create account
  - POST `/auth/login` – sign in and set refresh token cookie
  - POST `/auth/logout` – revoke refresh token
  - POST `/auth/refresh` – rotate access token
  - GET `/auth/me` – current user profile
- OAuth
  - GET `/oauth/google` → Google consent
  - GET `/oauth/google/callback` – login redirect handler
  - GET `/oauth/github` → GitHub consent
  - GET `/oauth/github/callback` – login redirect handler
- Books
  - GET `/books` – list books
  - GET `/books/categories` – list categories
  - GET `/books/:id` – book detail
  - POST `/books` – create (admin/manager)
  - PUT `/books/:id` – update (admin/manager)
  - DELETE `/books/:id` – delete (admin/manager)
- Reviews
  - POST `/reviews/books/:id/reviews` – add review (auth)
  - PATCH `/reviews/books/:id/reviews/:reviewId/approve` – approve (admin)
  - DELETE `/reviews/books/:id/reviews/:reviewId` – remove (admin)
- Wishlist
  - GET `/wishlist` – get user wishlist (auth)
  - POST `/wishlist/toggle` – toggle item (auth)
  - DELETE `/wishlist` – clear (auth)
- Cart
  - GET `/cart` – fetch cart (auth)
  - PUT `/cart` – save cart (auth)
  - DELETE `/cart` – clear cart (auth)
- Orders
  - GET `/orders` – list user orders (auth)
  - POST `/orders` – place order (auth)
  - PATCH `/orders/:id/status` – update status (admin/manager)
  - PATCH `/orders/:id/cancel` – cancel (auth)
- Users
  - GET `/users` – list users (admin)
  - GET `/users/:id` – user detail (admin)
  - POST `/users` – create user (admin)
  - PUT `/users/:id` – update user (admin)
  - DELETE `/users/:id` – remove user (admin)
- Uploads
  - POST `/upload` – upload file (auth)
- Health
  - GET `/health` – service + DB status

## Prerequisites

- Node.js 18+ (works best with the version used by the backend)
- npm 9+

## Environment

Set the API base URL (defaults to `http://localhost:3000/api/v1`). You can place this in a `.env` file at the project root:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Run Locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the production build
```

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

- `VITE_API_BASE_URL` is injected at build time; set it to the backend’s public URL when deploying.
- The container serves static files via Nginx with SPA fallback.

## Project Structure

- `src/main.jsx` wires up routing and providers
- `src/pages/` contains route-level screens (books, cart, checkout, auth, dashboards)
- `src/components/` holds UI building blocks (book cards, layout, manager/admin UI, shared UI)
- `src/context/` provides auth and cart state
- `src/services/` contains API clients built on `BaseService` (auth, books, cart, wishlist, orders, uploads, roles, users)
- `src/types.js` holds shared enums and helpers; `src/main.css` contains Tailwind layers

## Data and Auth

- The app pulls catalog, cart, wishlist, orders, and auth data from the backend API.
- `localStorage` is used for auth tokens and small client-side caches.

## Default Accounts

Use backend seed users (see the backend README) or register a new account from the UI.
