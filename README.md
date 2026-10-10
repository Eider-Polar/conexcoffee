# ConexCoffee — Arquitectura Frontend

Plataforma digital para el comercio, negociación y trazabilidad de café entre actores clave de la cadena de valor: Productores, Empresas, Brokers y Compradores, administrada por SuperAdministradores.

Este repositorio contiene la aplicación cliente (frontend), diseñada bajo una arquitectura modular orientada a funcionalidades (**Feature-Based Architecture**), enfocada en alta escalabilidad, desacoplamiento, mantenibilidad y estándares estrictos de seguridad web.

---

## 1. Stack Tecnológico y Justificación

A continuación se detallan las librerías principales utilizadas en el proyecto, junto con el propósito técnico e intención de cada elección:

| Dependencia | Versión | Tipo | Justificación Técnica e Intención |
| :--- | :--- | :--- | :--- |
| **React** | `19.2.x` | Core Framework | Biblioteca base para la construcción de interfaces de usuario declarativas mediante arquitectura de componentes y estado reactivo. |
| **Vite** | `8.2.x` | Build Tool & Bundler | Herramienta de compilación ultrarrápida impulsada por Rollup y ES Modules nativos. Proporciona recarga rápida en desarrollo (HMR) y empaquetado optimizado en producción. |
| **Tailwind CSS** | `4.3.x` | Styling Engine | Motor de utilidades CSS de alto rendimiento configurado sin sobrecarga de runtime, facilitando un diseño responsivo, tokens de diseño centralizados y paletas de color consistentes. |
| **React Router DOM** | `7.18.x` | Enrutamiento | Manejo integral de navegación del lado del cliente, con soporte para rutas anidadas, layouts heredados y guardias de ruta condicionales. |
| **Zustand** | `5.0.x` | Gestión de Estado Global | Gestor de estado atómico, ligero y sin boilerplate. Diseñado para mantener el estado de sesión y UI en memoria volátil de JavaScript, evitando deliberadamente el almacenamiento de tokens sensibles en `localStorage`. |
| **Axios** | `1.20.x` | Cliente HTTP | Cliente basado en promesas configurado de manera centralizada con `withCredentials: true` para envío automático de cookies de sesión HttpOnly y control global de errores 401. |
| **DOMPurify** | `3.4.x` | Seguridad XSS | Sanitización estricta de contenidos HTML dinámicos antes del renderizado, previniendo vulnerabilidades de Cross-Site Scripting. |
| **@marsidev/react-turnstile** | `1.6.x` | Seguridad & Antibot | Integración del sistema Cloudflare Turnstile para protección contra bots en flujos críticos (login y registro), con fallback funcional interactivo para entornos locales. |
| **Lucide React** | `1.41.x` | Iconografía | Conjunto unificado, accesible y vectorial de iconos SVG. Asegura consistencia estética profesional en toda la interfaz sin uso de elementos informales ni emojis. |
| **@headlessui/react** | `2.2.x` | Accesibilidad UI | Primitivas accesibles y desestilizadas (WAI-ARIA compliant) para el despliegue de ventanas modales y elementos superpuestos con control de foco. |
| **React Hot Toast** | `2.6.x` | Notificaciones UI | Sistema ligero y no invasivo para retroalimentación visual al usuario ante eventos de éxito, advertencias y errores de red. |
| **Oxlint** | `1.79.x` | Análisis Estático (Dev) | Linter de alto rendimiento en Rust para detección temprana de problemas de sintaxis, variables huérfanas y malas prácticas de React. |
| **Knip** | `6.34.x` | Detección de Código Huérfano | Herramienta analítica de dependencias y exportaciones no utilizadas, garantizando un repositorio limpio y libre de código residual. |

---

## 2. Paradigma y Arquitectura del Sistema

El proyecto sigue una arquitectura **Feature-Based (Vertical Slice Architecture)** complementada con principios de diseño limpio:

### Principios Fundamentales

1. **Modularidad por Dominio de Negocio**:
   Cada funcionalidad o actor del sistema se aísla en su respectiva carpeta dentro de `src/features/`. Cada módulo gestiona sus propias páginas, componentes internos, lógica de peticiones y hooks.
2. **Encapsulamiento y Puntos de Entrada (Barrels)**:
   Cada módulo expone una interfaz pública clara mediante un archivo `index.js`, evitando importaciones cruzadas profundas que comprometan la refactorización a futuro.
3. **Componentes Atómicos Reutilizables**:
   Los componentes comunes de diseño visual (`Button`, `Input`, `Card`, `Badge`, `ModalBase`, `DataTable`) residen en `src/components/`, completamente desacoplados de cualquier lógica de negocio.
4. **Seguridad Integrada por Capas**:
   - Autenticación transparente mediante cookies `HttpOnly` gestionadas por el backend.
   - Guardias de navegación para usuarios no autenticados (`GuestRoute`), usuarios con sesión activa (`ProtectedRoute`) y segregación estricta por privilegios de rol (`RoleGuard`).
   - Módulo de pagos aislado (`src/features/payments/`) para integrar SDKs externos sin exponer datos ni interferir con la navegación central.

---

## 3. Estructura de Directorios

```
src/
├── app/                          # Configuración central de la aplicación
│   ├── App.jsx                   # Raíz: ErrorBoundary -> Providers -> Router
│   ├── AppProviders.jsx          # Contextos, inicialización de sesión y toast
│   └── router.jsx                # Definición centralizada de rutas públicas y privadas
│
├── components/                   # Componentes UI reutilizables sin lógica de negocio
│   ├── ui/                       # Button, Input, Card, Badge, Spinner, Captcha
│   ├── modals/                   # ModalBase, ConfirmModal, FormModal
│   ├── feedback/                 # ErrorBoundary, EmptyState, LoadingSkeleton
│   └── data-display/             # DataTable, StatCard
│
├── features/                     # Módulos organizados por dominio y rol
│   ├── landing/                  # Portal público principal y presentación comercial
│   ├── auth/                     # Autenticación: Login, Registro, hooks y endpoints
│   ├── superadmin/               # Módulos y vistas para el rol SuperAdmin
│   ├── empresa/                  # Módulos y vistas para el rol Empresa
│   ├── broker/                   # Módulos y vistas para el rol Broker
│   ├── productor/                # Módulos y vistas para el rol Productor
│   ├── comprador/                # Módulos y vistas para el rol Comprador
│   ├── legal/                    # Páginas legales: Términos, Privacidad, Aviso Legal
│   ├── payments/                 # Contenedor aislado para pasarelas de pago
│   └── profile/                  # Gestión de perfil compartida entre todos los roles
│
├── guards/                       # Control de acceso y protección de rutas
│   ├── ProtectedRoute.jsx        # Verifica que exista sesión activa
│   ├── RoleGuard.jsx             # Restringe el acceso al rol correspondiente
│   └── GuestRoute.jsx            # Redirige al dashboard si el usuario ya inició sesión
│
├── hooks/                        # Hooks auxiliares y utilidades globales
│   ├── useModal.js               # Control declarativo de apertura/cierre de modales
│   └── useDebounce.js            # Retardo controlado de ejecución para búsquedas/filtros
│
├── layouts/                      # Plantillas estructurales de visualización
│   ├── AuthLayout.jsx            # Layout de dos columnas para Login y Registro
│   ├── DashboardLayout.jsx       # Layout administrativo con Sidebar dinámico y Header
│   └── components/               # Header.jsx, Sidebar.jsx (adaptable según el rol)
│
├── lib/                          # Configuraciones base e infraestructura
│   ├── axios.js                  # Instancia global de Axios (withCredentials, interceptor 401)
│   ├── sanitize.jsx              # Funciones y componentes de sanitización DOMPurify
│   └── constants.js              # Roles, enrutamiento base, metadatos y llaves
│
├── store/                        # Estado global de la aplicación (Zustand)
│   ├── useAuthStore.js           # Usuario en sesión y estado de autenticación en memoria
│   └── useUIStore.js             # Estado de navegación, modales y barra lateral
│
└── styles/                       # Estilos globales y tokens de diseño
    └── index.css                 # Importación de Tailwind CSS y paleta corporativa ConexCoffee
```

---

## 4. Guía de Inicio Rápido

### Requisitos Previos
- **Node.js**: Versión 18.0.0 o superior.
- **npm**: Versión 9.0.0 o superior.

### Instalación de Dependencias

```bash
npm install
```

### Configuración de Variables de Entorno

Copiar el archivo de plantilla `.env.example` y crear el archivo local `.env`:

```bash
cp .env.example .env
```

Contenido base del entorno:

```env
# URL base de la API backend (MERN)
VITE_API_BASE_URL=http://localhost:5000/api

# Llave pública de pasarela de pagos
VITE_PAYMENT_PUBLIC_KEY=pk_test_xxxx

# Llave pública para Cloudflare Turnstile (opcional en desarrollo local)
VITE_TURNSTILE_SITE_KEY=

# Identificador de la aplicación
VITE_APP_NAME=ConexCoffee
```

### Comandos de Ejecución

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Vite (por defecto en `http://localhost:5173`). |
| `npm run build` | Compila y optimiza la aplicación para despliegue en producción (`dist/`). |
| `npm run preview` | Previsualiza localmente el paquete de producción generado. |
| `npm run lint` | Ejecuta el análisis estático de código con Oxlint. |
| `npm run find:unused` | Ejecuta Knip para identificar archivos, exportaciones o dependencias huérfanas. |

---

## 5. Guía de Extensibilidad: Cómo Agregar un Nuevo Módulo

Para incorporar una nueva funcionalidad a cualquier rol (por ejemplo, el módulo de **Inventario** para el rol `empresa`), siga estos pasos estandarizados:

1. **Crear la estructura dentro del rol**:
   ```
   src/features/empresa/inventory/
   ├── api/
   │   └── inventoryApi.js       # Peticiones HTTP específicas mediante @/lib/axios
   ├── components/               # Tablas, tarjetas o formularios propios del módulo
   ├── pages/
   │   └── InventoryPage.jsx     # Página contenedora principal
   └── index.js                  # Exportación de InventoryPage
   ```

2. **Exponer la página en el punto de entrada del rol** (`src/features/empresa/index.js`):
   ```javascript
   export { default as EmpresaDashboardPage } from './dashboard/pages/EmpresaDashboardPage';
   export { default as InventoryPage } from './inventory/pages/InventoryPage';
   ```

3. **Registrar la ruta en el router** (`src/app/router.jsx`):
   ```javascript
   // Dentro de la sección RoleGuard allowedRoles={['empresa']}
   { path: '/empresa/inventory', element: <InventoryPage /> },
   ```

4. **Incorporar el enlace en el menú lateral** (`src/layouts/components/Sidebar.jsx`):
   ```javascript
   // Dentro de NAV_BY_ROLE.empresa
   { label: 'Inventario', path: '/empresa/inventory', icon: Package },
   ```

---

## 6. Documentación Adicional

Para consultar el informe de arquitectura detallado con diagramas de flujo, mapas de navegación, modelos de seguridad y topología de componentes, remítase al documento:
- [ARCHITECTURE.md](./ARCHITECTURE.md)
