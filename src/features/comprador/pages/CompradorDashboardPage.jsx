import { Card } from '@/components/ui';
import { StatCard } from '@/components/data-display';
import { ShoppingCart, Package, CreditCard, Star } from 'lucide-react';

export default function CompradorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Panel del Comprador</h1>
        <p className="text-surface-500 mt-1">Gestiona tus pedidos y compras de café</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pedidos Activos" value="5" icon={ShoppingCart} trend="+2" trendUp={true} />
        <StatCard title="Total Comprado" value="$28,900" icon={CreditCard} trend="+8.7%" trendUp={true} />
        <StatCard title="Entregas Pendientes" value="3" icon={Package} trend="-1" trendUp={true} />
        <StatCard title="Calificación" value="4.8" icon={Star} trend="+0.2" trendUp={true} />
      </div>
      <Card>
        <h2 className="text-lg font-semibold text-surface-900 mb-4">Mis Pedidos</h2>
        <p className="text-surface-500">Aquí se mostrarán los pedidos y compras recientes.</p>
      </Card>
    </div>
  );
}
