import { X } from 'lucide-react';

export default function DetalleFincaModal({ isOpen, onClose, finca }) {
  if (!isOpen || !finca) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="font-bold text-stone-900 text-base">Detalle de la Finca</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-stone-500">Nombre:</span>
            <span className="font-bold text-stone-900">{finca.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Ubicación:</span>
            <span className="font-semibold text-stone-800">
              {finca.vereda}, {finca.municipio} ({finca.departamento})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Altura:</span>
            <span className="font-mono font-bold text-stone-900">{finca.altura} msnm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Área de Café:</span>
            <span className="font-semibold text-stone-800">{finca.areaCafe} ha</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Otros Cultivos:</span>
            <span className="font-semibold text-stone-800">{finca.areaOtrosCultivos || 0} ha</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Conservación:</span>
            <span className="font-semibold text-stone-800">{finca.areaConservacion || 0} ha</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Asociación:</span>
            <span className="font-semibold text-stone-900">{finca.asociacion || 'Independiente'}</span>
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
