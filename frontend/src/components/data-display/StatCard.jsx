import { Card } from '@/components/ui';

// ============================================
// StatCard — Tarjeta de estadísticas
// ============================================
// Para dashboards: muestra un valor con título, ícono y tendencia.
//
// Uso:
//   <StatCard
//     title="Total Ventas"
//     value="$12,450"
//     icon={DollarSign}
//     trend="+12.5%"
//     trendUp={true}
//   />
// ============================================

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className = '',
}) {
  return (
    <Card hover className={className}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-surface-500">{title}</p>
          <p className="text-2xl font-bold text-surface-900 mt-1">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 font-medium ${
                trendUp ? 'text-brand-terracota' : 'text-danger-600'
              }`}
            >
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-primary-50 rounded-xl">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        )}
      </div>
    </Card>
  );
}
