# AGENT.md

This file defines how an AI coding assistant should work in this repository.

## Repository Overview

- Build tool: Vite (`vite.config.js`, `index.html` root entry)
- Framework: React (`src/main.jsx`)
- Routing: React Router (`src/components/layout/Routing/Routing.jsx`, `src/components/routes/PrivateRoute.jsx`)
- Styling: Tailwind CSS (`tailwind.config.js`, `src/main.css`)
- Forms: React Hook Form (used in manager forms)
- Icons: lucide-react
- State management: React Context (`src/context/*`)
- Language: JavaScript only (`.jsx/.js`, no TypeScript)

## Source of Truth: File Structure

Key paths:

- `src/main.jsx` - app bootstrap
- `src/main.css` - global styles + Tailwind
- `src/Utils/constants.js` - shared constants
- `src/services/api/*` - API layer
- `src/context/auth/AuthContext.jsx` - auth state
- `src/context/cart/CartContext.jsx` - cart state
- `src/components/layout/Routing/Routing.jsx` - routing map
- `src/components/routes/PrivateRoute.jsx` - route guard

UI feature areas:

- Books:
  - `src/components/book/BookCard/*`
  - `src/components/book/BookInfo/*`
  - `src/components/book/ReviewSection/*`
  - `src/pages/Books/Books.jsx`
  - `src/pages/BookDetails/BookDetails.jsx`
- Auth:
  - `src/pages/Login/*`
  - `src/pages/Register/*`
- Cart / Checkout / Orders:
  - `src/pages/Cart/*`
  - `src/pages/Checkout/*`
  - `src/pages/Orders/*`
- Admin / Manager dashboards:
  - `src/pages/AdminDashboard/*`
  - `src/pages/ManagerDashboard/ManagerDashboard.jsx`
  - `src/components/manager/*`

## Primary Goals

- Make small, safe, reviewable changes.
- Preserve existing behavior unless explicitly requested.
- Keep UI consistent with current components and Tailwind patterns.
- Prefer clarity and maintainability over cleverness.

## Communication Rules

- Briefly state what changed and why.
- If requirements are ambiguous, make a reasonable assumption, proceed, and note the assumption.
- Never invent file paths, routes, context values, or API endpoints. Verify in the repo first.

## Do / Don't

### Do

- Reuse existing patterns in:
  - `src/services/api/core.js` (request wrapper)
  - `src/services/api/index.js` (exports)
  - page/component conventions in `src/pages/*` and `src/components/*`
- Keep components small and split by responsibility (Media / Body / Header, etc.).
- Keep consistent naming:
  - components: `PascalCase`
  - functions/vars: `camelCase`
  - folders: match existing structure

### Don't

- Don't add TypeScript or new build tools.
- Don't introduce new state libraries (Redux/Zustand) unless explicitly requested.
- Don't rewrite the styling system (stick to Tailwind + existing CSS file usage).
- Don't swallow errors with empty `catch {}` in API/util logic.

## Tailwind & Styling Rules

- Use Tailwind utility classes as the default.
- Keep `src/main.css` for globals only (base layers, imports, utilities).
- If you must add custom CSS:
  - Prefer component-scoped CSS only if the repo already uses it in that area.
  - Avoid large global CSS additions.

## React Component Guidelines

- Prefer functional components + hooks.
- Keep props minimal and stable.
- Avoid premature memoization (`useMemo`, `useCallback`) unless there is a clear render issue.
- Accessibility:
  - Buttons must have readable text or `aria-label`.
  - Images must have `alt`.
  - Forms must have labels and proper validation feedback.

## Routing Guidelines

- Route definitions live in `src/components/layout/Routing/Routing.jsx`.
- Guarded pages must use the `src/components/routes/PrivateRoute.jsx` pattern.
- Keep URL structure stable; if changing routes, update all `<Link>` usages.

## Context Guidelines

- Auth: `src/context/auth/AuthContext.jsx`
- Cart: `src/context/cart/CartContext.jsx`

Rules:

- Don't mutate state directly.
- Keep provider API consistent (don't rename exposed functions/values without updating all consumers).
- If adding new context methods, ensure they're used and documented in code comments where needed.

## API Layer Guidelines (`src/services/api/*`)

- All API calls should go through the shared core utilities:
  - `core.js` for fetch/axios wrapper patterns (whichever exists)
  - `auth.utils.js` only for auth-related helpers
- Return consistent shapes:
  - Prefer `{ data }` style already used in the repo.
- Error handling:
  - Bubble errors to UI with meaningful messages.
  - Never log sensitive tokens or user credentials.
- Don't add new endpoints without verifying existing backend contract in current files.

## Forms (React Hook Form)

- Keep validation close to fields.
- Prefer reusable field components:
  - `src/components/manager/BookFormModal/*`
- Show user-friendly error messages (no raw stack traces).

## Code Quality

- Remove unused imports/vars.
- Keep changes localized.
- Avoid "god files"; if splitting is needed, split into max 2 files per request.
- No large refactors mixed with feature changes.

## Cleanup / Repo Hygiene

- Do not commit `.DS_Store` files. If asked:
  - add to `.gitignore`
  - recommend deleting tracked `.DS_Store` files
- Keep `README.md` updated when changing:
  - scripts
  - env/config assumptions
  - major user flows

## Scripts (assumed)

- Install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Output Preferences (when responding with code)

- Prefer file-by-file patches with file paths.
- Avoid dumping huge files if only small changes are needed.
- When asked to compare approaches, pick one and justify briefly.
