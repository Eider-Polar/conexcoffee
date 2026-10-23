import { TrendingUp, TrendingDown } from 'lucide-react';

// Tarjeta KPI para el dashboard del SuperAdmin
export default function StatKPI({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">{stat.label}</p>
          <p className="text-3xl font-extrabold text-surface-900 mt-1 tabular-nums">{stat.value}</p>
          <div className="flex items-center gap-1 mt-2">
            {stat.up
              ? <TrendingUp className="h-3.5 w-3.5 text-brand-terracota" />
              : <TrendingDown className="h-3.5 w-3.5 text-danger-500" />
            }
            <span className={`text-xs font-semibold ${stat.up ? 'text-brand-terracota' : 'text-danger-500'}`}>
              {stat.change} este mes
            </span>
          </div>
        </div>
        <div className="p-3 rounded-2xl shrink-0" style={{ backgroundColor: stat.bg }}>
          <Icon className="h-6 w-6" style={{ color: stat.color }} />
        </div>
      </div>
    </div>
  );
}
