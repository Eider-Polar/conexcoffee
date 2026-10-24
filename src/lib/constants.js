// ============================================
// Constantes Globales — ConexCoffee
// ============================================

/**
 * Roles disponibles en la plataforma.
 * Usados para guards de rutas, sidebar y permisos.
 */
export const ROLES = {
  SUPERADMIN: 'superadmin',
  EMPRESA: 'empresa',
  BROKER: 'broker',
  CAFICULTOR: 'caficultor',
  COMPRADOR: 'comprador',
  LABORATORIO: 'laboratorio',
  TECNICO: 'tecnico',
  CATADOR: 'catador',
};

/**
 * Rutas base del dashboard según el rol del usuario.
 * Se usa para redirigir al usuario después del login.
 */
export const ROLE_DASHBOARD_ROUTES = {
  [ROLES.SUPERADMIN]: '/superadmin/dashboard',
  [ROLES.EMPRESA]: '/empresa/dashboard',
  [ROLES.BROKER]: '/broker/dashboard',
  [ROLES.CAFICULTOR]: '/caficultor/dashboard',
  [ROLES.COMPRADOR]: '/comprador/dashboard',
  [ROLES.LABORATORIO]: '/laboratorio/dashboard',
  [ROLES.TECNICO]: '/tecnico/dashboard',
  [ROLES.CATADOR]: '/catador/dashboard',
};

export { APP_NAME, PAYMENT_PUBLIC_KEY } from './env';

/**
 * Tiempo de inactividad antes de cerrar sesión (en milisegundos).
 * 30 minutos por defecto.
 */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

/**
 * Configuración de paginación por defecto.
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [10, 25, 50, 100],
};

/**
 * Diccionario de colores y estilos globales oficiales
 */
export { BRAND_COLORS, PALETTE, COLOR_STYLES } from './colors';
