import { createBrowserRouter } from 'react-router-dom';

// Guards
import ProtectedRoute from '@/guards/ProtectedRoute';
import RoleGuard from '@/guards/RoleGuard';
import GuestRoute from '@/guards/GuestRoute';

// Layouts
import { AuthLayout, DashboardLayout, PublicLayout } from '@/layouts';

// Features — Landing
import {
  LandingPage,
  DestinosPage,
  NosotrosPage,
  BlogPage,
  ContactPage,
  AddProductPage,
} from '@/features/landing';

// Features — Auth
import { LoginPage, RegisterPage } from '@/features/auth';

// Features — Dashboards por rol
import {
  SuperAdminDashboardPage,
  CaficultoresPage,
  CatadoresPage,
  EmpresasPage,
  BrokersPage,
  ComprasPage,
  ContenedoresPage,
  FincasPage,
  LaboratoriosPage,
  MuestrasPage,
  OfertasPage,
  TecnicosPage,
  UsuariosPage,
  ConfiguracionPage,
} from '@/features/superadmin';
import {
  EmpresaDashboardPage,
  EmpresaBrokersPage,
  EmpresaCaficultoresPage,
  EmpresaContenedoresPage,
  EmpresaLaboratoriosPage,
  EmpresaMuestrasPage,
  EmpresaPreOfertasPage,
  EmpresaOfertasPage,
  EmpresaTecnicosPage,
} from '@/features/empresa';
import { BrokerDashboardPage } from '@/features/broker';
import { CaficultorDashboardPage } from '@/features/caficultor';
import { CompradorDashboardPage, CompradorContenedoresPage, DetalleVariedadPage } from '@/features/comprador';
import {
  LaboratorioDashboardPage,
  LaboratorioCatadoresPage,
  LaboratorioAnalisisFisicoPage,
  LaboratorioAnalisisSensorialPage,
  LaboratorioHojasCatacionPage,
  LaboratorioMuestrasPage,
} from '@/features/laboratorio';
import { TecnicoDashboardPage } from '@/features/tecnico';
import { CatadorDashboardPage, EvaluacionPage } from '@/features/catador';

// Features — Compartidas
import { ProfilePage } from '@/features/profile';
import { PaymentContainer } from '@/features/payments';

// Features — Legal & Términos
import { TermsPage, PrivacyPage, LegalNoticePage } from '@/features/legal';

// Pages de utilidad
import NotFoundPage from '@/features/auth/pages/NotFoundPage';
import UnauthorizedPage from '@/features/auth/pages/UnauthorizedPage';

// ============================================
// Router — Definición centralizada de TODAS las rutas
// ============================================
// Estructura:
// 1. Rutas públicas (landing, login, register)
// 2. Rutas protegidas por rol
// 3. Rutas compartidas (perfil, pagos)
// 4. Páginas de error (404, 403)
//
// Para agregar un nuevo módulo a un rol:
// 1. Crear la carpeta en features/<rol>/<modulo>/
// 2. Importar la página aquí
// 3. Agregar la ruta dentro del RoleGuard correspondiente
// 4. Agregar el link en NAV_BY_ROLE en Sidebar.jsx
// ============================================

const router = createBrowserRouter([
  // ============================================
  // RUTAS PÚBLICAS — Landing, Módulos Públicos & Legal
  // ============================================
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/destinos', element: <DestinosPage /> },
      { path: '/nosotros', element: <NosotrosPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/contacto', element: <ContactPage /> },
      { path: '/contactanos', element: <ContactPage /> },
      { path: '/agregar-producto', element: <AddProductPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/legal', element: <LegalNoticePage /> },
    ],
  },

  // ============================================
  // RUTAS DE INVITADO — Login, Register
  // ============================================
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
    ],
  },

  // ============================================
  // RUTAS PROTEGIDAS — Requieren autenticación
  // ============================================
  {
    element: <ProtectedRoute />,
    children: [
      // ----------------------------------------
      // SuperAdmin
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['superadmin']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/superadmin/dashboard',    element: <SuperAdminDashboardPage /> },
              { path: '/superadmin/caficultores', element: <CaficultoresPage />        },
              { path: '/superadmin/catadores',    element: <CatadoresPage />           },
              { path: '/superadmin/empresas',     element: <EmpresasPage />            },
              { path: '/superadmin/brokers',      element: <BrokersPage />             },
              { path: '/superadmin/compras',      element: <ComprasPage />             },
              { path: '/superadmin/compradores',  element: <ComprasPage />             },
              { path: '/superadmin/contenedores', element: <ContenedoresPage />        },
              { path: '/superadmin/fincas',       element: <FincasPage />              },
              { path: '/superadmin/laboratorios', element: <LaboratoriosPage />        },
              { path: '/superadmin/muestras',     element: <MuestrasPage />            },
              { path: '/superadmin/ofertas',      element: <OfertasPage />             },
              { path: '/superadmin/tecnicos',     element: <TecnicosPage />            },
              { path: '/superadmin/users',        element: <UsuariosPage />            },
              { path: '/superadmin/settings',     element: <ConfiguracionPage />       },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Empresa
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['empresa']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/empresa/dashboard',    element: <EmpresaDashboardPage />    },
              { path: '/empresa/brokers',      element: <EmpresaBrokersPage />      },
              { path: '/empresa/caficultores', element: <EmpresaCaficultoresPage /> },
              { path: '/empresa/contenedores', element: <EmpresaContenedoresPage /> },
              { path: '/empresa/laboratorios', element: <EmpresaLaboratoriosPage /> },
              { path: '/empresa/muestras',     element: <EmpresaMuestrasPage />     },
              { path: '/empresa/pre-ofertas',  element: <EmpresaPreOfertasPage />  },
              { path: '/empresa/ofertas',      element: <EmpresaOfertasPage />      },
              { path: '/empresa/tecnicos',     element: <EmpresaTecnicosPage />     },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Broker
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['broker']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/broker/dashboard', element: <BrokerDashboardPage /> },
              // { path: '/broker/negotiations', element: <NegotiationsPage /> },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Caficultor
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['caficultor']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/caficultor/dashboard', element: <CaficultorDashboardPage /> },
              // { path: '/caficultor/fincas', element: <FincasPage /> },
              // { path: '/caficultor/lots', element: <LotsPage /> },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Comprador
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['comprador']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/comprador/dashboard',        element: <CompradorDashboardPage /> },
              { path: '/comprador/contenedores',     element: <CompradorContenedoresPage /> },
              { path: '/comprador/catalogo/:variedadId', element: <DetalleVariedadPage /> },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Laboratorio
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['laboratorio']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/laboratorio/dashboard',          element: <LaboratorioDashboardPage />        },
              { path: '/laboratorio/catadores',          element: <LaboratorioCatadoresPage />        },
              { path: '/laboratorio/analisis-fisico',    element: <LaboratorioAnalisisFisicoPage />    },
              { path: '/laboratorio/analisis-sensorial', element: <LaboratorioAnalisisSensorialPage /> },
              { path: '/laboratorio/hojas-catacion',     element: <LaboratorioHojasCatacionPage />    },
              { path: '/laboratorio/muestras',           element: <LaboratorioMuestrasPage />         },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Técnico / Asistente Técnico
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['tecnico']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/tecnico/dashboard', element: <TecnicoDashboardPage /> },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Catador
      // ----------------------------------------
      {
        element: <RoleGuard allowedRoles={['catador']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/catador/dashboard',  element: <CatadorDashboardPage /> },
              { path: '/catador/evaluacion', element: <EvaluacionPage /> },
            ],
          },
        ],
      },

      // ----------------------------------------
      // Rutas compartidas (cualquier rol autenticado)
      // ----------------------------------------
      {
        element: <DashboardLayout />,
        children: [
          { path: '/profile', element: <ProfilePage /> },
          {
            path: '/payments',
            element: (
              <PaymentContainer
                amount={0}
                onPaymentToken={(token) => console.log('Token:', token)}
                onError={(err) => console.error('Payment error:', err)}
              />
            ),
          },
        ],
      },
    ],
  },

  // ============================================
  // PÁGINAS DE UTILIDAD
  // ============================================
  { path: '/unauthorized', element: <UnauthorizedPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
