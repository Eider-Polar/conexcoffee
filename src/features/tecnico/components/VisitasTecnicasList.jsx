import { PROXIMAS_VISITAS_TECNICAS } from '../data/tecnicoData';

export default function VisitasTecnicasList() {
  return (
    <div className="space-y-3">
      {PROXIMAS_VISITAS_TECNICAS.map((v) => (
        <div key={v.id} className="p-4 rounded-lg border border-surface-200 bg-surface-50 hover:bg-surface-100/70 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                {v.id}
              </span>
              <h3 className="font-semibold text-surface-900 mt-1">{v.finca}</h3>
              <p className="text-xs text-surface-500">{v.caficultor} • {v.municipio}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-semibold text-surface-800 bg-white border border-surface-200 px-2.5 py-1 rounded-md shadow-xs inline-block">
                {v.fecha}
              </span>
              <p className="text-xs text-surface-600 mt-1">{v.motivo}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
