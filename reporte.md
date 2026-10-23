# Reporte de Auditoría de Arquitectura — ConexCoffee Frontend

> **Actualización de correcciones (sin backend):** se aplicaron los cambios marcados con `[RESUELTO]`. Los marcados `[PENDIENTE-BACKEND]` o `[PENDIENTE]` requieren backend o una decisión de stack. Ver sección 8.

Fecha: 2026-10-23 · Alcance: `src/`, `vercel.json`, `.env*`, `package.json`.
Solo se leyó código; no se modificó nada ni se ejecutó build.

## 1. Resumen ejecutivo

| Pregunta | Respuesta | Veredicto |
|---|---|---|
| ¿Rutas protegidas? | Sí, con 3 guards anidados (`GuestRoute`, `ProtectedRoute`, `RoleGuard`), pero `RoleGuard` tiene un bug que lo rompe | Parcial |
| ¿Cliente HTTP centralizado? | Sí, **Axios** (`src/lib/axios.js`). No hay `fetch` en el código | Correcto |
| ¿JWT? | Cookies HttpOnly (`withCredentials`), sin `Authorization` header ni `localStorage` | Correcto en diseño |
| ¿Estado global? | **Zustand** (no Context API ni Redux): `useAuthStore`, `useUIStore` | Correcto, uso mejorable |
| ¿Estructura modular? | Feature-based, con `components/ui` y `pages` separados por feature. Faltan servicios API y hooks por feature | Parcial |

Problema de fondo: **solo existe una capa de API real (`authApi.js`)**. Los otros 7 roles trabajan 100 % con datos mock en `useState`. La arquitectura es buena como esqueleto, pero la capa de datos todavía no existe.

---

## 2. Rutas protegidas

### Lo que está bien
- Árbol en `src/app/router.jsx` con `createBrowserRouter`: `PublicLayout` → `GuestRoute` → `ProtectedRoute` → `RoleGuard` por rol → `DashboardLayout`.
- `ProtectedRoute` y `GuestRoute` esperan `isLoading` antes de decidir (sin parpadeos).
- `GuestRoute` redirige al dashboard del rol.
- Existen `*` (404) y `/unauthorized` (403).
- `ErrorBoundary` global en `App.jsx`.

### Hallazgos

| # | Severidad | Hallazgo |
|---|---|---|
| R1 | ~~Crítico~~ **Falso positivo** | Corrección: [RoleGuard.jsx](file:///c:/Users/potos/Desktop/cuidado/conexcoffe/conex_MERN/src/guards/RoleGuard.jsx) **sí importaba** `Navigate`; el hallazgo original fue un error de lectura. El bug real equivalente estaba en `PaymentContainer.jsx`: usaba `useRef` sin importarlo, lo que rompía `/payments`. `[RESUELTO]` |
| R2 | **Alto** | La protección es solo cliente. El bundle contiene todas las pantallas y datos de todos los roles, así que cualquiera puede leerlas. La seguridad real debe estar en el backend (verificar rol por endpoint). Hoy no hay ningún endpoint de negocio llamado. |
| R3 | **Alto** | Bug de redirección en el interceptor: `AppProviders` llama `getMe()` en **todas** las páginas, incluida la landing pública `/`. Si el backend responde 401 a un visitante anónimo, `axios.js` hace `window.location.href = '/login'` y lo saca de la landing. Hay que excluir `/auth/me` del redirect, o redirigir solo si la ruta es protegida. |
| R4 | Medio | El 401 usa `window.location.href` (recarga completa, pierde estado) y no guarda la URL de retorno (`returnTo`). Mejor usar el router y `state.from`. |
| R5 | Medio | `RoleGuard` no contempla `role === null` ni un rol desconocido de forma explícita, y no usa las constantes `ROLES`. En `router.jsx` los roles son strings sueltos (`'superadmin'`), con riesgo de typos. |
| R6 | Medio | Rutas compartidas `/profile` y `/payments` están dentro de `ProtectedRoute` pero fuera de `RoleGuard`: es correcto, pero `/payments` tiene `amount={0}` y `onPaymentToken={(t) => console.log('Token:', t)}` (código placeholder en producción, además de loguear un token de pago). |
| R7 | Bajo | Rutas duplicadas o dudosas: `/superadmin/compradores` apunta a `ComprasPage` (existe `CompradoresPage` sin ruta), `/caficultor/lots` y `/lotes`, `/contacto` y `/contactanos`. |
| R8 | Bajo | Broker y Técnico solo tienen dashboard (hay una ruta de broker comentada). Verificar que el Sidebar no enlace a rutas inexistentes. |
| R9 | Bajo | No hay `errorElement` por ruta. Un error de render tumba todo el layout hasta el `ErrorBoundary` global. |
| R10 | Bajo | `router.jsx` importa `NotFoundPage`/`UnauthorizedPage` por ruta profunda, saltándose el barrel `@/features/auth`. |

---

## 3. Cliente HTTP y JWT

### Estado actual
- Instancia única `src/lib/axios.js`: `baseURL` desde `VITE_API_BASE_URL`, `withCredentials: true`, timeout 15 s. No hay `fetch` ni otro `axios` importado en el proyecto.
- No hay token en JS: sesión por cookie HttpOnly. Es la opción más segura contra XSS. No se encontró uso real de `localStorage`/`sessionStorage`.
- Interceptor de respuesta para 401/403/429.

### Hallazgos

| # | Severidad | Hallazgo |
|---|---|---|
| H1 | **Crítico** | **Login demo en el código de producción** ([authApi.js](file:///c:/Users/potos/Desktop/cuidado/conexcoffe/conex_MERN/src/features/auth/api/authApi.js)). Cualquiera de los 9 correos `*@conexcoffee.com` con contraseña `12345678` entra en cualquier rol sin backend, y el usuario falso se guarda en Zustand. Esto viaja en el bundle público. Debe quedar tras `import.meta.env.DEV` o en un mock (MSW) que no se empaquete. |
| H2 | **Alto** | `register()` simula éxito si hay error de red ("modo demo"). En producción, una caída del backend haría creer al usuario que se registró. |
| H3 | **Alto** | El login demo no crea cookie. Al recargar, `getMe()` falla y la sesión se pierde. Es un comportamiento inconsistente que oculta la ausencia de backend. |
| H4 | **Alto** | No hay protección CSRF. Con cookies de sesión, `X-Requested-With` no basta. El backend debe usar `SameSite` adecuado y un token CSRF (double submit), sobre todo si front (Vercel) y API están en dominios distintos (`SameSite=None; Secure`). |
| H5 | Medio | No hay flujo de refresh de sesión (access/refresh). Al expirar, el usuario es expulsado de golpe en cualquier acción. |
| H6 | Medio | [keepAliveBot.js](file:///c:/Users/potos/Desktop/cuidado/conexcoffe/conex_MERN/src/lib/keepAliveBot.js) hace ping a `/health` y `/` cada 4 min desde **cada navegador abierto**, incluidos visitantes anónimos. Es carga innecesaria y no escala. Además usa la instancia `api`, así que un 401 en `/health` dispararía el logout. Si el objetivo es evitar el cold start, usar un cron externo (UptimeRobot, GitHub Actions). |
| H7 | Medio | `VITE_API_BASE_URL` no tiene valor por defecto ni validación. Si falta en Vercel, `baseURL` queda `undefined` y las peticiones van al propio dominio del front sin aviso. Validar al arrancar. |
| H8 | Medio | No hay normalización de errores (`error.response?.data?.message` repetido en cada componente), ni cancelación (`AbortController`), ni reintentos. |
| H9 | Bajo | El interceptor de request está vacío. Es el lugar para correlation-id, CSRF token e idioma. |
| H10 | Bajo | El token de Turnstile se envía en `login`, pero el frontend no puede garantizar su validación. Confirmar que el backend lo verifica con la clave secreta. `VITE_TURNSTILE_SITE_KEY` vacío en local no debe llegar a producción. |

---

## 4. Manejo de estado global

### Estado actual
- **Zustand v5**, sin Context API ni Redux.
- `useAuthStore`: `user`, `role`, `isAuthenticated`, `isLoading`. En memoria, sin persistencia (correcto para tokens).
- `useUIStore`: sidebar y sistema de modales global.
- Estado de datos de cada página: `useState(INITIAL_...)` local.

### Hallazgos

| # | Severidad | Hallazgo |
|---|---|---|
| E1 | **Alto** | **No hay estado de servidor.** Cada página mantiene su lista en `useState(MOCK)` y la muta con `setX`. Al conectar el backend habrá que reescribir todo: carga, error, caché, paginación, refetch, invalidación tras crear/editar. React Query/SWR sería lo correcto, pero **AGENTS.md prohíbe nuevas librerías**. Hay que decidir si se amplía el stack o se construye un hook genérico `useResource`. |
| E2 | Medio | Zustand se consume sin selectores: `const { role } = useAuthStore()` y el hook `useAuth` leen **todo** el store, provocando re-renders innecesarios. Usar `useAuthStore((s) => s.role)`. |
| E3 | Medio | Lógica de auth duplicada: `LoginForm` llama `login()` y `setUser()` directamente en vez de usar `useAuth`. Centralizar `login` en el hook. |
| E4 | Medio | `useAuth()` se instancia en `AppProviders` y dentro del hook `checkSession` se define como función nueva en cada render. El `useEffect` con `[]` ignora la dependencia (la regla de lint la marcaría). |
| E5 | Medio | `useUIStore` (con `activeModal`/`modalData`) y los hooks `useModal`/`useDebounce` no se usan desde ningún `.jsx` en una búsqueda por nombre. Revisar con `npm run find:unused` (knip). Si es código muerto, eliminar; si no, adoptarlo, porque hoy cada página gestiona sus modales con `useState` propio (hay 40+ modales). |
| E6 | Bajo | Falta estado explícito de "sesión expirada" vs "sin sesión" (útil para mostrar un toast antes de redirigir). |
| E7 | Bajo | `SESSION_TIMEOUT_MS` está definida en `constants.js` pero no se encontró un mecanismo de inactividad que la use. Verificar. |

---

## 5. Estructura de carpetas

### Lo que está bien
- Feature-based (vertical slice) con barrels `index.js` por rol.
- `components/ui`, `modals`, `feedback`, `data-display` sin lógica de negocio.
- `guards/`, `layouts/`, `lib/`, `store/`, `hooks/` globales.
- Dentro de cada feature, `pages/` y `components/` están separados.
- Alias `@/`.

### Hallazgos

| # | Severidad | Hallazgo |
|---|---|---|
| S1 | **Alto** | **Falta la capa `api/` en 7 de 8 features.** Solo `features/auth/api/authApi.js` existe. En el resto hay carpetas `data/` con datos mock (`empresaData.js` 695 líneas, etc.) importadas directamente por las páginas. Al integrar se mezclará UI con llamadas HTTP. Crear `features/<rol>/api/*.js` (funciones puras sobre `api`) y sustituir `data/` por mocks de desarrollo. |
| S2 | **Alto** | **Falta la capa `hooks/` en 7 de 8 features.** Solo `auth/hooks/useAuth.js`. Los hooks de dominio (`useFincas`, `useOfertas`) deberían encapsular fetch + estado + mutaciones. |
| S3 | **Alto** | **Páginas gigantes**, no modulares: `EmpresaOfertasPage` 1531 líneas, `ComprasPage` 1089, `EmpresasRegionalesModal` 1072, `CatadoresPage` 874, `EmpresaContenedoresPage` 850, `CaficultoresPage` 849. Mezclan tabla, filtros, modales, formularios y lógica. Dividir en componentes (tabla, filtros, formulario) y hooks. |
| S4 | Medio | `superadmin/` y `empresa/` casi no tienen `components/` y concentran la UI dentro de las páginas. Hay CRUDs casi idénticos (brokers, caficultores, laboratorios, técnicos, muestras, contenedores) repetidos en `superadmin/pages/*` y `empresa/pages/*`. Candidato a un `DataTable` + `CrudPage` reutilizable (el `DataTable` de `components/data-display` apenas se aprovecha). |
| S5 | Medio | Componente duplicado: `ModuloCabecera.jsx` existe en `superadmin/components` y en `empresa/components`. Subir a `components/ui` o `components/layout`. |
| S6 | Medio | `components/modals/` contiene modales de dominio (`AddProductModal`, `VerificacionCodigoModal`) y debería tener solo genéricos (`ModalBase`, `ConfirmModal`, `FormModal`). Moverlos a `features/landing` y `features/auth`. |
| S7 | Medio | Nomenclatura inconsistente en las pages del superadmin (`CaficultoresPage`) frente a las de otros roles (`CaficultorFincasPage`). El módulo `landing` mezcla `pages/` con componentes de animación (`ContenedoresDestinoAnimation.jsx` está en `pages/` pero es un componente). |
| S8 | Medio | **Sin code splitting.** Los barrels importan todas las páginas de los 8 roles en `router.jsx`, así que un visitante de la landing descarga todo el panel. Usar `lazy()` + `Suspense` (o `lazy` de React Router) por rol. Hoy no hay ninguna aparición de `lazy`/`Suspense`. |
| S9 | Bajo | Los imports entre features (`auth` → `components/modals`) están bien, pero no hay regla que prohíba `feature A → feature B`. Configurar `no-restricted-imports` en oxlint. |
| S10 | Bajo | Sin `types/` ni PropTypes/JSDoc de contratos. Con 8 roles y datos de dominio complejos, definir al menos esquemas (Zod no está permitido sin ampliar el stack, entonces JSDoc `@typedef`). |
| S11 | Bajo | `lib/` mezcla infraestructura (`axios`, `sanitize`) con utilidades de dominio (`colors`, `constants`, `utils`). Aceptable, pero conviene crear `lib/format.js` y `lib/validators.js`. |

---

## 6. Cosas que no se están teniendo en cuenta

1. **Tests**: no hay `vitest`/`testing-library` ni script `test`. Los guards y el flujo de login son críticos y fáciles de testear.
2. **Cabeceras de seguridad**: [vercel.json](file:///c:/Users/potos/Desktop/cuidado/conexcoffe/conex_MERN/vercel.json) solo tiene el rewrite. Agregar `headers`: `Content-Security-Policy` (permitir Cloudflare Turnstile), `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
3. **Observabilidad**: `console.error` en el `ErrorBoundary` y nada más. Falta un reporte de errores (Sentry u otro endpoint propio).
4. **Autorización fina**: solo hay control por rol. No hay propiedad de recursos (un caficultor solo ve sus fincas) ni permisos por acción (botones editar/eliminar según permiso). Debe imponerlo el backend, y la UI debe reflejarlo.
5. **Estados de carga/error/vacío** por página: existen `LoadingSkeleton` y `EmptyState`, pero las páginas con mocks nunca pasan por ellos.
6. **Accesibilidad e i18n**: textos fijos en español dentro de los componentes. Revisar a11y de las tablas y los modales (Headless UI ayuda).
7. **Validación de formularios**: hecha a mano (`validate()` en cada formulario). Sin esquemas compartidos con el backend.
8. **Anti-XSS**: `SafeHTML` existe y el único `dangerouslySetInnerHTML` está en `sanitize.jsx`. Correcto.
9. **Variables de entorno**: `.env` está ignorado por git (bien). Falta documentar `VITE_TURNSTILE_SITE_KEY` en `.env` local (no está) y validar variables al arrancar.
10. **Cumplimiento legal**: se exige aceptar `/terms`, `/privacy` y `/legal`. Falta guardar la prueba de consentimiento (fecha/versión) en el backend.
11. **Documentación desalineada**: `ARCHITECTURE.md`, `GEMINI.md` y `AGENTS.md` describen `api/`, `hooks/` y `useModal` por feature como norma, pero el código no los cumple en 7 roles.
12. **CI**: existe `.github`, pero conviene confirmar que ejecute `npm run build`, `npm run lint` y `knip` en cada PR.

---

## 7. Plan de mejora priorizado

### Inmediato (bugs)
1. Importar `Navigate` en `RoleGuard.jsx` (R1).
2. Evitar que el 401 de `/auth/me` redirija desde páginas públicas (R3).
3. Mover login/registro demo a `import.meta.env.DEV` (H1, H2).
4. Quitar el `console.log` de token y el placeholder de `/payments` (R6).

### Corto plazo
5. Retirar o mover el `keepAliveBot` a un cron externo (H6).
6. Agregar cabeceras de seguridad en `vercel.json`.
7. Selectores de Zustand en guards y `useAuth` (E2); `login` dentro de `useAuth` (E3).
8. `lazy()` por rol en el router y `errorElement` por layout (S8, R9).
9. Usar `ROLES` en `router.jsx` (R5), y limpiar rutas duplicadas (R7).

### Mediano plazo
10. Crear `api/` y `hooks/` por feature, empezando por `caficultor` (fincas → lotes → pre-ofertas → ofertas).
11. Decidir la estrategia de estado de servidor (E1) y actualizar AGENTS.md.
12. Trocear las páginas de más de 600 líneas y unificar los CRUD repetidos (S3, S4, S5).
13. Mover los modales de dominio fuera de `components/modals` (S6).
14. Agregar tests de guards, auth y del cliente axios.

### Con backend
15. Definir con backend: CSRF, `SameSite`, refresh, verificación de Turnstile y autorización por recurso (H4, H5, H10).

---

## 8. Estado de resolución (sin backend)

Verificado: `npm run build` OK (code splitting activo, bundle principal ~380 kB frente a todo en uno) y `npm run lint` con 0 errores (26 warnings previos).

| Id | Estado | Qué se hizo |
|---|---|---|
| R1 | RESUELTO | Era falso positivo. Se corrigió el bug real: `useRef` sin importar en `PaymentContainer.jsx`. |
| R2 | PENDIENTE-BACKEND | La autorización real la impone la API. |
| R3 | RESUELTO | `getMe()` y el keep-alive usan `skipAuthRedirect`; un 401 de visitante anónimo ya no redirige ni toca el estado. |
| R4 | RESUELTO | Se eliminó el `window.location.href`; `ProtectedRoute` redirige con el router y pasa `state.from` (listo para un futuro `returnTo`). |
| R5 | RESUELTO | `router.jsx` usa `ROLES`; `RoleGuard` maneja rol nulo. |
| R6 | RESUELTO | Sin `console.log` de token; handlers vacíos con `TODO(backend)`. |
| R7 | RESUELTO | `/superadmin/compradores` apunta a `CompradoresPage`; `/caficultor/lots` y `/contactanos` redirigen a la ruta canónica; Sidebar y dashboard actualizados. |
| R8 | PENDIENTE | Broker y Técnico siguen con solo dashboard (funcionalidad). |
| R9 | RESUELTO | Nuevo `RouteError` como `errorElement` en cada grupo de rutas (también cubre fallos de descarga de chunks). |
| R10 | RESUELTO | `NotFoundPage` y `UnauthorizedPage` en el barrel de `auth`. |
| H1 | RESUELTO | Credenciales demo movidas a `demoAuth.js`, cargado por import dinámico solo si `IS_DEMO_MODE`. Activo en dev; en producción requiere `VITE_ENABLE_DEMO=true`. |
| H2 | RESUELTO | El registro ya no simula éxito por error de red fuera del modo demo. |
| H3 | MITIGADO | En modo demo la sesión sigue siendo en memoria (se pierde al recargar, por diseño: no se guarda nada en storage). `checkSession` no llama a la red en demo. |
| H4, H5, H10 | PENDIENTE-BACKEND | CSRF, refresh de sesión y verificación de Turnstile. |
| H6 | RESUELTO | El keep-alive es opt-in (`VITE_ENABLE_KEEPALIVE=true`), requiere API real y no corre en demo. |
| H7 | RESUELTO | Nuevo `src/lib/env.js` centraliza variables y avisa si falta `VITE_API_BASE_URL` fuera de demo. |
| H8 | PARCIAL | Helper `getErrorMessage()` en `axios.js` (usado en login). Falta aplicarlo en el resto de formularios, y soportar `AbortController`. |
| H9 | PENDIENTE | Interceptor de request aún vacío (se llenará con CSRF). |
| E1 | RESUELTO | Decisión: **TanStack Query v5** para estado de servidor (Zustand queda solo para cliente). Provider en `AppProviders`, `src/lib/queryClient.js`, y fábricas `createResourceApi` / `createResourceHooks`. `clearAuth()` vacía la caché. |
| E2 | RESUELTO | Selectores de Zustand en guards y `useAuth`. |
| E3 | RESUELTO | `LoginForm` usa `useAuth().login`. |
| E4 | RESUELTO | Acciones con `useCallback` y dependencias correctas en `AppProviders`. |
| E5, E6, E7 | PENDIENTE | Revisar código muerto con `npm run find:unused`; sesión expirada; timeout por inactividad. |
| S1, S2, S3, S4, S5, S6 | PENDIENTE | Refactor grande: capa `api/` + `hooks/` por feature, dividir páginas, unificar CRUD y mover modales de dominio. Conviene hacerlo por feature al integrar el backend. |
| S8 | RESUELTO | `lazy()` por feature con `Suspense` por ruta; cada rol se descarga bajo demanda. |
| 6.2 Cabeceras | PARCIAL | `vercel.json` incluye `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS y caché inmutable de `/assets`. **CSP pendiente**: hay que inventariar los recursos externos (Turnstile, imágenes, fuentes) antes de activarla para no romper el sitio. |

### Nuevas variables de entorno (ver `.env.example`)
- `VITE_ENABLE_DEMO` (`true`/`false`): login y registro simulados. Por defecto, activo solo en `npm run dev`.
- `VITE_ENABLE_KEEPALIVE` (`true`/`false`): ping periódico opcional.

> [!IMPORTANT]
> Al desplegar en Vercel sin backend, define `VITE_ENABLE_DEMO=true` o el login no funcionará. Cuando exista la API, ponlo en `false` y borra `demoAuth.js`.

