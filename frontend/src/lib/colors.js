// ==========================================================
// ConexCoffee — Diccionario Central de Estilos de Colores
// Single Source of Truth para tokens cromáticos y clases semánticas
// ==========================================================

/**
 * 1. Colores Oficiales Definidos por el Usuario (Identidad Primaria ConexCoffee)
 * Extraídos directamente de los swatches oficiales de marca
 */
export const BRAND_COLORS = {
  terracota: '#AD2E01', // Color 1: Terracota Intenso / Café Fuego (#AD2E01)
  orange: '#F25433',    // Color 2: Naranja Vibrante / Coral Flama (#F25433)
  white: '#FFFFFF',     // Color 3: Blanco Puro (#FFFFFF)
  black: '#000000',     // Color 4: Negro Profundo (#000000)
};

/**
 * 2. Paleta de Colores Completa (Valores HEX y escalas cromáticas)
 * Sincronizado 1:1 con @theme en src/styles/index.css
 */
export const PALETTE = {
  // Colores Oficiales de Marca
  brand: BRAND_COLORS,

  // Escala Primaria — Construida en torno a #AD2E01 y #F25433
  primary: {
    50: '#fef5f2',
    100: '#fee8e3',
    200: '#fed4ca',
    300: '#fcb4a4',
    400: '#f7866f',
    500: '#F25433', // Color Oficial 2: Naranja Vibrante
    600: '#de3c1b', // Hover de acción
    700: '#AD2E01', // Color Oficial 1: Terracota Profundo
    800: '#8c2503',
    900: '#712108',
    950: '#3e0e02',
  },

  // Acento — Dorado / Miel / Calidad SCA y Micro-lotes
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Superficies & Neutros (Con Blanco Puro #FFFFFF y Negro #000000)
  surface: {
    0: '#FFFFFF',   // Blanco Puro Oficial
    50: '#fafaf9',  // Fondo base suave
    100: '#f5f5f4', // Fondo paneles secundarios
    200: '#e7e5e4', // Bordes estándar
    300: '#d6d3d1', // Bordes hover
    400: '#a8a29e', // Iconos inactivos / placeholder
    500: '#78716c', // Texto secundario
    600: '#57534e', // Texto de lectura
    700: '#44403c', // Títulos secundarios
    800: '#292524', // Alto contraste
    900: '#1c1917', // Fondo oscuro
    950: '#000000', // Negro Profundo Oficial
  },

  // Estados Semánticos
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  success: {
    50: '#fef5f2',
    100: '#fee8e3',
    500: '#F25433',
    600: '#AD2E01',
    700: '#8c2503',
  },
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
};

/**
 * 3. Diccionario de Clases de Utilidad Tailwind Semánticas
 */
export const COLOR_STYLES = {
  // Botones y Elementos Accionables
  buttons: {
    // Primario basado en Naranja Vibrante y Terracota
    primary: 'bg-brand-orange hover:bg-brand-terracota text-white shadow-xs focus:ring-2 focus:ring-brand-orange/40 font-bold transition-colors',
    terracota: 'bg-brand-terracota hover:bg-brand-terracota-dark text-white shadow-xs font-bold transition-colors',
    secondary: 'bg-brand-terracota hover:bg-brand-terracota-dark text-white shadow-xs focus:ring-2 focus:ring-brand-terracota/40 font-bold',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-xs font-bold',
    outline: 'border border-surface-300 hover:border-brand-orange bg-white hover:bg-surface-50 text-surface-800 font-bold transition-colors',
    black: 'bg-black hover:bg-surface-800 text-white shadow-xs font-bold transition-colors',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white shadow-xs font-bold',
    ghost: 'hover:bg-surface-100 text-surface-700 hover:text-surface-900',
  },

  // Badges y Etiquetas
  badges: {
    brandOrange: 'bg-primary-100 text-brand-terracota border border-primary-200',
    brandTerracota: 'bg-brand-terracota text-white border border-primary-800',
    success: 'bg-primary-100 text-brand-terracota border border-primary-200',
    warning: 'bg-accent-100 text-accent-900 border border-accent-200/80',
    danger: 'bg-danger-50 text-danger-700 border border-danger-200/80',
    info: 'bg-info-50 text-info-700 border border-info-200/80',
    neutral: 'bg-surface-100 text-surface-700 border border-surface-200/80',
    dark: 'bg-black text-white border border-surface-800',
  },

  // Badges por Rol de Usuario (RBAC)
  roles: {
    superadmin: {
      name: 'Super Administrador',
      badge: 'bg-purple-100 text-purple-900 border border-purple-200',
      dot: 'bg-purple-600',
    },
    empresa: {
      name: 'Empresa Exportadora',
      badge: 'bg-primary-100 text-brand-terracota border border-primary-200',
      dot: 'bg-brand-terracota',
    },
    broker: {
      name: 'Broker Comercial',
      badge: 'bg-blue-100 text-blue-900 border border-blue-200',
      dot: 'bg-blue-600',
    },
    productor: {
      name: 'Caficultor / Productor',
      badge: 'bg-primary-100 text-brand-terracota border border-primary-200',
      dot: 'bg-brand-terracota',
    },
    comprador: {
      name: 'Comprador / Tostador',
      badge: 'bg-black text-white border border-surface-800',
      dot: 'bg-brand-orange',
    },
  },

  // Estados de Lotes y Contenedores Marítimos
  logistica: {
    abierto: 'bg-primary-100 text-brand-terracota border border-primary-200',
    ultimosCupos: 'bg-primary-100 text-brand-terracota border border-primary-200',
    consolidado: 'bg-blue-100 text-blue-900 border border-blue-300',
    programado: 'bg-surface-100 text-surface-700 border border-surface-300',
    cerrado: 'bg-rose-100 text-rose-900 border border-rose-300',
  },

  // Superficies y Tarjetas
  surfaces: {
    card: 'bg-white border border-surface-200 shadow-xs rounded-xl',
    cardHover: 'bg-white border border-surface-200 hover:border-brand-orange hover:shadow-md transition-all duration-200 rounded-xl',
    cardDark: 'bg-black border border-surface-800 text-white rounded-xl',
    panel: 'bg-surface-50 border border-surface-200 rounded-xl',
  },

  // Bordes Globales (Regla Estricta: 13px)
  radius: {
    sm: 'rounded-sm',     // 8px
    md: 'rounded-md',     // 10px
    lg: 'rounded-xl',     // 13px (Default global)
    full: 'rounded-full', // Pills y círculos
  },
};

export default {
  BRAND_COLORS,
  PALETTE,
  COLOR_STYLES,
};
