import {
  Users,
  Leaf,
  Building2,
  ShoppingBag,
  Handshake,
  Coffee,
  FlaskConical,
  Package,
  UserCheck,
} from 'lucide-react';

// ============================================
// dashboardData.js — Datos del SuperAdmin Dashboard
// ============================================
// Fuente de datos para el panel. Cuando el backend esté listo,
// estos valores se reemplazarán por llamadas a la API a través
// de src/lib/axios.js.
// ============================================

export const DASHBOARD_STATS = [
  { id: 'usuarios',     label: 'Total Usuarios',   value: '1,234', change: '+8.2%', up: true,  icon: Users,    color: '#AD2E01', bg: '#FFF1ED' },
  { id: 'caficultores', label: 'Caficultores',      value: '412',   change: '+5.4%', up: true,  icon: Leaf,     color: '#AD2E01', bg: '#FFF1ED' },
  { id: 'empresas',     label: 'Empresas Activas',  value: '56',    change: '+3.1%', up: true,  icon: Building2, color: '#F25433', bg: '#FFF5F2' },
  { id: 'ofertas',      label: 'Ofertas Activas',   value: '89',    change: '-2.4%', up: false, icon: ShoppingBag, color: '#AD2E01', bg: '#FFF1ED' },
];

export const PLATFORM_METRICS = [
  { label: 'Pre-ofertas activas',  value: 47,  total: 60,  color: '#F25433' },
  { label: 'Contratos firmados',   value: 31,  total: 40,  color: '#AD2E01' },
  { label: 'Completitud perfiles', value: 78,  total: 100, color: '#F25433' },
  { label: 'Muestras procesadas',  value: 175, total: 225, color: '#AD2E01' },
];

export const RECENT_ACTIVITY = [
  { id: 1, message: 'Nuevo caficultor registrado: Carlos Gómez (Huila)',             time: 'Hace 5 min',  status: 'success' },
  { id: 2, message: 'Oferta aprobada: Lote #A-2491 — 12 sacos — Cauca',             time: 'Hace 14 min', status: 'success' },
  { id: 3, message: 'Pre-oferta pendiente de revisión técnica (lote #B-887)',        time: 'Hace 32 min', status: 'warning' },
  { id: 4, message: 'Empresa "CafeCauca SAS" actualizó su perfil',                  time: 'Hace 1 h',    status: 'info'    },
  { id: 5, message: 'Contrato generado #CON-2024-038 — Exportación Europa',         time: 'Hace 2 h',    status: 'success' },
  { id: 6, message: 'Laboratorio Tecnicafé: muestra vencida requiere renovación',   time: 'Hace 3 h',    status: 'warning' },
];

export const QUICK_MODULES = [
  { id: 'caficultores',  title: 'Caficultores',  description: 'Productores de café',            path: '/superadmin/caficultores',  icon: Leaf,        stats: [{ label: 'Total', value: '412' },  { label: 'Activos',    value: '395'   }] },
  { id: 'empresas',      title: 'Empresas',       description: 'Empresas compradoras',           path: '/superadmin/empresas',       icon: Building2,   stats: [{ label: 'Total', value: '56'  },  { label: 'Activas',    value: '52'    }] },
  { id: 'brokers',       title: 'Brokers',        description: 'Intermediarios de comercio',     path: '/superadmin/brokers',        icon: Handshake,   stats: [{ label: 'Total', value: '28'  },  { label: 'Activos',    value: '24'    }] },
  { id: 'compradores',   title: 'Compradores',    description: 'Compradores internacionales',    path: '/superadmin/compradores',    icon: ShoppingBag, stats: [{ label: 'Total', value: '134' },  { label: 'Nuevos',     value: '12'    }] },
  { id: 'fincas',        title: 'Fincas',         description: 'Fincas y lotes registrados',     path: '/superadmin/fincas',         icon: Coffee,      stats: [{ label: 'Fincas', value: '384' }, { label: 'Lotes',      value: '1,201' }] },
  { id: 'laboratorios',  title: 'Laboratorios',   description: 'Centros de catación',            path: '/superadmin/laboratorios',   icon: FlaskConical,stats: [{ label: 'Total', value: '8'   },  { label: 'Activos',    value: '7'     }] },
  { id: 'muestras',      title: 'Muestras',       description: 'Muestras de café enviadas',      path: '/superadmin/muestras',       icon: Package,     stats: [{ label: 'Total', value: '225' },  { label: 'Pendientes', value: '50'    }] },
  { id: 'tecnicos',      title: 'Técnicos',       description: 'Técnicos de campo asignados',    path: '/superadmin/tecnicos',       icon: UserCheck,   stats: [{ label: 'Total', value: '18'  },  { label: 'Activos',    value: '16'    }] },
];
