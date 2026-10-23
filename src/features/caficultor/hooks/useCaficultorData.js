import { createResourceHooks } from '@/hooks/createResourceHooks';
import { fincasApi, lotesApi, preofertasApi, ofertasApi } from '../api/caficultorApi';

// ============================================
// Hooks de datos — features/caficultor
// ============================================
// Las pages consumen SOLO estos hooks (nunca los servicios ni axios).
//
//   const { data: fincas = [], isLoading, isError } = useFincas();
//   const crearFinca = useCrearFinca();  crearFinca.mutate(finca);
// ============================================

const fincas = createResourceHooks('caficultor-fincas', fincasApi, {
  labels: {
    created: 'Finca registrada correctamente',
    updated: 'Finca actualizada correctamente',
  },
});
export const useFincas = fincas.useList;
export const useCrearFinca = fincas.useCreate;
export const useActualizarFinca = fincas.useUpdate;

const lotes = createResourceHooks('caficultor-lotes', lotesApi, {
  labels: {
    created: 'Lote registrado correctamente',
    updated: 'Lote actualizado correctamente',
  },
});
export const useLotes = lotes.useList;
export const useCrearLote = lotes.useCreate;
export const useActualizarLote = lotes.useUpdate;

const preofertas = createResourceHooks('caficultor-preofertas', preofertasApi, {
  labels: {
    created: 'Pre-oferta registrada correctamente',
    updated: 'Pre-oferta actualizada correctamente',
  },
});
export const usePreofertas = preofertas.useList;
export const useCrearPreoferta = preofertas.useCreate;
export const useActualizarPreoferta = preofertas.useUpdate;

const ofertas = createResourceHooks('caficultor-ofertas', ofertasApi);
export const useOfertas = ofertas.useList;
