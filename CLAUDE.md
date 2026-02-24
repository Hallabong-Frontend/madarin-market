# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

No test framework is configured.

## Architecture

**Stack:** React 19 + Vite + Styled-components + React Router v7 + Axios
**API Base URL:** `https://mandarin.api.weniv.co.kr`
**Design:** Mobile-first, max-width 390px

### Authentication Flow

`AuthContext` (`src/context/AuthContext.jsx`) manages auth state globally:
- On app mount, reads `localStorage.token` and calls `getMyInfo()` to validate
- `login(token, userData)` stores token + accountname in localStorage
- `logout()` clears localStorage and resets state
- `useAuth()` hook provides `{ user, isLoading, isAuthenticated, login, logout, updateUser }`

Routes are guarded by `PrivateRoute` / `PublicRoute` wrappers in `App.jsx`.

### API Layer

All requests go through `src/api/config.js` which exports a single Axios instance:
- **Request interceptor:** Auto-attaches `Authorization: Bearer <token>` from localStorage
- **Response interceptor:** On 401, clears localStorage and redirects to `/login`

API functions are organized by domain in `src/api/`:
- `auth.js` — login, register, profile, image upload, token check
- `user.js` — profile, follow/unfollow, search, user posts
- `post.js` — feed, CRUD, like/unlike
- `comment.js` — CRUD, report
- `product.js` — CRUD

### Styling

Styled-components with a shared theme (`src/styles/theme.js`). Access theme values via the `theme` prop in styled components:
- Primary color: `${({ theme }) => theme.colors.primary}` → `#F26E22`
- All colors, fonts, spacing, shadows, z-index levels are in the theme

`src/utils/format.js` provides shared utilities: `formatPrice`, `formatTimeAgo`, `getImageUrl` (handles relative → absolute URL conversion for API images), `validateEmail`, `validateAccountname`, `DEFAULT_PROFILE_IMAGE`.

### Page & Component Patterns

Pages use a consistent structure: fetch data on mount, show `<Spinner>` while loading, render content. Common layout components:
- `Header` — sticky top bar with customizable left/right buttons
- `BottomTabNav` — fixed bottom navigation (hidden on auth pages)
- `BottomModal` — bottom sheet for action menus (edit/delete/report)
- `AlertModal` — confirmation dialogs

`ProductRegister` and `PostCreate` pages accept an `isEdit` prop to switch between create and edit modes.
