import { Card } from '@/components/ui';
import { StatCard } from '@/components/data-display';
import { Handshake, DollarSign, Users, Clock } from 'lucide-react';
import { NegociacionesTable } from '../components';

export default function BrokerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Panel del Broker</h1>
        <p className="text-surface-500 mt-1">Gestiona acuerdos comerciales, contratos de exportación y comisiones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Negociaciones Activas" value="23" icon={Handshake} trend="+4" trendUp={true} />
        <StatCard title="Comisiones del Mes" value="$8,750" icon={DollarSign} trend="+15.2%" trendUp={true} />
        <StatCard title="Clientes Conectados" value="42" icon={Users} trend="+6" trendUp={true} />
        <StatCard title="Pendientes" value="7" icon={Clock} trend="-2" trendUp={true} />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Negociaciones y Contratos en Curso</h2>
          <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
            Exportación Internacional
          </span>
        </div>
        <NegociacionesTable />
      </Card>
    </div>
  );
}
