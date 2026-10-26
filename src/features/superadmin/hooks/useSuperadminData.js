import { useSuperAdmin } from '@/hooks/useSuperAdmin';
import { toQueryResult } from '@/hooks/contextAdapter';

export const useSuperadminStats = () => {
  const { stats, loading, error, refetch } = useSuperAdmin();
  return toQueryResult(stats, loading, error, refetch);
};

export const useSuperadminMetrics = () => {
  const { metrics, loading, error, refetch } = useSuperAdmin();
  return toQueryResult(metrics, loading, error, refetch);
};

export const useSuperadminActivity = () => {
  const { activity, loading, error, refetch } = useSuperAdmin();
  return toQueryResult(activity, loading, error, refetch);
};

export const useSuperadminModules = () => {
  const { modules, loading, error, refetch } = useSuperAdmin();
  return toQueryResult(modules, loading, error, refetch);
};
