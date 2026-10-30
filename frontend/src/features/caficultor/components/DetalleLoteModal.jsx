import { X } from 'lucide-react';

export default function DetalleLoteModal({ isOpen, onClose, lote }) {
  if (!isOpen || !lote) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="font-bold text-stone-900 text-base">Detalle del Lote</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2.5 text-xs">
          <div className="flex justify-between">
            <span className="text-stone-500">Nombre del Lote:</span>
            <span className="font-bold text-stone-900">{lote.nombreLote}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Finca:</span>
            <span className="font-semibold text-stone-800">{lote.fincaNombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Especie:</span>
            <span className="font-semibold text-stone-800">{lote.especie}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Variedad de Café:</span>
            <span className="font-bold text-stone-900">{lote.variedad}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Número de Árboles:</span>
            <span className="font-mono font-bold text-stone-900">
              {lote.numeroArboles ? lote.numeroArboles.toLocaleString('es-CO') : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Distancia Árboles:</span>
            <span className="font-mono text-stone-800">{lote.distanciaArboles} m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Distancia Surcos:</span>
            <span className="font-mono text-stone-800">{lote.distanciaSurcos} m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Fertilizaciones al año:</span>
            <span className="font-mono text-stone-800">{lote.fertilizacionesAno} veces/año</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-black cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
