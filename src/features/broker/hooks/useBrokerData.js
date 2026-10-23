import { createResourceHooks } from '@/hooks/createResourceHooks';
import { negociacionesApi } from '../api/brokerApi';

const negociaciones = createResourceHooks('broker-negociaciones', negociacionesApi);
export const useNegociaciones = negociaciones.useList;
