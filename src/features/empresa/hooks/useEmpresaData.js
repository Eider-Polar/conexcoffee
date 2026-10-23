import { createResourceHooks } from '@/hooks/createResourceHooks';
import {
  empresaKpisApi,
  empresaActividadApi,
  empresaBrokersApi,
  empresaCaficultoresApi,
  empresaContenedoresApi,
  empresaLaboratoriosApi,
  empresaMuestrasApi,
  empresaPreofertasApi,
  empresaOfertasApi,
  empresaTecnicosApi,
  empresaOfertasLibresApi,
} from '../api/empresaApi';

const kpis = createResourceHooks('empresa-kpis', empresaKpisApi);
export const useEmpresaKpis = kpis.useList;

const actividad = createResourceHooks('empresa-actividad', empresaActividadApi);
export const useEmpresaActividad = actividad.useList;

const brokers = createResourceHooks('empresa-brokers', empresaBrokersApi, {
  labels: { created: 'Broker registrado', updated: 'Broker actualizado' },
});
export const useEmpresaBrokers = brokers.useList;
export const useCrearEmpresaBroker = brokers.useCreate;
export const useActualizarEmpresaBroker = brokers.useUpdate;

const caficultores = createResourceHooks('empresa-caficultores', empresaCaficultoresApi, {
  labels: { created: 'Caficultor registrado', updated: 'Caficultor actualizado' },
});
export const useEmpresaCaficultores = caficultores.useList;
export const useCrearEmpresaCaficultor = caficultores.useCreate;
export const useActualizarEmpresaCaficultor = caficultores.useUpdate;

const contenedores = createResourceHooks('empresa-contenedores', empresaContenedoresApi, {
  labels: { created: 'Contenedor registrado', updated: 'Contenedor actualizado' },
});
export const useEmpresaContenedores = contenedores.useList;
export const useCrearEmpresaContenedor = contenedores.useCreate;
export const useActualizarEmpresaContenedor = contenedores.useUpdate;

const laboratorios = createResourceHooks('empresa-laboratorios', empresaLaboratoriosApi, {
  labels: { created: 'Laboratorio registrado', updated: 'Laboratorio actualizado' },
});
export const useEmpresaLaboratorios = laboratorios.useList;
export const useCrearEmpresaLaboratorio = laboratorios.useCreate;
export const useActualizarEmpresaLaboratorio = laboratorios.useUpdate;

const muestras = createResourceHooks('empresa-muestras', empresaMuestrasApi, {
  labels: { created: 'Muestra registrada', updated: 'Muestra actualizada' },
});
export const useEmpresaMuestras = muestras.useList;
export const useCrearEmpresaMuestra = muestras.useCreate;
export const useActualizarEmpresaMuestra = muestras.useUpdate;

const preofertas = createResourceHooks('empresa-preofertas', empresaPreofertasApi, {
  labels: { created: 'Pre-oferta registrada', updated: 'Pre-oferta actualizada' },
});
export const useEmpresaPreofertas = preofertas.useList;
export const useCrearEmpresaPreoferta = preofertas.useCreate;
export const useActualizarEmpresaPreoferta = preofertas.useUpdate;

const ofertas = createResourceHooks('empresa-ofertas', empresaOfertasApi, {
  labels: { created: 'Oferta registrada', updated: 'Oferta actualizada' },
});
export const useEmpresaOfertas = ofertas.useList;
export const useCrearEmpresaOferta = ofertas.useCreate;
export const useActualizarEmpresaOferta = ofertas.useUpdate;

const tecnicos = createResourceHooks('empresa-tecnicos', empresaTecnicosApi, {
  labels: { created: 'Técnico registrado', updated: 'Técnico actualizado' },
});
export const useEmpresaTecnicos = tecnicos.useList;
export const useCrearEmpresaTecnico = tecnicos.useCreate;
export const useActualizarEmpresaTecnico = tecnicos.useUpdate;

const ofertasLibres = createResourceHooks('empresa-ofertas-libres', empresaOfertasLibresApi, {
  labels: { created: 'Oferta libre registrada', updated: 'Oferta libre actualizada' },
});
export const useEmpresaOfertasLibres = ofertasLibres.useList;
export const useCrearEmpresaOfertaLibre = ofertasLibres.useCreate;
export const useActualizarEmpresaOfertaLibre = ofertasLibres.useUpdate;
