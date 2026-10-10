# CONEXCOFFEE FRONTEND — REGLAS OBLIGATORIAS DE ARQUITECTURA Y DESARROLLO

Este archivo es de LECTURA OBLIGATORIA para cualquier agente de Inteligencia Artificial o desarrollador que trabaje en este repositorio. Define las restricciones técnicas, stack inmutable, estructura de carpetas y lineamientos de seguridad que DEBEN seguirse en cada modificación o adición de código.

---

## 1. STACK TECNOLÓGICO INMUTABLE Y VERSIONES

Bajo ninguna circunstancia se deben instalar librerías redundantes o modificar las siguientes tecnologías base:

- **Framework**: React 19 (`react` ^19.2, `react-dom` ^19.2).
- **Herramienta de Compilación**: Vite 8 (`vite` ^8.2).
- **Estilos**: Tailwind CSS v4 (`@tailwindcss/vite` ^4.3, `tailwindcss` ^4.3). Configuración en CSS (`src/styles/index.css`), NO crear `tailwind.config.js`.
- **Enrutamiento**: React Router DOM v7 (`react-router-dom` ^7.18) con `createBrowserRouter`.
- **Estado Global**: Zustand v5 (`zustand` ^5.0) en memoria volátil de ejecución.
- **Cliente HTTP**: Axios v1.20 (`axios` ^1.20).
- **Iconografía**: Lucide React (`lucide-react` ^1.41). PROHIBIDO EL USO DE EMOJIS O OTRAS LIBRERÍAS DE ICONOS.
- **Seguridad / Antibot**: Cloudflare Turnstile (`@marsidev/react-turnstile` ^1.6).
- **Sanitización HTML (Anti-XSS)**: DOMPurify (`dompurify` ^3.4).
- **Modales Accesibles**: Headless UI (`@headlessui/react` ^2.2).
- **Notificaciones**: React Hot Toast (`react-hot-toast` ^2.6).
- **Linteo y Limpieza**: Oxlint (`oxlint` ^1.79) y Knip (`knip` ^6.34).

---

## 2. REGLAS ESTRICTAS DE SEGURIDAD (NO NEGOCIABLES)

1. **PROHIBIDO EL USO DE `localStorage` O `sessionStorage` PARA TOKENS**:
   - NUNCA guardar tokens JWT ni datos sensibles en el almacenamiento del navegador.
   - La sesión se gestiona con cookies seguras `HttpOnly` emitidas por el backend.
   - El estado de autenticación del frontend se guarda ÚNICAMENTE en el store de Zustand (`src/store/useAuthStore.js`) en memoria volátil de JavaScript.
2. **AXIOS CENTRALIZADO**:
   - TODAS las peticiones HTTP deben realizarse a través de la instancia central en `src/lib/axios.js`.
   - La instancia tiene forzado `withCredentials: true` para enviar y recibir cookies automáticamente.
   - El interceptor de Axios captura errores 401 y expulsa la sesión (`logout()`), redirigiendo a `/login`.
3. **PROTECCIÓN CONTRA XSS**:
   - Todo HTML proveniente del servidor o de inputs debe sanitizarse usando `sanitizeHTML()` o el componente `<SafeHTML />` de `src/lib/sanitize.jsx`.
4. **VERIFICACIÓN ANTIBOT**:
   - Todo formulario crítico (Login, Registro) debe incluir el componente `<Captcha />` de `src/components/ui/Captcha.jsx`.
5. **CONSENTIMIENTO LEGAL OBLIGATORIO**:
   - El registro exige aceptación obligatoria de los Términos (`/terms`), Política de Privacidad (`/privacy`) y Aviso Legal (`/legal`).

---

## 3. ARQUITECTURA FEATURE-BASED Y ESTRUCTURA DE CARPETAS

La aplicación sigue el patrón **Feature-Based (Vertical Slice)**:

```
src/
├── app/                          # Configuración central (App, AppProviders, router)
├── components/                   # Componentes UI reutilizables sin lógica de negocio
│   ├── ui/                       # Button, Input, Card, Badge, Spinner, Captcha
│   ├── modals/                   # ModalBase, ConfirmModal, FormModal
│   ├── feedback/                 # ErrorBoundary, EmptyState, LoadingSkeleton
│   └── data-display/             # DataTable, StatCard
├── features/                     # Módulos por dominio y rol
│   ├── landing/                  # Portal público
│   ├── auth/                     # Login, Register, NotFound (404), Unauthorized (403)
│   ├── legal/                    # TermsPage, PrivacyPage, LegalNoticePage
│   ├── superadmin/               # Módulos del SuperAdmin
│   ├── empresa/                  # Módulos de la Empresa
│   ├── broker/                   # Módulos del Broker
│   ├── caficultor/               # Módulos del Caficultor
│   ├── laboratorio/              # Módulos de Laboratorio de Calidad
│   ├── tecnico/                  # Módulos de Asistencia Técnica / Agronómica
│   ├── catador/                  # Módulos de Catación (SCA)
│   ├── comprador/                # Módulos del Comprador
│   ├── payments/                 # Contenedor aislado de pagos
│   └── profile/                  # Perfil compartido por todos los roles
├── guards/                       # GuestRoute, ProtectedRoute, RoleGuard
├── hooks/                        # useModal, useDebounce
├── layouts/                      # AuthLayout, DashboardLayout, Header, Sidebar
├── lib/                          # axios, sanitize, constants
├── store/                        # useAuthStore, useUIStore
└── styles/                       # index.css
```

---

## 4. PROTOCOLO PARA AGREGAR NUEVAS FUNCIONALIDADES O MÓDULOS

Al agregar una nueva vista o módulo a un rol (por ejemplo, `inventory` en `empresa`):

1. **Crear carpeta en el rol**: `src/features/<rol>/<modulo>/` conteniendo `api/`, `components/`, `pages/` e `index.js`.
2. **Exportar en el barril del rol**: En `src/features/<rol>/index.js`, exportar la nueva página.
3. **Registrar en el Router**: En `src/app/router.jsx`, dentro del bloque `RoleGuard` de ese rol.
4. **Añadir al Sidebar**: En `src/layouts/components/Sidebar.jsx`, añadir el enlace en `NAV_BY_ROLE.<rol>` utilizando un icono de `lucide-react`.

---

## 5. REGLAS ESTÉTICAS Y DE CÓDIGO

- **CERO EMOJIS**: Usar exclusivamente iconos de `lucide-react`.
- **PREVENCIÓN DE PANTALLAS EN BLANCO**: Cualquier ruta no encontrada debe caer en `NotFoundPage` (`path: '*'`). Excepciones de renderizado contenidas por `ErrorBoundary`.
- **VERIFICACIÓN OBLIGATORIA TRAS CAMBIOS**:
  - `npm run build` debe terminar con código 0 (sin errores).
  - `npm run lint` no debe mostrar nuevos errores.
