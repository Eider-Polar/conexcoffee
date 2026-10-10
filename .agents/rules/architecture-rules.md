# REGLAS DEL PROYECTO CONEXCOFFEE (FRONTEND)

## Stack Tecnológico Inmutable
- **React 19 + Vite 8**
- **Tailwind CSS v4** (declarado en `src/styles/index.css`, no crear archivo tailwind.config.js)
- **React Router DOM v7** (rutas centralizadas en `src/app/router.jsx`)
- **Zustand v5** (almacenamiento en memoria volátil en `src/store/`)
- **Axios** (instancia única en `src/lib/axios.js` con `withCredentials: true`)
- **Lucide React** (prohibido el uso de emojis)
- **Cloudflare Turnstile** (`src/components/ui/Captcha.jsx`)
- **DOMPurify** (`src/lib/sanitize.jsx`)

## Reglas de Seguridad
- NUNCA usar `localStorage` o `sessionStorage` para guardar tokens de sesión.
- Las cookies de sesión son `HttpOnly` y las gestiona el backend.
- Siempre utilizar la instancia centralizada de Axios para peticiones HTTP.
- Los errores 401 desloguean automáticamente la sesión en Zustand.

## Arquitectura de Carpetas (Feature-Based)
- Componentes compartidos en `src/components/`
- Módulos de cada rol en `src/features/<rol>/<modulo>/`
- Cada rol expone sus módulos a través de `src/features/<rol>/index.js`
- Rutas públicas: `/`, `/terms`, `/privacy`, `/legal`, `/login`, `/register`
- Rutas protegidas divididas por rol: `/superadmin/*`, `/empresa/*`, `/broker/*`, `/productor/*`, `/comprador/*`
- Comodín 404: `src/features/auth/pages/NotFoundPage.jsx`
- Contención de excepciones: `src/components/feedback/ErrorBoundary.jsx`

## Protocolo de Incorporación de Funcionalidades
1. Crear carpeta en `src/features/<rol>/<modulo>/` con `api/`, `components/`, `pages/` e `index.js`.
2. Exportar en `src/features/<rol>/index.js`.
3. Agregar ruta dentro de `src/app/router.jsx` bajo el `RoleGuard` respectivo.
4. Agregar enlace en `src/layouts/components/Sidebar.jsx` con icono de `lucide-react`.
5. Ejecutar `npm run build` para garantizar cero errores.
