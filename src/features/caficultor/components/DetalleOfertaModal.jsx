import { X, Award } from 'lucide-react';

export default function DetalleOfertaModal({ isOpen, onClose, oferta }) {
  if (!isOpen || !oferta) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              {oferta.codigo}
            </span>
            <h3 className="font-bold text-stone-900 text-base mt-1">
              Detalle de la Oferta
            </h3>
          </div>
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
            <span className="text-stone-500">Finca Origen:</span>
            <span className="font-bold text-stone-900">{oferta.fincaNombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Variedad:</span>
            {/* Color negro text-stone-900 según instrucción del usuario */}
            <span className="font-bold text-stone-900">
              {oferta.variedad} ({oferta.especie})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Cantidad:</span>
            <span className="font-mono font-bold text-stone-900">
              {oferta.cantidadKg.toLocaleString('es-CO')} Kg
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Calificación SCA:</span>
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              {oferta.puntajeSca} Puntos
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Precio Referencial / Saco:</span>
            <span className="font-mono font-bold text-stone-900">
              ${oferta.precioSacoCop?.toLocaleString('es-CO')} COP
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Fecha de Publicación:</span>
            <span className="font-medium text-stone-700">{oferta.fechaPublicacion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Estado de Publicación:</span>
            <span className="font-bold text-emerald-700">{oferta.estado}</span>
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
