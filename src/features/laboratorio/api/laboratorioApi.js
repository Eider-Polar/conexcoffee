import { createResourceApi } from '@/lib/createResourceApi';
import {
  MUESTRAS_LABORATORIO_RESUMEN,
  CATADORES_DATA,
  ANALISIS_FISICOS_DATA,
  ANALISIS_SENSORIALES_DATA,
  HOJAS_CATACION_DATA,
  MUESTRAS_DATA,
  RESULTADOS_LABORATORIO_DATA,
} from '../data/laboratorioData';

export const muestrasResumenApi = createResourceApi({
  path: '/laboratorio/muestras-resumen',
  seed: MUESTRAS_LABORATORIO_RESUMEN,
});

export const catadoresApi = createResourceApi({
  path: '/laboratorio/catadores',
  seed: CATADORES_DATA,
});

export const analisisFisicosApi = createResourceApi({
  path: '/laboratorio/analisis-fisicos',
  seed: ANALISIS_FISICOS_DATA,
});

export const analisisSensorialesApi = createResourceApi({
  path: '/laboratorio/analisis-sensoriales',
  seed: ANALISIS_SENSORIALES_DATA,
});

export const hojasCatacionApi = createResourceApi({
  path: '/laboratorio/hojas-catacion',
  seed: HOJAS_CATACION_DATA,
});

export const muestrasApi = createResourceApi({
  path: '/laboratorio/muestras',
  seed: MUESTRAS_DATA,
});

export const resultadosApi = createResourceApi({
  path: '/laboratorio/resultados',
  seed: RESULTADOS_LABORATORIO_DATA,
});
