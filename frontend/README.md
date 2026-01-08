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

## API Integration

### Base URL Configuration

The frontend communicates with the backend API using environment variables:

```javascript
Base URL: ${VITE_API_BASE_URL}/api/v1
// Defaults to: http://localhost:3000/api/v1
```

### API Client Architecture

All HTTP requests go through the service layer (`src/services/`) built on `BaseService`:

- **AuthService** – Authentication and token management
- **BookService** – Book catalog operations
- **CartService** – Shopping cart management
- **WishlistService** – Wishlist operations
- **OrderService** – Order placement and history
- **UserService** – User management (admin)
- **UploadService** – File uploads
- **RoleService** – Role and permission management (admin)

### Authentication Endpoints

| Method | Endpoint         | Description                         | Auth |
| ------ | ---------------- | ----------------------------------- | ---- |
| POST   | `/auth/register` | Create new account                  | No   |
| POST   | `/auth/login`    | Sign in (sets refresh token cookie) | No   |
| POST   | `/auth/logout`   | Revoke refresh token                | Yes  |
| POST   | `/auth/refresh`  | Rotate access token                 | No   |
| GET    | `/auth/me`       | Get current user profile            | Yes  |

### OAuth Endpoints

| Method | Endpoint                 | Description                       |
| ------ | ------------------------ | --------------------------------- |
| GET    | `/oauth/google`          | Redirect to Google consent screen |
| GET    | `/oauth/google/callback` | Handle Google login callback      |
| GET    | `/oauth/github`          | Redirect to GitHub consent screen |
| GET    | `/oauth/github/callback` | Handle GitHub login callback      |

### Book Endpoints

| Method | Endpoint            | Description                        | Auth          |
| ------ | ------------------- | ---------------------------------- | ------------- |
| GET    | `/books`            | List books (paginated, searchable) | No            |
| GET    | `/books/categories` | List all categories                | No            |
| GET    | `/books/:id`        | Get book details with reviews      | No            |
| POST   | `/books`            | Create new book                    | Admin/Manager |
| PUT    | `/books/:id`        | Update book                        | Admin/Manager |
| DELETE | `/books/:id`        | Delete book                        | Admin/Manager |

### Review Endpoints

| Method | Endpoint                               | Description    | Auth  |
| ------ | -------------------------------------- | -------------- | ----- |
| POST   | `/books/:id/reviews`                   | Submit review  | Yes   |
| PATCH  | `/books/:id/reviews/:reviewId/approve` | Approve review | Admin |
| DELETE | `/books/:id/reviews/:reviewId`         | Delete review  | Admin |

### Cart Endpoints

| Method | Endpoint | Description             | Auth |
| ------ | -------- | ----------------------- | ---- |
| GET    | `/cart`  | Get user's cart         | Yes  |
| PUT    | `/cart`  | Save/replace cart items | Yes  |
| DELETE | `/cart`  | Clear cart              | Yes  |

### Wishlist Endpoints

| Method | Endpoint           | Description              | Auth |
| ------ | ------------------ | ------------------------ | ---- |
| GET    | `/wishlist`        | Get user's wishlist      | Yes  |
| POST   | `/wishlist/toggle` | Add/remove wishlist item | Yes  |
| DELETE | `/wishlist`        | Clear wishlist           | Yes  |

### Order Endpoints

| Method | Endpoint             | Description         | Auth          |
| ------ | -------------------- | ------------------- | ------------- |
| GET    | `/orders`            | List user's orders  | Yes           |
| POST   | `/orders`            | Place new order     | Yes           |
| PATCH  | `/orders/:id/status` | Update order status | Admin/Manager |
| PATCH  | `/orders/:id/cancel` | Cancel order        | Yes           |

### User Management Endpoints

| Method | Endpoint     | Description      | Auth  |
| ------ | ------------ | ---------------- | ----- |
| GET    | `/users`     | List all users   | Admin |
| GET    | `/users/:id` | Get user details | Admin |
| POST   | `/users`     | Create user      | Admin |
| PUT    | `/users/:id` | Update user      | Admin |
| DELETE | `/users/:id` | Delete user      | Admin |

### Other Endpoints

| Method | Endpoint  | Description             | Auth |
| ------ | --------- | ----------------------- | ---- |
| POST   | `/upload` | Upload file (image/PDF) | Yes  |
| GET    | `/health` | Server health check     | No   |

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

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.development` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or the next available port).

## Configuration

### Environment Variables

| Variable            | Type   | Default                        | Description          |
| ------------------- | ------ | ------------------------------ | -------------------- |
| `VITE_API_BASE_URL` | string | `http://localhost:3000/api/v1` | Backend API base URL |

### Example `.env` Files

**Development** (`.env.development`):

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

**Production** (`.env.production`):

```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
```

**Note**: Vite environment variables must be prefixed with `VITE_` to be exposed to the frontend.

# Library Frontend - React SPA

A modern, responsive React Single Page Application for the library management system. Built with Vite and Tailwind CSS, providing a seamless bookstore experience with shopping, wishlists, orders, and role-based dashboards.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
  npm run dev # start dev server
  npm run build # production build
  npm run preview # preview the production build

### 📚 Catalog & Discovery

- Browse books with search functionality
- Filter by category and price range
- Sort by newest, price, or rating
- Detailed book pages with descriptions, reviews, and ratings
- Low stock indicators

### 🔐 Authentication

- Email/password registration and login
- OAuth integration (Google & GitHub)
- Protected routes with role-based access
- Automatic token refresh handling
- Secure logout with token revocation

### 🛒 Shopping Experience

- Add/remove/update cart items
- Persistent cart per user
- Checkout with shipping address capture
- Order placement and success confirmation
- Order history with cancellation support

### ❤️ Wishlist

- Save favorite books
- Toggle wishlist items
- Per-user persistent wishlists

### 📖 Reviews & Ratings

- Submit reviews with star ratings
- Admin review approval workflow
- Display approved reviews on book pages
- Moderation system for quality control

### 👥 Role-Based Dashboards

- **User Dashboard**: Order history and account settings
- **Manager Dashboard**: Inventory management (create/edit/delete books), category selection, stock tracking
- **Admin Dashboard**: Review approvals/deletions, user role management, permissions control

## Tech Stack

-t bookstore-frontend:latest .
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19 |
| Build Tool | Vite | 6 |
| Routing | React Router | 7 |
| Styling | Tailwind CSS | 4 |
| Icons | lucide-react | Latest |
| HTTP Client | Axios | Built-in service layer |

## Prerequisites

- **Node.js** >= 18.0.0 (recommend matching backend version)
- **npm** >= 9.0.0 or **yarn** >= 3.0.0
- **Git** for version control
- Backend API running on accessible URL
  docker run --rm -p 5173:80 bookstore-frontend:latest

````

## Scripts

```bash
npm run dev        # Start dev server with hot reload (Vite)
npm run build      # Build production bundle (minified, optimized)
npm run preview    # Preview production build locally
npm run lint       # Check code quality (if configured)
npm run format     # Format code with Prettier (if configured)
````

## Development

### Hot Module Replacement (HMR)

Vite provides instant HMR during development. Changes to React components will reflect immediately without losing component state.

### Debugging

1. **React DevTools**: Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) browser extension
2. **Network Requests**: Use browser DevTools Network tab to inspect API calls to backend
3. **Console Logs**: Check browser console for application logs
4. **Redux/Context DevTools**: Useful for inspecting state changes (if using Redux)

### Code Style

The project follows consistent code patterns:

- React functional components with hooks
- Service layer abstraction for API calls
- Context API for state management
- Tailwind CSS utility classes for styling
- Kebab-case for component filenames (when component-specific)
- PascalCase for component names

## Docker

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

### Docker Notes

- The app pulls catalog, cart, wishlist, orders, and auth data from the backend API.
- `localStorage` is used for auth tokens and small client-side caches.

- For production, use HTTPS and set `VITE_API_BASE_URL` to your backend's public HTTPS URL.

## Default Accounts

Use backend seed users (see the backend README) or register a new account from the UI.

## Project Structure

```
frontend/
├── src/
│   ├── main.jsx               # App entry point - routing & providers setup
│   ├── main.css               # Tailwind CSS with custom layers
│   ├── types.js               # Shared types, enums, helpers
│   │
│   ├── pages/                 # Route-level pages (full screens)
│   │   ├── sharedPages/       # Public pages (home, books, book detail)
│   │   ├── userPages/         # User authenticated pages (cart, checkout, orders, profile)
│   │   ├── managerPages/      # Manager dashboard (inventory management)
│   │   └── adminPages/        # Admin dashboard (reviews, users, roles)
│   │
│   ├── components/            # Reusable UI components
│   │   ├── layout/            # Page layouts, headers, footers
│   │   ├── book/              # Book-related components (cards, detail, reviews)
│   │   ├── profile/           # User profile components
│   │   ├── manager/           # Manager dashboard components
│   │   ├── ui/                # Generic UI elements (buttons, forms, modals)
│   │   └── routes/            # Route guards (PrivateRoute, ManagerRoute, AdminRoute)
│   │
│   ├── context/               # React Context for global state
│   │   ├── auth/              # Authentication context & hooks
│   │   └── cart/              # Shopping cart context & hooks
│   │
│   ├── services/              # API client services
│   │   ├── BaseService.js     # Base HTTP client (axios wrapper)
│   │   ├── AuthService.js     # Authentication API calls
│   │   ├── BookService.js     # Book CRUD & catalog operations
│   │   ├── CartService.js     # Cart management API
│   │   ├── OrderService.js    # Order placement & history
│   │   ├── WishlistService.js # Wishlist operations
│   │   ├── UserService.js     # User management (admin)
│   │   ├── UploadService.js   # File upload handling
│   │   ├── CategoryService.js # Category data
│   │   └── RoleService.js     # Role & permission management (admin)
│   │
│   ├── validators/            # Form validation schemas
│   │   └── auth/              # Auth form validators
│   │
│   └── assets/                # Static assets (images, icons, etc.)
│
├── index.html                 # Entry HTML
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── .env.development           # Development environment variables (gitignored)
├── .env.production            # Production environment variables (gitignored)
├── .env.example               # Environment template
├── .gitignore
├── Dockerfile                 # Docker containerization
├── nginx.conf                 # Nginx configuration (Docker)
├── package.json
└── README.md
```

### Key Directories Explained

- **pages/** - Route-level components that fill the entire screen. Organized by user role (shared, user, manager, admin)
- **components/** - Reusable UI components that don't fill the entire screen (e.g., buttons, cards, forms)
- **services/** - All HTTP communication with the backend API (no fetch/axios calls directly in components)
- **context/** - Global state that needs to be shared across the app (auth state, cart state)
- **validators/** - Form validation logic and schemas

## Authentication

### How Authentication Works

1. **Login/Register**: User credentials sent to backend via `AuthService`
2. **Token Storage**:
   - `accessToken` stored in `localStorage` for API requests
   - `refreshToken` stored as httpOnly cookie (set by backend)
3. **Token Refresh**: When access token expires, a new one is requested automatically
4. **Protected Routes**: Components wrapped with `PrivateRoute`, `ManagerRoute`, or `AdminRoute` guards
5. **Logout**: Tokens cleared and user redirected to login page

### Auth Context Hooks

```javascript
// Available in any component via useAuth hook
const { user, isAuthenticated, isLoading, login, logout, register } = useAuth();
```

### OAuth Integration

The app supports OAuth login via Google and GitHub:

- Redirect to OAuth provider's consent screen
- Backend handles callback and token exchange
- User automatically logged in after successful redirect

## State Management

### Authentication Context (`src/context/auth/`)

Manages:

- Current user profile
- Authentication state
- Auth token lifecycle
- Login/logout/register functions
- Role information for access control

**Usage**:

```javascript
import { useAuth } from "./context/auth";

function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  // ... component logic
}
```

### Cart Context (`src/context/cart/`)

Manages:

- Current shopping cart items
- Cart total and item count
- Add/remove/update item functions
- Cart sync with backend

**Usage**:

```javascript
import { useCart } from "./context/cart";

function MyComponent() {
  const { cart, addToCart, removeFromCart } = useCart();
  // ... component logic
}
```

### Local Storage

Used for:

- Access token persistence across sessions
- Small UI state (e.g., sidebar collapsed state)
- User preferences

**Note**: Refresh token is stored as httpOnly cookie by backend for security.

## Data and Auth Flow

### Initial App Load

1. App checks for existing `accessToken` in localStorage
2. If token exists, validates it by fetching user profile (`/auth/me`)
3. If token expired, requests new one via refresh endpoint
4. Sets up global auth context based on user data
5. Routes rendered based on user's role and permissions

### API Request Flow

```
Component → Service Layer → API Client (BaseService) → Backend API
     ↓
Response Interceptor (handles token refresh on 401) → Context Update → UI Re-render
```

## Deployment

### Build for Production

```bash
# With environment variables set for production
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1 npm run build
```

This creates an optimized build in the `dist/` directory.

### Environment Setup for Production

Create `.env.production`:

```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
```

### Docker Deployment

```bash
# Build image with production API URL
docker build \
  --build-arg VITE_API_BASE_URL=https://api.yourdomain.com/api/v1 \
  -t bookstore-frontend:latest .

# Run container
docker run -d -p 80:80 bookstore-frontend:latest
```

### Static Hosting Options

The `dist/` folder contains static files that can be deployed to:

- **AWS S3 + CloudFront**
- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Traditional Web Server** (Nginx, Apache)

For SPA routing to work, configure your host to:

- Serve `index.html` for all non-file routes
- Set proper cache headers (cache assets, don't cache HTML)
- Enable GZIP compression

## Troubleshooting

### Common Issues

#### 1. "Cannot reach backend API"

**Symptoms**: Network errors when trying to login or load books

**Solutions**:

- Verify backend is running: `curl http://localhost:3000/api/v1/health`
- Check `VITE_API_BASE_URL` in `.env` file
- Ensure CORS is properly configured on backend
- Check browser console for CORS errors

#### 2. "Token expired/invalid" after login

**Symptoms**: Logged in but immediately redirected to login page

**Solutions**:

- Clear browser localStorage: Open DevTools → Storage → LocalStorage → Clear All
- Clear cookies: DevTools → Application → Cookies → Delete all
- Try logging in again
- Verify backend JWT secrets are configured

#### 3. "Blank page or infinite loading"

**Symptoms**: App loads but displays nothing

**Solutions**:

- Check browser console for JavaScript errors
- Verify no 404 errors for CSS/JS in Network tab
- Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

#### 4. OAuth login not working

**Symptoms**: Redirect to OAuth provider works but callback fails

**Solutions**:

- Verify OAuth client ID/secret configured on backend
- Check OAuth redirect URI matches backend configuration
- Ensure backend can reach Google/GitHub APIs
- Check console for callback errors

#### 5. Cart/Wishlist not persisting

**Symptoms**: Cart clears after page refresh

**Solutions**:

- Verify you're authenticated (not guest user)
- Check Network tab for failed cart API calls
- Ensure backend is running and accessible
- Check browser localStorage is enabled

### Development Debugging Tips

```javascript
// View current auth state
console.log(localStorage.getItem("accessToken"));

// Check API base URL
console.log(process.env.VITE_API_BASE_URL);

// Clear all stored data
localStorage.clear();
sessionStorage.clear();
```

### Useful Browser Extensions

- **React Developer Tools**: Inspect component tree and state
- **Redux DevTools**: Time-travel debugging (if Redux used)
- **Axios DevTools**: Intercept and inspect API requests

## Default Test Accounts

Use these credentials to test the application (created by backend seed):

| Email               | Password     | Role    | Purpose                                              |
| ------------------- | ------------ | ------- | ---------------------------------------------------- |
| admin@example.com   | Password123! | Admin   | Full system access, review approval, user management |
| manager@example.com | Password123! | Manager | Inventory management, order status updates           |
| user1@example.com   | Password123! | User    | Regular user, shopping, orders                       |

**Or** register a new account from the UI signup page.

## Quick Links & Resources

- [Backend README](../backend/README.md) - API documentation and setup
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

```

```
