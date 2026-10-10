import { Card } from '@/components/ui';
import { StatCard } from '@/components/data-display';
import { FlaskConical, ClipboardCheck, Activity, Award, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { MuestrasLaboratorioTable } from '../components';

export default function LaboratorioDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Panel de Laboratorio</h1>
        <p className="text-surface-500 mt-1">
          Análisis físico-químico, control de humedad, merma y certificación de calidad de café verde
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Muestras Pendientes" value="14" icon={FlaskConical} trend="+3 hoy" trendUp={true} />
        <StatCard title="Análisis Completados" value="128" icon={ClipboardCheck} trend="+12% mes" trendUp={true} />
        <StatCard title="Humedad Promedio" value="11.2%" icon={Activity} trend="Rango óptimo" trendUp={true} />
        <StatCard title="Certificados Emitidos" value="95" icon={Award} trend="+8 este mes" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900">Muestras Físicas Recientes</h2>
            <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
              Café Pergamino Seco
            </span>
          </div>
          <MuestrasLaboratorioTable />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-surface-900 mb-3">Parámetros de Calidad</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Humedad óptima internacional: <strong>10.0% – 12.0%</strong></span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Factor de rendimiento base: <strong>88 - 94 kg</strong></span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Actividad de agua (aW): <strong>&lt; 0.60</strong></span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <FileSpreadsheet className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Emisión de informes con validación criptográfica</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
