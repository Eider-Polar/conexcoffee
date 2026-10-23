import { createResourceApi } from '@/lib/createResourceApi';
import { PROXIMAS_VISITAS_TECNICAS } from '../data/tecnicoData';

export const visitasTecnicasApi = createResourceApi({
  path: '/tecnico/visitas',
  seed: PROXIMAS_VISITAS_TECNICAS,
});
