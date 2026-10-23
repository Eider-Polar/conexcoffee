import { createResourceApi } from '@/lib/createResourceApi';
import {
  EMPRESA_KPIS,
  EMPRESA_ACTIVIDAD_RECIENTE,
  INITIAL_EMPRESA_BROKERS,
  INITIAL_EMPRESA_CAFICULTORES,
  INITIAL_EMPRESA_CONTENEDORES,
  INITIAL_EMPRESA_LABORATORIOS,
  INITIAL_EMPRESA_MUESTRAS,
  INITIAL_EMPRESA_PREOFERTAS,
  INITIAL_EMPRESA_OFERTAS,
  INITIAL_EMPRESA_TECNICOS,
  INITIAL_EMPRESA_OFERTAS_LIBRES,
} from '../data/empresaData';

export const empresaKpisApi = createResourceApi({
  path: '/empresa/kpis',
  seed: EMPRESA_KPIS,
});

export const empresaActividadApi = createResourceApi({
  path: '/empresa/actividad',
  seed: EMPRESA_ACTIVIDAD_RECIENTE,
});

export const empresaBrokersApi = createResourceApi({
  path: '/empresa/brokers',
  seed: INITIAL_EMPRESA_BROKERS,
});

export const empresaCaficultoresApi = createResourceApi({
  path: '/empresa/caficultores',
  seed: INITIAL_EMPRESA_CAFICULTORES,
});

export const empresaContenedoresApi = createResourceApi({
  path: '/empresa/contenedores',
  seed: INITIAL_EMPRESA_CONTENEDORES,
});

export const empresaLaboratoriosApi = createResourceApi({
  path: '/empresa/laboratorios',
  seed: INITIAL_EMPRESA_LABORATORIOS,
});

export const empresaMuestrasApi = createResourceApi({
  path: '/empresa/muestras',
  seed: INITIAL_EMPRESA_MUESTRAS,
});

export const empresaPreofertasApi = createResourceApi({
  path: '/empresa/pre-ofertas',
  seed: INITIAL_EMPRESA_PREOFERTAS,
});

export const empresaOfertasApi = createResourceApi({
  path: '/empresa/ofertas',
  seed: INITIAL_EMPRESA_OFERTAS,
});

export const empresaTecnicosApi = createResourceApi({
  path: '/empresa/tecnicos',
  seed: INITIAL_EMPRESA_TECNICOS,
});

export const empresaOfertasLibresApi = createResourceApi({
  path: '/empresa/ofertas-libres',
  seed: INITIAL_EMPRESA_OFERTAS_LIBRES,
});
