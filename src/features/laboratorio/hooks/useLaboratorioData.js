import { createResourceHooks } from '@/hooks/createResourceHooks';
import {
  muestrasResumenApi,
  catadoresApi,
  analisisFisicosApi,
  analisisSensorialesApi,
  hojasCatacionApi,
  muestrasApi,
  resultadosApi,
} from '../api/laboratorioApi';

const muestrasResumen = createResourceHooks('laboratorio-muestras-resumen', muestrasResumenApi);
export const useMuestrasResumen = muestrasResumen.useList;

const catadores = createResourceHooks('laboratorio-catadores', catadoresApi, {
  labels: {
    created: 'Catador registrado exitosamente',
    updated: 'Catador actualizado exitosamente',
    removed: 'Catador eliminado exitosamente',
  },
});
export const useCatadores = catadores.useList;
export const useCrearCatador = catadores.useCreate;
export const useActualizarCatador = catadores.useUpdate;
export const useEliminarCatador = catadores.useRemove;

const analisisFisicos = createResourceHooks('laboratorio-analisis-fisicos', analisisFisicosApi, {
  labels: {
    created: 'Análisis físico registrado',
    updated: 'Análisis físico actualizado',
  },
});
export const useAnalisisFisicos = analisisFisicos.useList;
export const useCrearAnalisisFisico = analisisFisicos.useCreate;
export const useActualizarAnalisisFisico = analisisFisicos.useUpdate;

const analisisSensoriales = createResourceHooks('laboratorio-analisis-sensoriales', analisisSensorialesApi, {
  labels: {
    created: 'Análisis sensorial registrado',
    updated: 'Análisis sensorial actualizado',
  },
});
export const useAnalisisSensoriales = analisisSensoriales.useList;
export const useCrearAnalisisSensorial = analisisSensoriales.useCreate;
export const useActualizarAnalisisSensorial = analisisSensoriales.useUpdate;

const hojasCatacion = createResourceHooks('laboratorio-hojas-catacion', hojasCatacionApi);
export const useHojasCatacion = hojasCatacion.useList;

const muestras = createResourceHooks('laboratorio-muestras', muestrasApi, {
  labels: {
    created: 'Muestra registrada exitosamente',
    updated: 'Muestra actualizada exitosamente',
  },
});
export const useMuestras = muestras.useList;
export const useCrearMuestra = muestras.useCreate;
export const useActualizarMuestra = muestras.useUpdate;

const resultados = createResourceHooks('laboratorio-resultados', resultadosApi);
export const useResultados = resultados.useList;
