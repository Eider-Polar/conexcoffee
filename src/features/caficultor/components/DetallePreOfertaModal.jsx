import { X } from 'lucide-react';

export default function DetallePreOfertaModal({ isOpen, onClose, preoferta }) {
  if (!isOpen || !preoferta) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
              {preoferta.codigo}
            </span>
            <h3 className="font-bold text-stone-900 text-base mt-1">
              Detalle de la Pre-Oferta
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

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-stone-500">Lote Origen:</span>
            <span className="font-bold text-stone-900">{preoferta.loteNombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Variedad:</span>
            <span className="font-bold text-stone-900">
              {preoferta.variedad} ({preoferta.especie})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Cantidad Ofertada:</span>
            <span className="font-mono font-bold text-stone-900">
              {preoferta.cantidadKg.toLocaleString('es-CO')} Kg
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Proceso de Cosecha:</span>
            <span className="font-semibold text-stone-800">{preoferta.procesoCosecha}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Tipo de Secado:</span>
            <span className="font-medium text-stone-800">{preoferta.tipoSecado}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Sombrío:</span>
            <span className="font-medium text-stone-800">{preoferta.sombrio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Precio Estimado (COP/Kg):</span>
            <span className="font-mono font-bold text-stone-900">
              ${preoferta.precioEstimadoCop.toLocaleString('es-CO')} COP
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Referencia Internacional:</span>
            <span className="font-mono font-bold text-emerald-700">
              ~ USD ${preoferta.precioEstimadoUsd} / lb
            </span>
          </div>
          {preoferta.tipoFermentacion && (
            <div className="pt-2 border-t border-stone-200">
              <span className="text-stone-500 block mb-0.5 font-semibold">Fermentación:</span>
              <p className="text-stone-800">{preoferta.tipoFermentacion}</p>
            </div>
          )}
          {preoferta.descripcion && (
            <div className="pt-2 border-t border-stone-200">
              <span className="text-stone-500 block mb-0.5 font-semibold">Descripción:</span>
              <p className="text-stone-700 italic">{preoferta.descripcion}</p>
            </div>
          )}
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
