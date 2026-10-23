import { createResourceHooks } from '@/hooks/createResourceHooks';
import { visitasTecnicasApi } from '../api/tecnicoApi';

const visitas = createResourceHooks('tecnico-visitas', visitasTecnicasApi);
export const useVisitasTecnicas = visitas.useList;
