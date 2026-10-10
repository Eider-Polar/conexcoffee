import { Card } from '@/components/ui';
import { StatCard } from '@/components/data-display';
import { Leaf, DollarSign, BarChart3, Sun } from 'lucide-react';
import { LotesCaficultorTable } from '../components';

export default function CaficultorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Panel del Caficultor</h1>
        <p className="text-surface-500 mt-1">Gestiona tus fincas, lotes y producción de café pergamino seco</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Lotes Activos"    value="8"       icon={Leaf}       trend="+2"     trendUp={true} />
        <StatCard title="Ingresos del Mes" value="$12,300" icon={DollarSign} trend="+22.5%" trendUp={true} />
        <StatCard title="Producción (kg)"  value="2,450"   icon={BarChart3}  trend="+180"   trendUp={true} />
        <StatCard title="Calidad Promedio" value="86 pts"  icon={Sun}        trend="+2"     trendUp={true} />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Mis Lotes de Café Verde Pergamino</h2>
          <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
            Cosecha Actual
          </span>
        </div>
        <LotesCaficultorTable />
      </Card>
    </div>
  );
}
