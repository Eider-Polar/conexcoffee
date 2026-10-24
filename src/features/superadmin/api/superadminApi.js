import { createResourceApi } from '@/lib/createResourceApi';
import {
  DASHBOARD_STATS,
  PLATFORM_METRICS,
  RECENT_ACTIVITY,
  QUICK_MODULES,
} from '../data/dashboardData';
import {
  SUPERADMIN_BROKERS_SEED,
  SUPERADMIN_CAFICULTORES_SEED,
  SUPERADMIN_CATADORES_SEED,
  SUPERADMIN_COMPRADORES_SEED,
  SUPERADMIN_PEDIDOS_SEED,
  SUPERADMIN_CONTENEDORES_SEED,
  SUPERADMIN_EMPRESAS_SEED,
  SUPERADMIN_FINCAS_SEED,
  SUPERADMIN_LOTES_SEED,
  SUPERADMIN_LABORATORIOS_SEED,
  SUPERADMIN_MUESTRAS_SEED,
  SUPERADMIN_OFERTAS_SEED,
  SUPERADMIN_PREOFERTAS_SEED,
  SUPERADMIN_TECNICOS_SEED,
  SUPERADMIN_USUARIOS_SEED,
  SUPERADMIN_CONFIGURACION_SEED,
} from '../data/superadminData';

export const superadminStatsApi = createResourceApi({
  path: '/superadmin/stats',
  seed: DASHBOARD_STATS,
});

export const superadminMetricsApi = createResourceApi({
  path: '/superadmin/metrics',
  seed: PLATFORM_METRICS,
});

export const superadminActivityApi = createResourceApi({
  path: '/superadmin/activity',
  seed: RECENT_ACTIVITY,
});

export const superadminModulesApi = createResourceApi({
  path: '/superadmin/modules',
  seed: QUICK_MODULES,
});

export const superadminBrokersApi = createResourceApi({
  path: '/superadmin/brokers',
  seed: SUPERADMIN_BROKERS_SEED,
});

export const superadminCaficultoresApi = createResourceApi({
  path: '/superadmin/caficultores',
  seed: SUPERADMIN_CAFICULTORES_SEED,
});

export const superadminCatadoresApi = createResourceApi({
  path: '/superadmin/catadores',
  seed: SUPERADMIN_CATADORES_SEED,
});

export const superadminCompradoresApi = createResourceApi({
  path: '/superadmin/compradores',
  seed: SUPERADMIN_COMPRADORES_SEED,
});

export const superadminPedidosApi = createResourceApi({
  path: '/superadmin/pedidos',
  seed: SUPERADMIN_PEDIDOS_SEED,
});

export const superadminContenedoresApi = createResourceApi({
  path: '/superadmin/contenedores',
  seed: SUPERADMIN_CONTENEDORES_SEED,
});

export const superadminEmpresasApi = createResourceApi({
  path: '/superadmin/empresas',
  seed: SUPERADMIN_EMPRESAS_SEED,
});

export const superadminFincasApi = createResourceApi({
  path: '/superadmin/fincas',
  seed: SUPERADMIN_FINCAS_SEED,
});

export const superadminLotesApi = createResourceApi({
  path: '/superadmin/lotes',
  seed: SUPERADMIN_LOTES_SEED,
});

export const superadminLaboratoriosApi = createResourceApi({
  path: '/superadmin/laboratorios',
  seed: SUPERADMIN_LABORATORIOS_SEED,
});

export const superadminMuestrasApi = createResourceApi({
  path: '/superadmin/muestras',
  seed: SUPERADMIN_MUESTRAS_SEED,
});

export const superadminOfertasApi = createResourceApi({
  path: '/superadmin/ofertas',
  seed: SUPERADMIN_OFERTAS_SEED,
});

export const superadminPreofertasApi = createResourceApi({
  path: '/superadmin/preofertas',
  seed: SUPERADMIN_PREOFERTAS_SEED,
});

export const superadminTecnicosApi = createResourceApi({
  path: '/superadmin/tecnicos',
  seed: SUPERADMIN_TECNICOS_SEED,
});

export const superadminUsuariosApi = createResourceApi({
  path: '/superadmin/usuarios',
  seed: SUPERADMIN_USUARIOS_SEED,
});

export const superadminConfiguracionApi = createResourceApi({
  path: '/superadmin/configuracion',
  seed: SUPERADMIN_CONFIGURACION_SEED,
});
