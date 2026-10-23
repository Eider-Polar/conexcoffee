import { createResourceApi } from '@/lib/createResourceApi';
import {
  DASHBOARD_STATS,
  PLATFORM_METRICS,
  RECENT_ACTIVITY,
  QUICK_MODULES,
} from '../data/dashboardData';

export const superadminStatsApi = createResourceApi({
  path: '/superadmin/stats',
  seed: DASHBOARD_STATS,
});

export const superadminMetricsApi = createResourceApi({
  path: '/superadmin/metrics',
  seed: PLATFORM_METRICS,
});

export const superadminActivityApi = createResourceApi({
  path: '/superadmin/activity',
  seed: RECENT_ACTIVITY,
});

export const superadminModulesApi = createResourceApi({
  path: '/superadmin/modules',
  seed: QUICK_MODULES,
});
