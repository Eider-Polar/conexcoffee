import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Guards
import ProtectedRoute from '@/guards/ProtectedRoute';
import RoleGuard from '@/guards/RoleGuard';
import GuestRoute from '@/guards/GuestRoute';

// Layouts
import { AuthLayout, DashboardLayout, PublicLayout } from '@/layouts';

// Feedback
import { RouteError } from '@/components/feedback';
import { Spinner } from '@/components/ui';

// Constantes
import { ROLES } from '@/lib/constants';

// ============================================
// Router — Definición centralizada de TODAS las rutas
// ============================================
// Estructura:
// 1. Rutas públicas (landing, legal)
// 2. Rutas de invitado (login, register)
// 3. Rutas protegidas por rol
// 4. Rutas compartidas (perfil, pagos)
// 5. Páginas de error (404, 403)
//
// Code splitting: cada feature se descarga bajo demanda (lazy) para que
// un visitante de la landing no descargue los paneles de los 8 roles.
//
// Para agregar un nuevo módulo a un rol:
// 1. Crear la carpeta en features/<rol>/<modulo>/
// 2. Exportar la página en features/<rol>/index.js
// 3. Declarar el lazy aquí y agregar la ruta dentro del RoleGuard del rol
// 4. Agregar el link en NAV_BY_ROLE en Sidebar.jsx
// ============================================

/**
 * Crea un componente lazy a partir de un export con nombre de un barrel de feature.
 * @param {() => Promise<object>} loader - ej. () => import('@/features/empresa')
 * @param {string} name - nombre del export
 */
const lazyPage = (loader, name) =>
  lazy(() => loader().then((module) => ({ default: module[name] })));

/** Renderiza un componente lazy dentro de su Suspense. */
const page = (Component) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    }
  >
    <Component />
  </Suspense>
);

// ---------- Landing / Legal ----------
const landing = () => import('@/features/landing');
const LandingPage = lazyPage(landing, 'LandingPage');
const DestinosPage = lazyPage(landing, 'DestinosPage');
const NosotrosPage = lazyPage(landing, 'NosotrosPage');
const BlogPage = lazyPage(landing, 'BlogPage');
const ContactPage = lazyPage(landing, 'ContactPage');
const AddProductPage = lazyPage(landing, 'AddProductPage');

const legal = () => import('@/features/legal');
const TermsPage = lazyPage(legal, 'TermsPage');
const PrivacyPage = lazyPage(legal, 'PrivacyPage');
const LegalNoticePage = lazyPage(legal, 'LegalNoticePage');

// ---------- Auth ----------
const auth = () => import('@/features/auth');
const LoginPage = lazyPage(auth, 'LoginPage');
const RegisterPage = lazyPage(auth, 'RegisterPage');
const NotFoundPage = lazyPage(auth, 'NotFoundPage');
const UnauthorizedPage = lazyPage(auth, 'UnauthorizedPage');

// ---------- SuperAdmin ----------
const superadmin = () => import('@/features/superadmin');
const SuperAdminDashboardPage = lazyPage(superadmin, 'SuperAdminDashboardPage');
const CaficultoresPage = lazyPage(superadmin, 'CaficultoresPage');
const CatadoresPage = lazyPage(superadmin, 'CatadoresPage');
const EmpresasPage = lazyPage(superadmin, 'EmpresasPage');
const BrokersPage = lazyPage(superadmin, 'BrokersPage');
const CompradoresPage = lazyPage(superadmin, 'CompradoresPage');
const ComprasPage = lazyPage(superadmin, 'ComprasPage');
const ContenedoresPage = lazyPage(superadmin, 'ContenedoresPage');
const FincasPage = lazyPage(superadmin, 'FincasPage');
const LaboratoriosPage = lazyPage(superadmin, 'LaboratoriosPage');
const MuestrasPage = lazyPage(superadmin, 'MuestrasPage');
const OfertasPage = lazyPage(superadmin, 'OfertasPage');
const TecnicosPage = lazyPage(superadmin, 'TecnicosPage');
const UsuariosPage = lazyPage(superadmin, 'UsuariosPage');
const ConfiguracionPage = lazyPage(superadmin, 'ConfiguracionPage');

// ---------- Empresa ----------
const empresa = () => import('@/features/empresa');
const EmpresaDashboardPage = lazyPage(empresa, 'EmpresaDashboardPage');
const EmpresaBrokersPage = lazyPage(empresa, 'EmpresaBrokersPage');
const EmpresaCaficultoresPage = lazyPage(empresa, 'EmpresaCaficultoresPage');
const EmpresaContenedoresPage = lazyPage(empresa, 'EmpresaContenedoresPage');
const EmpresaLaboratoriosPage = lazyPage(empresa, 'EmpresaLaboratoriosPage');
const EmpresaMuestrasPage = lazyPage(empresa, 'EmpresaMuestrasPage');
const EmpresaPreOfertasPage = lazyPage(empresa, 'EmpresaPreOfertasPage');
const EmpresaOfertasPage = lazyPage(empresa, 'EmpresaOfertasPage');
const EmpresaOfertasLibresPage = lazyPage(empresa, 'EmpresaOfertasLibresPage');
const EmpresaTecnicosPage = lazyPage(empresa, 'EmpresaTecnicosPage');

// ---------- Broker ----------
const broker = () => import('@/features/broker');
const BrokerDashboardPage = lazyPage(broker, 'BrokerDashboardPage');

// ---------- Caficultor ----------
const caficultor = () => import('@/features/caficultor');
const CaficultorDashboardPage = lazyPage(caficultor, 'CaficultorDashboardPage');
const CaficultorFincasPage = lazyPage(caficultor, 'CaficultorFincasPage');
const CaficultorLotesPage = lazyPage(caficultor, 'CaficultorLotesPage');
const CaficultorPreOfertasPage = lazyPage(caficultor, 'CaficultorPreOfertasPage');
const CaficultorOfertasPage = lazyPage(caficultor, 'CaficultorOfertasPage');

// ---------- Comprador ----------
const comprador = () => import('@/features/comprador');
const CompradorDashboardPage = lazyPage(comprador, 'CompradorDashboardPage');
const CompradorContenedoresPage = lazyPage(comprador, 'CompradorContenedoresPage');
const DetalleVariedadPage = lazyPage(comprador, 'DetalleVariedadPage');

// ---------- Laboratorio ----------
const laboratorio = () => import('@/features/laboratorio');
const LaboratorioDashboardPage = lazyPage(laboratorio, 'LaboratorioDashboardPage');
const LaboratorioCatadoresPage = lazyPage(laboratorio, 'LaboratorioCatadoresPage');
const LaboratorioAnalisisFisicoPage = lazyPage(laboratorio, 'LaboratorioAnalisisFisicoPage');
const LaboratorioAnalisisSensorialPage = lazyPage(laboratorio, 'LaboratorioAnalisisSensorialPage');
const LaboratorioResultadosPage = lazyPage(laboratorio, 'LaboratorioResultadosPage');
const LaboratorioHojasCatacionPage = lazyPage(laboratorio, 'LaboratorioHojasCatacionPage');
const LaboratorioMuestrasPage = lazyPage(laboratorio, 'LaboratorioMuestrasPage');

// ---------- Técnico ----------
const tecnico = () => import('@/features/tecnico');
const TecnicoDashboardPage = lazyPage(tecnico, 'TecnicoDashboardPage');

// ---------- Catador ----------
const catador = () => import('@/features/catador');
const CatadorDashboardPage = lazyPage(catador, 'CatadorDashboardPage');
const EvaluacionPage = lazyPage(catador, 'EvaluacionPage');

// ---------- Compartidas ----------
const profile = () => import('@/features/profile');
const ProfilePage = lazyPage(profile, 'ProfilePage');

const payments = () => import('@/features/payments');
const PaymentContainer = lazyPage(payments, 'PaymentContainer');

/**
 * Helper para declarar un bloque de rol:
 * RoleGuard → DashboardLayout → rutas del rol.
 */
const roleRoutes = (role, children) => ({
  element: <RoleGuard allowedRoles={[role]} />,
  children: [
    {
      element: <DashboardLayout />,
      children,
    },
  ],
});

const router = createBrowserRouter([
  // ============================================
  // RUTAS PÚBLICAS — Landing, Módulos Públicos & Legal
  // ============================================
  {
    element: <PublicLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: page(LandingPage) },
      { path: '/destinos', element: page(DestinosPage) },
      { path: '/nosotros', element: page(NosotrosPage) },
      { path: '/blog', element: page(BlogPage) },
      { path: '/contacto', element: page(ContactPage) },
      { path: '/contactanos', element: <Navigate to="/contacto" replace /> },
      { path: '/agregar-producto', element: page(AddProductPage) },
      { path: '/terms', element: page(TermsPage) },
      { path: '/privacy', element: page(PrivacyPage) },
      { path: '/legal', element: page(LegalNoticePage) },
    ],
  },

  // ============================================
  // RUTAS DE INVITADO — Login, Register
  // ============================================
  {
    element: <GuestRoute />,
    errorElement: <RouteError />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: page(LoginPage) },
          { path: '/register', element: page(RegisterPage) },
        ],
      },
    ],
  },

  // ============================================
  // RUTAS PROTEGIDAS — Requieren autenticación
  // ============================================
  {
    element: <ProtectedRoute />,
    errorElement: <RouteError />,
    children: [
      roleRoutes(ROLES.SUPERADMIN, [
        { path: '/superadmin/dashboard',    element: page(SuperAdminDashboardPage) },
        { path: '/superadmin/caficultores', element: page(CaficultoresPage) },
        { path: '/superadmin/catadores',    element: page(CatadoresPage) },
        { path: '/superadmin/empresas',     element: page(EmpresasPage) },
        { path: '/superadmin/brokers',      element: page(BrokersPage) },
        { path: '/superadmin/compras',      element: page(ComprasPage) },
        { path: '/superadmin/compradores',  element: page(CompradoresPage) },
        { path: '/superadmin/contenedores', element: page(ContenedoresPage) },
        { path: '/superadmin/fincas',       element: page(FincasPage) },
        { path: '/superadmin/laboratorios', element: page(LaboratoriosPage) },
        { path: '/superadmin/muestras',     element: page(MuestrasPage) },
        { path: '/superadmin/ofertas',      element: page(OfertasPage) },
        { path: '/superadmin/tecnicos',     element: page(TecnicosPage) },
        { path: '/superadmin/users',        element: page(UsuariosPage) },
        { path: '/superadmin/settings',     element: page(ConfiguracionPage) },
      ]),

      roleRoutes(ROLES.EMPRESA, [
        { path: '/empresa/dashboard',      element: page(EmpresaDashboardPage) },
        { path: '/empresa/ofertas-libres', element: page(EmpresaOfertasLibresPage) },
        { path: '/empresa/brokers',        element: page(EmpresaBrokersPage) },
        { path: '/empresa/caficultores',   element: page(EmpresaCaficultoresPage) },
        { path: '/empresa/contenedores',   element: page(EmpresaContenedoresPage) },
        { path: '/empresa/laboratorios',   element: page(EmpresaLaboratoriosPage) },
        { path: '/empresa/muestras',       element: page(EmpresaMuestrasPage) },
        { path: '/empresa/pre-ofertas',    element: page(EmpresaPreOfertasPage) },
        { path: '/empresa/ofertas',        element: page(EmpresaOfertasPage) },
        { path: '/empresa/tecnicos',       element: page(EmpresaTecnicosPage) },
      ]),

      roleRoutes(ROLES.BROKER, [
        { path: '/broker/dashboard', element: page(BrokerDashboardPage) },
        // { path: '/broker/negotiations', element: page(NegotiationsPage) },
      ]),

      roleRoutes(ROLES.CAFICULTOR, [
        { path: '/caficultor/dashboard',   element: page(CaficultorDashboardPage) },
        { path: '/caficultor/fincas',      element: page(CaficultorFincasPage) },
        { path: '/caficultor/lotes',       element: page(CaficultorLotesPage) },
        { path: '/caficultor/lots',        element: <Navigate to="/caficultor/lotes" replace /> },
        { path: '/caficultor/pre-ofertas', element: page(CaficultorPreOfertasPage) },
        { path: '/caficultor/ofertas',     element: page(CaficultorOfertasPage) },
      ]),

      roleRoutes(ROLES.COMPRADOR, [
        { path: '/comprador/dashboard',            element: page(CompradorDashboardPage) },
        { path: '/comprador/contenedores',         element: page(CompradorContenedoresPage) },
        { path: '/comprador/catalogo/:variedadId', element: page(DetalleVariedadPage) },
      ]),

      roleRoutes(ROLES.LABORATORIO, [
        { path: '/laboratorio/dashboard',          element: page(LaboratorioDashboardPage) },
        { path: '/laboratorio/catadores',          element: page(LaboratorioCatadoresPage) },
        { path: '/laboratorio/analisis-fisico',    element: page(LaboratorioAnalisisFisicoPage) },
        { path: '/laboratorio/analisis-sensorial', element: page(LaboratorioAnalisisSensorialPage) },
        { path: '/laboratorio/resultados',         element: page(LaboratorioResultadosPage) },
        { path: '/laboratorio/hojas-catacion',     element: page(LaboratorioHojasCatacionPage) },
        { path: '/laboratorio/muestras',           element: page(LaboratorioMuestrasPage) },
      ]),

      roleRoutes(ROLES.TECNICO, [
        { path: '/tecnico/dashboard', element: page(TecnicoDashboardPage) },
      ]),

      roleRoutes(ROLES.CATADOR, [
        { path: '/catador/dashboard',  element: page(CatadorDashboardPage) },
        { path: '/catador/evaluacion', element: page(EvaluacionPage) },
      ]),

      // Rutas compartidas (cualquier rol autenticado)
      {
        element: <DashboardLayout />,
        children: [
          { path: '/profile', element: page(ProfilePage) },
          // TODO(backend): pasar el monto real y enviar el token al backend.
          // Mientras tanto no se registra ni se expone el token de pago.
          {
            path: '/payments',
            element: (
              <Suspense fallback={<Spinner size="lg" />}>
                <PaymentContainer amount={0} onPaymentToken={() => {}} onError={() => {}} />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // ============================================
  // PÁGINAS DE UTILIDAD
  // ============================================
  { path: '/unauthorized', element: page(UnauthorizedPage), errorElement: <RouteError /> },
  { path: '*', element: page(NotFoundPage), errorElement: <RouteError /> },
]);

export default router;
