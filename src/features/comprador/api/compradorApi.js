import { createResourceApi } from '@/lib/createResourceApi';
import { MOCK_CONTENEDORES } from '../data/mockData';

export const contenedoresCompradorApi = createResourceApi({
  path: '/comprador/contenedores',
  seed: MOCK_CONTENEDORES,
});
