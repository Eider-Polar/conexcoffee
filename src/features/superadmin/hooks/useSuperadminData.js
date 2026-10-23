import { createResourceHooks } from '@/hooks/createResourceHooks';
import {
  superadminStatsApi,
  superadminMetricsApi,
  superadminActivityApi,
  superadminModulesApi,
} from '../api/superadminApi';

const stats = createResourceHooks('superadmin-stats', superadminStatsApi);
export const useSuperadminStats = stats.useList;

const metrics = createResourceHooks('superadmin-metrics', superadminMetricsApi);
export const useSuperadminMetrics = metrics.useList;

const activity = createResourceHooks('superadmin-activity', superadminActivityApi);
export const useSuperadminActivity = activity.useList;

const modules = createResourceHooks('superadmin-modules', superadminModulesApi);
export const useSuperadminModules = modules.useList;
