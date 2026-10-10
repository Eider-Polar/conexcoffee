import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';
import { StatCard } from '@/components/data-display';
import { Coffee, Award, Star, Sparkles, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { CatacionesList } from '../components';

export default function CatadorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Panel de Catación de Café</h1>
          <p className="text-surface-500 mt-1">
            Evaluación sensorial bajo protocolo SCA, perfiles de taza y puntuación de lotes de especialidad
          </p>
        </div>
        <Link
          to="/catador/evaluacion"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <ClipboardCheck className="w-4 h-4" />
          Módulo de Evaluación
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Muestras por Catar" value="9" icon={Coffee} trend="+2 hoy" trendUp={true} />
        <StatCard title="Puntaje Promedio SCA" value="86.8 pts" icon={Award} trend="+0.6" trendUp={true} />
        <StatCard title="Sesiones Realizadas" value="48" icon={Star} trend="+8 este mes" trendUp={true} />
        <StatCard title="Lotes Especiales (>86)" value="21" icon={Sparkles} trend="Excelente calidad" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900">Últimas Fichas Sensoriales (SCA)</h2>
            <Link
              to="/catador/evaluacion"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
            >
              Ver evaluaciones
            </Link>
          </div>
          <CatacionesList />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-surface-900 mb-3">Protocolo de Catación</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Ratio: 8.25g por cada 150ml de agua a 93°C</span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Tueste muestra: Agtron Gourmet 58-63</span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Evaluación de 5 tazas por muestra SCA</span>
            </div>
            <div className="flex items-start gap-2 text-surface-600">
              <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
              <span>Rueda de sabores World Coffee Research</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
