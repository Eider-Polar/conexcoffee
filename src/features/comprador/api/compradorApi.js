import { createResourceApi } from '@/lib/createResourceApi';
import { MOCK_COMPRADOR_DESPACHOS } from '../data/mockData';

export const contenedoresCompradorApi = createResourceApi({
  path: '/comprador/contenedores',
  seed: MOCK_COMPRADOR_DESPACHOS,
});
