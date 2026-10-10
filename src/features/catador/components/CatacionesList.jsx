import { Award } from 'lucide-react';
import { CATACIONES_RECIENTES } from '../data/catadorData';

export default function CatacionesList() {
  return (
    <div className="space-y-3">
      {CATACIONES_RECIENTES.map((c) => (
        <div key={c.id} className="p-4 rounded-lg border border-surface-200 bg-surface-50 hover:bg-surface-100/70 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-surface-600 bg-surface-200/80 px-2 py-0.5 rounded">
                  {c.id}
                </span>
                <h3 className="font-semibold text-surface-900">{c.lote}</h3>
              </div>
              <p className="text-xs text-surface-500 mt-0.5">{c.caficultor}</p>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-surface-600">
                <span className="bg-white border border-surface-200 px-2 py-0.5 rounded">
                  <strong>Fragancia:</strong> {c.fragancia}
                </span>
                <span className="bg-white border border-surface-200 px-2 py-0.5 rounded">
                  <strong>Acidez:</strong> {c.acidez}
                </span>
                <span className="bg-white border border-surface-200 px-2 py-0.5 rounded">
                  <strong>Cuerpo:</strong> {c.cuerpo}
                </span>
              </div>
            </div>
            <div className="sm:text-right shrink-0">
              <div className="inline-flex items-center gap-1 bg-primary-50 border border-primary-200 text-primary-700 px-3 py-1.5 rounded-lg font-bold text-lg">
                <Award className="w-5 h-5 text-primary-600" />
                {c.puntaje}
              </div>
              <p className="text-[11px] text-surface-500 mt-1">Puntos SCA</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
