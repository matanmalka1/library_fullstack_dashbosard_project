# Library Full‑Stack App

Full‑stack bookstore application with a React + Vite frontend and an Express + MongoDB REST API backend.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment](#environment)
- [Scripts](#scripts)
- [Project Structure](#project-structure-full)
- [API & Frontend Docs](#api--frontend-docs)
- [Security](#security-features)
- [Testing](#testing-with-curl-examples)
- [Deployment](#deployment-notes)
- [Contributing](#contributing)

## Overview

Monorepo with two apps:

- `frontend/` – React + Tailwind UI (customers, managers, admin)
- `backend/` – Express + MongoDB API (auth, catalog, orders)

Architecture follows layered patterns per [agents.md](agents.md):

Routes → Controllers → Services → Models

Frontend uses the backend API for all data. Client storage is limited to lightweight state (auth payload, small caches).

## Features

Frontend:

- Browse books, view details, search, and filter.
- Cart, wishlist, checkout flow, and order history.
- Auth screens and role-gated admin/manager dashboards.

Backend:

- Authentication and authorization with JWT + refresh token rotation.
- Book CRUD and review approval workflow.
- Cart, wishlist, and order management.
- File upload with validation.
- Centralized error handling, security middleware, and rate limiting.
- Database seed for roles, permissions, and users.

## Tech Stack

Frontend:

- React 19 + JavaScript
- Vite 6
- React Router 7
- Tailwind CSS 4
- React Hook Form
- lucide-react icons

Backend:

- Node.js (>= 18)
- Express 4
- MongoDB + Mongoose
- JWT auth with refresh tokens
- Multer, Helmet, CORS, rate limiting, Winston logging

## Prerequisites

- Node.js >= 18
- npm
- MongoDB >= 6 (local or Atlas)

## Quick Start

Spin up backend and frontend locally:

```bash
# Backend
cd backend
npm install
npm run seed
npm run dev

# In a second terminal
# Frontend
cd ../frontend
npm install
npm run dev
```

Frontend reads API base URL from `.env.development` (see Configuration below).

## Environment

Backend env files:

- `.env.development` (default)
- `.env.production` (when `NODE_ENV=production`)

Frontend env files:

- `.env.development`
- `.env.production`

Key variables:

Backend (set in backend env files):

- `MONGODB_URI` – MongoDB connection string
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` – 32+ char secrets
- `CORS_ORIGIN` – comma‑separated origins (include frontend URL)
- See more in backend docs: `backend/readme.md`

Frontend (set in frontend env files):

- `VITE_API_BASE_URL` – defaults to `http://localhost:3000/api/v1`

## Scripts

Backend (`backend/package.json`):

```bash
npm run dev      # Start dev server with nodemon
npm start        # Start production server
npm run seed     # Seed database
```

Frontend (`frontend/package.json`):

```bash
npm run dev
npm run build
npm run preview
```

## Data and Storage (Frontend)

- The frontend now reads books, carts, wishlists, and orders from the backend API.
- `localStorage` is used only for lightweight client state such as the auth payload and small caches.

## Default Users (Backend)

All seeded users share password: `Password123!`

| Email               | Role    | Permissions                                        |
| ------------------- | ------- | -------------------------------------------------- |
| admin@example.com   | Admin   | All permissions                                    |
| manager@example.com | Manager | Users (read, create, update), roles (read), upload |
| user1@example.com   | User    | Basic access                                       |

## API

For full endpoint documentation, examples, and error codes, see:

- Backend API docs: `backend/readme.md`
- Frontend integration: `frontend/README.md`

Base API URL during development: `http://localhost:3000/api/v1`

## API Response Format

Success:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

## Error Codes

| Code                    | Description              | Status |
| ----------------------- | ------------------------ | ------ |
| `VALIDATION_ERROR`      | Input validation failed  | 400    |
| `AUTHENTICATION_ERROR`  | Authentication failed    | 401    |
| `AUTHORIZATION_ERROR`   | Insufficient permissions | 403    |
| `RESOURCE_NOT_FOUND`    | Resource not found       | 404    |
| `DUPLICATE_RESOURCE`    | Resource already exists  | 400    |
| `TOKEN_EXPIRED`         | JWT token expired        | 401    |
| `INVALID_TOKEN`         | Invalid JWT token        | 401    |
| `INVALID_CREDENTIALS`   | Invalid email/password   | 401    |
| `REFRESH_TOKEN_INVALID` | Invalid refresh token    | 401    |
| `REFRESH_TOKEN_EXPIRED` | Refresh token expired    | 401    |
| `FILE_UPLOAD_ERROR`     | File upload failed       | 400    |
| `FILE_TOO_LARGE`        | File exceeds size limit  | 400    |
| `INVALID_FILE_TYPE`     | File type not allowed    | 400    |
| `RATE_LIMIT_EXCEEDED`   | Rate limit exceeded      | 429    |
| `SERVER_ERROR`          | Internal server error    | 500    |

## Security Features

- Password hashing with bcrypt (10 rounds).
- JWT authentication with access and refresh tokens.
- Refresh token rotation (one-time use).
- httpOnly cookies for refresh tokens.
- Rate limiting (global + stricter on auth routes).
- Helmet security headers and CORS origin whitelist.
- Input validation on all endpoints.
- File upload restrictions (type and size).
- Auto-expiring tokens via MongoDB TTL indexes.

## Testing with cURL (Examples)

Register:

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Login:

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "admin@example.com",
    "password": "Password123!"
  }'
```

Get users:

```bash
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

Upload file:

```bash
curl -X POST http://localhost:3000/api/v1/upload \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -F "file=@/path/to/your/file.jpg"
```

## Deployment Notes

- Set `NODE_ENV=production`.
- Use production values for secrets and MongoDB URI.
- Set `COOKIE_SECURE=true` and `CORS_ORIGIN` to the frontend domain.
- `backend/Dockerfile` and `backend/docker-compose.yml` are available for containerized setups.

## Project Structure (Full)

```
.
|-- .DS_Store
|-- backend
|   |-- .dockerignore
|   |-- .env.development
|   |-- .env.docker
|   |-- .env.production
|   |-- .gitignore
|   |-- Dockerfile
|   |-- docker-compose.yml
|   |-- logs
|   |   |-- combined.log
|   |   +-- error.log
|   |-- package-lock.json
|   |-- package.json
|   |-- readme.md
|   |-- src
|   |   |-- .DS_Store
|   |   |-- app.js
|   |   |-- config
|   |   |   |-- db.js
|   |   |   +-- env.js
|   |   |-- constants
|   |   |   +-- api-error-codes.js
|   |   |-- controllers
|   |   |   |-- auth.controller.js
|   |   |   |-- book.controller.js
|   |   |   |-- cart.controller.js
|   |   |   |-- order.controller.js
|   |   |   |-- review.controller.js
|   |   |   |-- upload.controller.js
|   |   |   |-- user.controller.js
|   |   |   +-- wishlist.controller.js
|   |   |-- middlewares
|   |   |   |-- auth.middleware.js
|   |   |   |-- errorHandler.js
|   |   |   |-- notFound.js
|   |   |   |-- rateLimiter.js
|   |   |   |-- requestLogger.js
|   |   |   +-- upload.js
|   |   |-- models
|   |   |   |-- Book.js
|   |   |   |-- Cart.js
|   |   |   |-- Order.js
|   |   |   |-- Permission.js
|   |   |   |-- RefreshToken.js
|   |   |   |-- Review.js
|   |   |   |-- Role.js
|   |   |   |-- User.js
|   |   |   |-- Wishlist.js
|   |   |   +-- index.js
|   |   |-- routes
|   |   |   |-- auth.routes.js
|   |   |   |-- book.routes.js
|   |   |   |-- cart.routes.js
|   |   |   |-- health.routes.js
|   |   |   |-- index.js
|   |   |   |-- order.routes.js
|   |   |   |-- review.routes.js
|   |   |   |-- upload.routes.js
|   |   |   |-- user.routes.js
|   |   |   +-- wishlist.routes.js
|   |   |-- seed.js
|   |   |-- server.js
|   |   |-- services
|   |   |   |-- auth.service.js
|   |   |   |-- book.service.js
|   |   |   |-- cart.service.js
|   |   |   |-- order.service.js
|   |   |   |-- review.service.js
|   |   |   |-- user.service.js
|   |   |   +-- wishlist.service.js
|   |   |-- utils
|   |   |   |-- asyncHandler.js
|   |   |   |-- jwt.js
|   |   |   |-- logger.js
|   |   |   |-- normalize.js
|   |   |   |-- password.js
|   |   |   +-- response.js
|   |   +-- validators
|   |       |-- authValidate.js
|   |       |-- bookValidate.js
|   |       |-- cartValidate.js
|   |       |-- orderValidate.js
|   |       |-- reviewValidate.js
|   |       |-- uploadValidate.js
|   |       |-- userValidate.js
|   |       |-- validatorUtils.js
|   |       +-- wishlistValidate.js
|   +-- uploads
|-- frontend
|   |-- .env
|   |-- .gitignore
|   |-- AGENT.md
|   |-- README.md
|   |-- index.html
|   |-- package-lock.json
|   |-- package.json
|   |-- src
|   |   |-- .DS_Store
|   |   |-- Utils
|   |   |   +-- constants.js
|   |   |-- components
|   |   |   |-- .DS_Store
|   |   |   |-- book
|   |   |   |   |-- .DS_Store
|   |   |   |   |-- BookCard
|   |   |   |   |   |-- BookCard.jsx
|   |   |   |   |   |-- BookCardBody.jsx
|   |   |   |   |   +-- BookCardMedia.jsx
|   |   |   |   |-- BookInfo
|   |   |   |   |   |-- BookInfo.jsx
|   |   |   |   |   |-- BookInfoDetails.jsx
|   |   |   |   |   |-- BookInfoFeature.jsx
|   |   |   |   |   +-- BookInfoMedia.jsx
|   |   |   |   +-- ReviewSection
|   |   |   |       |-- ReviewList.jsx
|   |   |   |       |-- ReviewSection.jsx
|   |   |   |       +-- ReviewSummary.jsx
|   |   |   |-- layout
|   |   |   |   |-- .DS_Store
|   |   |   |   |-- Footer
|   |   |   |   |   +-- Footer.jsx
|   |   |   |   |-- Navbar
|   |   |   |   |   |-- Navbar.jsx
|   |   |   |   |   |-- NavbarActions.jsx
|   |   |   |   |   |-- NavbarLinks.jsx
|   |   |   |   |   +-- NavbarMobileMenu.jsx
|   |   |   |   +-- Routing
|   |   |   |       +-- Routing.jsx
|   |   |   |-- manager
|   |   |   |   |-- .DS_Store
|   |   |   |   |-- BookFormModal
|   |   |   |   |   |-- BookFormFields.jsx
|   |   |   |   |   |-- BookFormHeader.jsx
|   |   |   |   |   |-- BookFormMedia.jsx
|   |   |   |   |   |-- BookFormModal.jsx
|   |   |   |   |   +-- useBookFormModal.js
|   |   |   |   |-- InventoryStats
|   |   |   |   |   +-- InventoryStats.jsx
|   |   |   |   +-- InventoryTable
|   |   |   |       +-- InventoryTable.jsx
|   |   |   |-- routes
|   |   |   |   +-- PrivateRoute.jsx
|   |   |   +-- ui
|   |   |       |-- AlertBanner.jsx
|   |   |       +-- ErrorBoundary.jsx
|   |   |-- context
|   |   |   |-- .DS_Store
|   |   |   |-- auth
|   |   |   |   +-- AuthContext.jsx
|   |   |   +-- cart
|   |   |       +-- CartContext.jsx
|   |   |-- main.css
|   |   |-- main.jsx
|   |   |-- pages
|   |   |   |-- .DS_Store
|   |   |   |-- AdminDashboard
|   |   |   |   |-- AdminDashboard.jsx
|   |   |   |   |-- AdminDashboardNav.jsx
|   |   |   |   |-- AdminReviewsPanel.jsx
|   |   |   |   +-- AdminUsersPanel.jsx
|   |   |   |-- BookDetails
|   |   |   |   +-- BookDetails.jsx
|   |   |   |-- Books
|   |   |   |   +-- Books.jsx
|   |   |   |-- Cart
|   |   |   |   |-- Cart.jsx
|   |   |   |   |-- CartEmpty.jsx
|   |   |   |   |-- CartItems.jsx
|   |   |   |   +-- CartSummary.jsx
|   |   |   |-- Checkout
|   |   |   |   |-- Checkout.jsx
|   |   |   |   |-- CheckoutForm.jsx
|   |   |   |   |-- CheckoutSuccess.jsx
|   |   |   |   +-- CheckoutSummary.jsx
|   |   |   |-- Home
|   |   |   |   |-- Home.jsx
|   |   |   |   |-- HomeCTA.jsx
|   |   |   |   |-- HomeFeatured.jsx
|   |   |   |   |-- HomeFeatures.jsx
|   |   |   |   +-- HomeHero.jsx
|   |   |   |-- Login
|   |   |   |   |-- Login.jsx
|   |   |   |   |-- LoginFormPanel.jsx
|   |   |   |   +-- LoginVisual.jsx
|   |   |   |-- ManagerDashboard
|   |   |   |   +-- ManagerDashboard.jsx
|   |   |   |-- Orders
|   |   |   |   |-- OrderCard.jsx
|   |   |   |   |-- OrderCardFooter.jsx
|   |   |   |   |-- OrderCardHeader.jsx
|   |   |   |   |-- OrderCardItems.jsx
|   |   |   |   +-- Orders.jsx
|   |   |   |-- Register
|   |   |   |   |-- Register.jsx
|   |   |   |   |-- RegisterFormPanel.jsx
|   |   |   |   +-- RegisterVisual.jsx
|   |   |   +-- Wishlist
|   |   |       +-- Wishlist.jsx
|   |   |-- services
|   |   |   |-- .DS_Store
|   |   |   +-- api
|   |   |       |-- auth.js
|   |   |       |-- auth.utils.js
|   |   |       |-- books.js
|   |   |       |-- cart.js
|   |   |       |-- core.js
|   |   |       |-- error.js
|   |   |       |-- http.js
|   |   |       |-- index.js
|   |   |       |-- normalize.js
|   |   |       |-- orders.js
|   |   |       |-- reviews.js
|   |   |       +-- wishlist.js
|   |   +-- types.js
|   |-- tailwind.config.js
|   +-- vite.config.js
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

MIT.

## Support

Open an issue for bugs or questions.
