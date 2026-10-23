import { createResourceApi } from '@/lib/createResourceApi';
import { CATACIONES_RECIENTES } from '../data/catadorData';
import { EVALUACIONES_PENDIENTES } from '../data/evaluacionData';

export const catacionesApi = createResourceApi({
  path: '/catador/cataciones',
  seed: CATACIONES_RECIENTES,
});

export const evaluacionesApi = createResourceApi({
  path: '/catador/evaluaciones',
  seed: EVALUACIONES_PENDIENTES,
});
