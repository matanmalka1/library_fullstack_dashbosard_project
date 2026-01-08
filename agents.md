# agents.md

This file defines how AI agents should understand, navigate, and modify this repository.
All agents MUST follow these rules when reading or writing code in this project.

---

## 1. Project Overview

This is a **full-stack web application** consisting of:

- **Backend**: Node.js + Express REST API
- **Frontend**: React (Vite) + Tailwind CSS
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT-based authentication with refresh tokens
- **Architecture**: Layered (routes → controllers → services → models)

The domain includes:

- Users, roles, and permissions
- Books, reviews, wishlists
- Cart and orders
- Admin/manager dashboards

---

## 2. Repository Structure

/backend → Express API, database, auth, business logic
/frontend → React UI, pages, components, API clients

### Backend (`/backend`)

- `src/app.js` – Express app setup
- `src/server.js` – Server bootstrap
- `src/routes/` – Route definitions only
- `src/controllers/` – HTTP request/response handling
- `src/services/` – Business logic
- `src/models/` – Mongoose models
- `src/middlewares/` – Auth, validation, error handling
- `src/validators/` – Request validation
- `src/utils/` – Shared helpers (JWT, logging, responses)

### Frontend (`/frontend`)

- `src/pages/` – Route-level pages
- `src/components/` – Reusable UI components
- `src/context/` – React context (auth, cart)
- `src/services/api/` – API clients and HTTP utilities
- `src/routes/` – Route guards (e.g. PrivateRoute)
- `src/main.jsx` – App entry point

---

## 3. General Rules for AI Agents

### DO

- Follow existing folder structure and patterns
- Keep changes **small and scoped**
- Reuse existing utilities and helpers
- Match code style and naming conventions
- Prefer readable, explicit code over clever code
- Update or add validation when modifying APIs

### DO NOT

- Introduce new frameworks without request
- Bypass authentication or authorization logic
- Mix concerns (e.g., DB logic inside controllers)
- Modify unrelated files
- Commit secrets or environment variables

---

## 4. Backend Rules

### Architecture

- **Routes** only define endpoints and middleware
- **Controllers** handle HTTP logic only
- **Services** contain business logic
- **Models** define schema and persistence logic

Example flow:
Route → Middleware → Controller → Service → Model

### Error Handling

- Use centralized error handling (`middlewares/errorHandler.js`)
- Use standardized API responses (`utils/response.js`)
- Do not return raw errors directly

### Validation

- All request payloads MUST be validated
- Use files in `src/validators/`
- Never trust client input

### Auth & Security

- Use JWT utilities from `utils/jwt.js`
- Respect role & permission checks
- Do not weaken rate limiting or auth middleware

---

## 5. Frontend Rules

### Components

- Components should be **small and focused**
- Prefer composition over large monolithic components
- UI-only logic stays in components
- Business/API logic stays in `services/api`

### State Management

- Auth state → `AuthContext`
- Cart state → `CartContext`
- Avoid unnecessary global state

### API Usage

- All HTTP calls go through `src/services/api`
- Do not call `fetch` or `axios` directly in components
- Normalize API responses when needed

---

## 6. Styling Rules

- Tailwind CSS only
- Do not introduce inline styles unless unavoidable
- Follow existing class naming and layout patterns
- Keep UI accessible and responsive

---

## 7. Naming Conventions

- Files: `kebab-case` or `PascalCase` (match existing)
- Components: `PascalCase`
- Hooks: `useSomething`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

---

## 8. Environment & Config

- Environment variables are defined in:
  - `.env.development`
  - `.env.production`
  - `.env.docker`
- Never hardcode secrets
- Assume different environments exist

---

## 9. Testing & Stability

If modifying existing behavior:

- Preserve backward compatibility where possible
- Avoid breaking API contracts
- Prefer additive changes over destructive ones

---

## 10. When Unsure

If requirements are ambiguous:

- Make the **smallest reasonable assumption**
- Prefer existing patterns over inventing new ones
- Leave TODO comments instead of guessing

---

## 11. Agent Priority

**Correctness > Consistency > Performance > Convenience**

If a tradeoff is required, always favor correctness and security.
