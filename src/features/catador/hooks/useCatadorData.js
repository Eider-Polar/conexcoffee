import { createResourceHooks } from '@/hooks/createResourceHooks';
import { catacionesApi, evaluacionesApi } from '../api/catadorApi';

const cataciones = createResourceHooks('catador-cataciones', catacionesApi);
export const useCataciones = cataciones.useList;

const evaluaciones = createResourceHooks('catador-evaluaciones', evaluacionesApi, {
  labels: {
    created: 'Evaluación registrada',
    updated: 'Evaluación actualizada',
  },
});
export const useEvaluaciones = evaluaciones.useList;
export const useActualizarEvaluacion = evaluaciones.useUpdate;
