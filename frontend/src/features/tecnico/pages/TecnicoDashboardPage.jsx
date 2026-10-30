import { Card } from '@/components/ui';
import { StatCard } from '@/components/data-display';
import { MapPin, ClipboardList, CheckCircle2, ShieldAlert, Calendar, UserCheck } from 'lucide-react';
import { VisitasTecnicasList } from '../components';

export default function TecnicoDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Panel Técnico / Asistencia Técnica</h1>
        <p className="text-surface-500 mt-1">
          Acompañamiento agronómico en campo, verificación de fincas cafetaleras y buenas prácticas agrícolas (BPA)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Fincas Asignadas" value="32" icon={MapPin} trend="+2 nuevas" trendUp={true} />
        <StatCard title="Visitas Realizadas" value="64" icon={ClipboardList} trend="+15% mes" trendUp={true} />
        <StatCard title="Auditorías BPA Aprobadas" value="92%" icon={CheckCircle2} trend="+4%" trendUp={true} />
        <StatCard title="Alertas en Campo" value="1" icon={ShieldAlert} trend="Bajo control" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900">Próximas Visitas Técnicas</h2>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Programadas
            </span>
          </div>
          <VisitasTecnicasList />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-surface-900 mb-3">Protocolos Técnicos</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2 text-surface-600">
              <UserCheck className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Verificación de beneficiaderos y tolvas ecológicas</span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Revisión de secado en marquesinas parabólicas</span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <MapPin className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Georreferenciación y polígonos de fincas</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
