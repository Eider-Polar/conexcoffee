import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Globe, Activity, ArrowRight } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import StatKPI from '../components/StatKPI';
import ActivityItem from '../components/ActivityItem';
import ModuleCard from '../components/ModuleCard';
import MiniProgressBar from '../components/MiniProgressBar';
import { DASHBOARD_STATS, PLATFORM_METRICS, RECENT_ACTIVITY, QUICK_MODULES } from '../data/dashboardData';

const TABS = [
  { id: 'general',   label: 'Vista General', icon: BarChart3 },
  { id: 'modulos',   label: 'Módulos',       icon: Globe     },
  { id: 'actividad', label: 'Actividad',     icon: Activity  },
];

export default function SuperAdminDashboardPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');
  const displayName = user?.name || user?.nombres || 'Administrador';

  return (
    <div className="space-y-8">

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="h-5 w-5 text-[#AD2E01]" />
            <span className="text-xs font-semibold text-[#AD2E01] uppercase tracking-wider">Panel de Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900">Bienvenido, {displayName}</h1>
          <p className="text-surface-500 mt-1 text-sm">Resumen general de la plataforma ConexCoffee</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#FFF1ED] rounded-xl border border-[#AD2E01]/20 shrink-0">
          <div className="h-2 w-2 rounded-full bg-[#AD2E01] animate-pulse" />
          <span className="text-xs font-bold text-[#AD2E01] uppercase tracking-wider">Superadmin</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => <StatKPI key={stat.id} stat={stat} />)}
      </div>

      {/* Tabs */}
      <div className="border-b border-surface-200">
        <div className="flex gap-6">
          {TABS.map(({ id, label, icon: TabIcon }) => (
            <button
              key={id}
              id={`tab-superadmin-${id}`}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === id ? 'border-[#AD2E01] text-[#AD2E01]' : 'border-transparent text-surface-500 hover:text-surface-700'
              }`}
            >
              <TabIcon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Vista General */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-2xl border border-surface-200 p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="h-5 w-5 text-[#AD2E01]" />
              <h2 className="text-base font-bold text-surface-900">Indicadores</h2>
            </div>
            <div className="space-y-5">
              {PLATFORM_METRICS.map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-surface-600">{m.label}</span>
                    <span className="text-sm font-bold text-surface-900">{m.value} / {m.total}</span>
                  </div>
                  <MiniProgressBar value={m.value} total={m.total} color={m.color} />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-2xl border border-surface-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#AD2E01]" />
                <h2 className="text-base font-bold text-surface-900">Actividad Reciente</h2>
              </div>
              <span className="text-xs text-surface-400">Últimas 24 horas</span>
            </div>
            {RECENT_ACTIVITY.map((item) => <ActivityItem key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {/* Tab: Módulos */}
      {activeTab === 'modulos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {QUICK_MODULES.map((mod) => <ModuleCard key={mod.id} mod={mod} />)}
        </div>
      )}

      {/* Tab: Actividad */}
      {activeTab === 'actividad' && (
        <div className="bg-white rounded-2xl border border-surface-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-[#AD2E01]" />
            <h2 className="text-base font-bold text-surface-900">Registro de Actividad</h2>
          </div>
          {RECENT_ACTIVITY.map((item) => <ActivityItem key={item.id} item={item} />)}
          <div className="mt-4 flex justify-center">
            <button className="flex items-center gap-2 text-sm font-semibold text-[#AD2E01] hover:text-[#F25433] transition-colors cursor-pointer">
              <span>Ver historial completo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Accesos rápidos */}
      <div className="bg-white rounded-2xl border border-surface-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="h-5 w-5 text-[#AD2E01]" />
          <h2 className="text-base font-bold text-surface-900">Accesos Rápidos</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_MODULES.slice(0, 6).map((mod) => {
            const Icon = mod.icon;
            return (
              <Link key={mod.id} to={mod.path} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-200 hover:border-[#AD2E01]/40 hover:bg-[#FFF1ED] transition-all duration-200 group text-center">
                <div className="p-2.5 bg-surface-100 group-hover:bg-[#AD2E01] rounded-xl transition-colors duration-200">
                  <Icon className="h-5 w-5 text-surface-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <span className="text-xs font-semibold text-surface-600 group-hover:text-[#AD2E01] transition-colors">{mod.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
