# CONEXCOFFEE FRONTEND — AGENTS CONTEXT & ARCHITECTURE RULES

This file is automatically loaded by AI coding assistants, agents, and subagents operating in this workspace. It serves as the single source of truth for architectural constraints, technology stack, and engineering rules. `GEMINI.md` mirrors these rules in Spanish; when changing one, update the other.

---

## MANDATORY RULES FOR ALL AI AGENTS

### 1. Stack Inmutability
Do NOT install new styling libraries, client-state managers, or routers. Approved stack:
   - React 19 + Vite 8
   - Tailwind CSS v4 (configured in `src/styles/index.css`, no `tailwind.config.js`)
   - React Router DOM v7 (`createBrowserRouter`)
   - **Zustand v5 — CLIENT state only** (session, UI). In-memory, never persisted.
   - **TanStack Query v5 — SERVER state only** (lists, details, cache, refetch, mutations). Client at `src/lib/queryClient.js`.
   - Axios v1.20 with central instance at `src/lib/axios.js`
   - Lucide React (strictly ZERO emojis)
   - Cloudflare Turnstile (`@marsidev/react-turnstile`)
   - DOMPurify (`src/lib/sanitize.jsx`)
   - Headless UI, React Hot Toast, Oxlint, Knip

   Adding any other dependency requires explicit user approval and an update to this file.

### 2. State Management Boundaries (NON-NEGOTIABLE)
   - **Server data** (anything that comes from or goes to the API) → TanStack Query via feature hooks. NEVER keep it in `useState(INITIAL_...)`, Zustand, or Context.
   - **Client/session/UI state** (user, role, sidebar, open modal) → Zustand, using selectors: `useAuthStore((s) => s.role)`. Never `const { role } = useAuthStore()`.
   - Local, ephemeral UI state (search term, open modal, form fields) → `useState` inside the component.
   - `clearAuth()` clears the Query cache (logout / 401). Never bypass it.
   - Do NOT introduce Redux or Context API for global data.

### 3. Layered Data Architecture (Page → Hook → API → Axios)
Dependencies flow in ONE direction. A layer may only import from the layer directly below it.

```
pages/ & components/   →   hooks/   →   api/   →   src/lib/axios.js
```

   - **`api/`** (services): pure functions/objects that know endpoints and payloads. No React. Use `createResourceApi` (`src/lib/createResourceApi.js`) for CRUD resources.
   - **`hooks/`** (data hooks): wrap services with TanStack Query. Use `createResourceHooks` (`src/hooks/createResourceHooks.js`) for CRUD, or write `useQuery`/`useMutation` by hand for custom endpoints. Query keys are namespaced `'<role>-<resource>'`.
   - **`pages/`**: compose hooks + components. NEVER import `axios`, `api`, services, or `data/` mocks directly.
   - **`components/`**: presentational. Receive data and callbacks via props.
   - Handle `isLoading` / `isError` with `<QueryState query={query} />` (`src/components/feedback`), after all hooks are called.
   - Mutations show toasts and invalidate queries automatically; do not duplicate that in pages.
   - Errors: use `getErrorMessage(error)` from `src/lib/axios.js`; never read `error.response.data.message` ad hoc.

**Reference implementation:** `src/features/caficultor/` (`api/caficultorApi.js`, `hooks/useCaficultorData.js`, pages). Copy this pattern when migrating or creating any role/feature.

### 4. Mock Data & Demo Mode (no backend yet)
   - `src/lib/env.js` is the single place that reads `VITE_*` variables. `IS_DEMO_MODE` is true in `npm run dev` or when `VITE_ENABLE_DEMO=true`.
   - Mock data lives ONLY in `features/<role>/data/` and is passed as `seed` to `createResourceApi`. Pages must not import it.
   - Demo auth lives in `features/auth/api/demoAuth.js` (dynamic import). Never embed credentials elsewhere.
   - When the backend exists: remove the `seed`, delete `data/` mocks, set `VITE_ENABLE_DEMO=false`. Pages and hooks must not need changes.
   - `VITE_ENABLE_KEEPALIVE` is opt-in; prefer an external cron over the in-app keep-alive bot.

### 5. Security & Network Compliance
   - NEVER store JWT tokens or session credentials in `localStorage` or `sessionStorage`.
   - All HTTP communication must use `src/lib/axios.js` (`withCredentials: true` for HttpOnly cookies). No `fetch`, no other axios instance.
   - **Infrastructure Decoupling (Dependency Inversion):** `src/lib/axios.js` must NEVER import `store/` or UI layers. 401 unauthorization handling is injected via `setUnauthorizedHandler(fn)` registered in `src/app/AppProviders.jsx`.
   - Requests where a 401 is expected (e.g. `getMe`, health pings) must pass `skipAuthRedirect: true`.
   - Any sensitive form (login, register) must include `src/components/ui/Captcha.jsx`.
   - Route guards are UX only. Real authorization is enforced by the backend; never rely on hiding UI for security.
   - HTML from the server or users must go through `sanitizeHTML()` / `<SafeHTML />`.
   - Never log tokens, payment data, or personal data with `console.*`.

### 6. Centralized Color & Design System (ZERO Arbitrary Hex)
   - PROHIBITED: Hardcoded hex classes in Tailwind (e.g. `bg-[#AD2E01]`, `text-[#F25433]`, `border-[#...]`).
   - ALL colors must use semantic design tokens defined in `src/styles/index.css` (`@theme`) and configured in `src/lib/colors.js`:
     - Primary Terracota: `bg-brand-terracota`, `text-brand-terracota`, `border-brand-terracota` (with hover `bg-brand-terracota-dark` or `bg-brand-orange`)
     - Light Tint: `bg-brand-tint` (`#FFF5F2`)
     - Accents: `brand-amber`, `brand-gold`, `brand-teal`
     - Coffee Roast Palette: `--color-roast-1` to `--color-roast-12`
   - Any re-branding or palette modifications MUST be performed strictly in `src/styles/index.css` and `src/lib/colors.js`.

### 7. Feature-Based Architecture
   - New pages or modules for any role (`superadmin`, `empresa`, `broker`, `caficultor`, `laboratorio`, `tecnico`, `catador`, `comprador`) must be placed in `src/features/<role>/<feature>/` with `api/`, `hooks/`, `components/`, `pages/`.
   - Export pages through `src/features/<role>/index.js`.
   - Register the route in `src/app/router.jsx` as a **lazy page** (`lazyPage(...)` + `page(...)`) inside the role's `roleRoutes(ROLES.X, [...])` block. Use `ROLES` constants, never raw role strings.
   - Add the sidebar link in `src/layouts/components/Sidebar.jsx` using a Lucide React icon.
   - Features must NOT import from other features. Shared code goes in `src/components`, `src/hooks`, or `src/lib`. Only `router.jsx` and layouts may import feature barrels.
   - `src/components/` holds generic UI only. Domain-specific modals/components belong to their feature.
   - Do not duplicate components across roles (e.g. `ModuloCabecera`); promote them to `src/components`.

### 8. Size & Quality Limits
   - Pages should stay under ~300 lines; split into components and hooks beyond that. Existing pages over 600 lines are technical debt: do not add to them, refactor when touched.
   - Do not copy-paste CRUD screens between roles; extract shared components.
   - Keep routes unique: no duplicate paths pointing to the same page (use `<Navigate>` redirects).

### 9. Zero White Screens
   - Global 404 catch-all is handled by `src/features/auth/pages/NotFoundPage.jsx`.
   - Route groups use `errorElement={<RouteError />}` (`src/components/feedback/RouteError.jsx`).
   - Fatal exceptions are caught by `src/components/feedback/ErrorBoundary.jsx`.
   - Lazy pages always render inside `<Suspense>` (provided by the `page()` helper).

### 10. Build Verification
   - Always run `npm run build` to verify clean compilation before concluding changes.
   - `npm run lint` must not show new errors. Run `npm run find:unused` (knip) after removing or moving code.
   - Update `reporte.md` when an architecture finding is resolved.
