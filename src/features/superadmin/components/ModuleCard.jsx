import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Tarjeta de acceso rápido a un módulo (usada en el dashboard overview)
export default function ModuleCard({ mod }) {
  const Icon = mod.icon;
  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-3 bg-[#FFF1ED] rounded-xl shrink-0 group-hover:bg-[#AD2E01] transition-colors duration-200">
          <Icon className="h-5 w-5 text-[#AD2E01] group-hover:text-white transition-colors duration-200" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-surface-900">{mod.title}</h3>
          <p className="text-xs text-surface-500 mt-0.5">{mod.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 py-2 border-y border-surface-100">
        {mod.stats.map((s) => (
          <div key={s.label} className="text-center flex-1">
            <p className="text-lg font-extrabold text-surface-900 tabular-nums">{s.value}</p>
            <p className="text-xs text-surface-500">{s.label}</p>
          </div>
        ))}
      </div>
      <Link to={mod.path} className="flex items-center justify-between text-xs font-semibold text-[#AD2E01] hover:text-[#F25433] transition-colors">
        <span>Gestionar</span>
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
}
