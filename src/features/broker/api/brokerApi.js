import { createResourceApi } from '@/lib/createResourceApi';
import { NEGOCIACIONES_RECIENTES } from '../data/brokerData';

export const negociacionesApi = createResourceApi({
  path: '/broker/negociaciones',
  seed: NEGOCIACIONES_RECIENTES,
});
