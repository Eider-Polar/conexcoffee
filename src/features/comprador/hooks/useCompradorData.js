import { useMemo } from 'react';
import { createResourceHooks } from '@/hooks/createResourceHooks';
import { contenedoresCompradorApi } from '../api/compradorApi';

const contenedores = createResourceHooks('comprador-contenedores', contenedoresCompradorApi);
export const useContenedoresComprador = contenedores.useList;
export const useDetalleContenedorComprador = contenedores.useDetail;

export function usePaisesDisponibles(contenedores = []) {
  return useMemo(() => {
    return [...new Set(contenedores.map((c) => c.paisDestino).filter(Boolean))];
  }, [contenedores]);
}
