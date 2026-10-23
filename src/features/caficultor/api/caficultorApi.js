import { createResourceApi } from '@/lib/createResourceApi';
import {
  INITIAL_CAFICULTOR_FINCAS,
  INITIAL_CAFICULTOR_LOTES,
  INITIAL_CAFICULTOR_PREOFERTAS,
  INITIAL_CAFICULTOR_OFERTAS,
} from '../data/caficultorData';

// ============================================
// Servicios API — features/caficultor
// ============================================
// Capa de servicios del rol caficultor. Solo conoce endpoints y datos;
// no sabe nada de React. Los hooks (../hooks) los envuelven con caché.
//
// `seed` son los datos mock usados en modo demo (sin backend). Al integrar
// la API real se eliminan los seeds y ../data/caficultorData.js.
// ============================================

export const fincasApi = createResourceApi({
  path: '/caficultor/fincas',
  seed: INITIAL_CAFICULTOR_FINCAS,
});

export const lotesApi = createResourceApi({
  path: '/caficultor/lotes',
  seed: INITIAL_CAFICULTOR_LOTES,
});

export const preofertasApi = createResourceApi({
  path: '/caficultor/pre-ofertas',
  seed: INITIAL_CAFICULTOR_PREOFERTAS,
});

export const ofertasApi = createResourceApi({
  path: '/caficultor/ofertas',
  seed: INITIAL_CAFICULTOR_OFERTAS,
});
