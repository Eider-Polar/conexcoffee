# CONEXCOFFEE FRONTEND — AGENTS CONTEXT & ARCHITECTURE RULES

This file is automatically loaded by AI coding assistants, agents, and subagents operating in this workspace. It serves as the single source of truth for architectural constraints, technology stack, and engineering rules.

---

## MANDATORY RULES FOR ALL AI AGENTS

1. **Stack Inmutability**: Do NOT install new styling libraries, state managers, or routers.
   - React 19 + Vite 8
   - Tailwind CSS v4 (configured in `src/styles/index.css`)
   - React Router DOM v7 (`createBrowserRouter`)
   - Zustand v5 (in-memory state only)
   - Axios v1.20 with central instance at `src/lib/axios.js`
   - Lucide React (strictly ZERO emojis)
   - Cloudflare Turnstile (`@marsidev/react-turnstile`)
   - DOMPurify (`src/lib/sanitize.jsx`)

2. **Security Compliance**:
   - NEVER store JWT tokens or session credentials in `localStorage` or `sessionStorage`.
   - All HTTP communication must use `src/lib/axios.js` (`withCredentials: true` for HttpOnly cookies).
   - Any sensitive form (login, register) must include `src/components/ui/Captcha.jsx`.

3. **Feature-Based Architecture**:
   - New pages or modules for any role (`superadmin`, `empresa`, `broker`, `caficultor`, `laboratorio`, `tecnico`, `catador`, `comprador`) must be placed in `src/features/<role>/<feature>/`.
   - Export through `src/features/<role>/index.js`.
   - Register route in `src/app/router.jsx`.
   - Add sidebar navigation link in `src/layouts/components/Sidebar.jsx` using a Lucide React icon.

4. **Zero White Screens**:
   - Global 404 catch-all is handled by `src/features/auth/pages/NotFoundPage.jsx`.
   - Fatal exceptions are caught by `src/components/feedback/ErrorBoundary.jsx`.

5. **Build Verification**:
   - Always run `npm run build` to verify clean compilation before concluding changes.
