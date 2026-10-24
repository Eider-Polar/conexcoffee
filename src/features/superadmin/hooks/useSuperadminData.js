import { createResourceHooks } from '@/hooks/createResourceHooks';
import {
  superadminStatsApi,
  superadminMetricsApi,
  superadminActivityApi,
  superadminModulesApi,
  superadminBrokersApi,
  superadminCaficultoresApi,
  superadminCatadoresApi,
  superadminCompradoresApi,
  superadminPedidosApi,
  superadminContenedoresApi,
  superadminEmpresasApi,
  superadminFincasApi,
  superadminLotesApi,
  superadminLaboratoriosApi,
  superadminMuestrasApi,
  superadminOfertasApi,
  superadminPreofertasApi,
  superadminTecnicosApi,
  superadminUsuariosApi,
  superadminConfiguracionApi,
} from '../api/superadminApi';

const stats = createResourceHooks('superadmin-stats', superadminStatsApi);
export const useSuperadminStats = stats.useList;

const metrics = createResourceHooks('superadmin-metrics', superadminMetricsApi);
export const useSuperadminMetrics = metrics.useList;

const activity = createResourceHooks('superadmin-activity', superadminActivityApi);
export const useSuperadminActivity = activity.useList;

const modules = createResourceHooks('superadmin-modules', superadminModulesApi);
export const useSuperadminModules = modules.useList;

const brokers = createResourceHooks('superadmin-brokers', superadminBrokersApi);
export const useSuperadminBrokers = brokers.useList;
export const useCrearSuperadminBroker = brokers.useCreate;
export const useActualizarSuperadminBroker = brokers.useUpdate;

const caficultores = createResourceHooks('superadmin-caficultores', superadminCaficultoresApi);
export const useSuperadminCaficultores = caficultores.useList;
export const useCrearSuperadminCaficultor = caficultores.useCreate;
export const useActualizarSuperadminCaficultor = caficultores.useUpdate;

const catadores = createResourceHooks('superadmin-catadores', superadminCatadoresApi);
export const useSuperadminCatadores = catadores.useList;
export const useCrearSuperadminCatador = catadores.useCreate;
export const useActualizarSuperadminCatador = catadores.useUpdate;

const compradores = createResourceHooks('superadmin-compradores', superadminCompradoresApi);
export const useSuperadminCompradores = compradores.useList;
export const useCrearSuperadminComprador = compradores.useCreate;
export const useActualizarSuperadminComprador = compradores.useUpdate;

const pedidos = createResourceHooks('superadmin-pedidos', superadminPedidosApi);
export const useSuperadminPedidos = pedidos.useList;

const contenedores = createResourceHooks('superadmin-contenedores', superadminContenedoresApi);
export const useSuperadminContenedores = contenedores.useList;
export const useCrearSuperadminContenedor = contenedores.useCreate;
export const useActualizarSuperadminContenedor = contenedores.useUpdate;

const empresas = createResourceHooks('superadmin-empresas', superadminEmpresasApi);
export const useSuperadminEmpresas = empresas.useList;
export const useCrearSuperadminEmpresa = empresas.useCreate;
export const useActualizarSuperadminEmpresa = empresas.useUpdate;

const fincas = createResourceHooks('superadmin-fincas', superadminFincasApi);
export const useSuperadminFincas = fincas.useList;
export const useCrearSuperadminFinca = fincas.useCreate;
export const useActualizarSuperadminFinca = fincas.useUpdate;

const lotes = createResourceHooks('superadmin-lotes', superadminLotesApi);
export const useSuperadminLotes = lotes.useList;
export const useCrearSuperadminLote = lotes.useCreate;
export const useActualizarSuperadminLote = lotes.useUpdate;

const laboratorios = createResourceHooks('superadmin-laboratorios', superadminLaboratoriosApi);
export const useSuperadminLaboratorios = laboratorios.useList;
export const useCrearSuperadminLaboratorio = laboratorios.useCreate;
export const useActualizarSuperadminLaboratorio = laboratorios.useUpdate;

const muestras = createResourceHooks('superadmin-muestras', superadminMuestrasApi);
export const useSuperadminMuestras = muestras.useList;
export const useCrearSuperadminMuestra = muestras.useCreate;
export const useActualizarSuperadminMuestra = muestras.useUpdate;

const ofertas = createResourceHooks('superadmin-ofertas', superadminOfertasApi);
export const useSuperadminOfertas = ofertas.useList;

const preofertas = createResourceHooks('superadmin-preofertas', superadminPreofertasApi);
export const useSuperadminPreofertas = preofertas.useList;

const tecnicos = createResourceHooks('superadmin-tecnicos', superadminTecnicosApi);
export const useSuperadminTecnicos = tecnicos.useList;
export const useCrearSuperadminTecnico = tecnicos.useCreate;
export const useActualizarSuperadminTecnico = tecnicos.useUpdate;

const usuarios = createResourceHooks('superadmin-usuarios', superadminUsuariosApi);
export const useSuperadminUsuarios = usuarios.useList;
export const useCrearSuperadminUsuario = usuarios.useCreate;
export const useActualizarSuperadminUsuario = usuarios.useUpdate;

const configuracion = createResourceHooks('superadmin-configuracion', superadminConfiguracionApi);
export const useSuperadminConfiguracion = configuracion.useList;
