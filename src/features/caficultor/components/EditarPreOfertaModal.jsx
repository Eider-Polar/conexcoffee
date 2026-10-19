import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { PROCESOS_COSECHA } from '../data/caficultorData';

export default function EditarPreOfertaModal({ isOpen, onClose, preoferta, onGuardar }) {
  const [preofertaEdicion, setPreofertaEdicion] = useState(preoferta);

  if (!isOpen || !preofertaEdicion) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!preofertaEdicion.cantidadKg || !preofertaEdicion.precioEstimadoCop) {
      toast.error('Complete los campos requeridos (*)');
      return;
    }

    onGuardar(preofertaEdicion);
    toast.success('Pre-oferta actualizada con éxito');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="font-bold text-stone-900 text-base">
            Editar Pre-Oferta ({preofertaEdicion.codigo})
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Cantidad de Café (Kg) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={preofertaEdicion.cantidadKg}
                onChange={(e) =>
                  setPreofertaEdicion({
                    ...preofertaEdicion,
                    cantidadKg: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Precio Estimado ($ COP/Kg) *
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                required
                value={preofertaEdicion.precioEstimadoCop}
                onChange={(e) =>
                  setPreofertaEdicion({
                    ...preofertaEdicion,
                    precioEstimadoCop: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Proceso de Cosecha
            </label>
            <select
              value={preofertaEdicion.procesoCosecha}
              onChange={(e) =>
                setPreofertaEdicion({
                  ...preofertaEdicion,
                  procesoCosecha: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-stone-200 rounded-xl bg-white"
            >
              {PROCESOS_COSECHA.map((proc) => (
                <option key={proc} value={proc}>
                  {proc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Descripción del Proceso (máx 500 caracteres)
            </label>
            <textarea
              rows={3}
              maxLength={500}
              value={preofertaEdicion.descripcion || ''}
              onChange={(e) =>
                setPreofertaEdicion({
                  ...preofertaEdicion,
                  descripcion: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-stone-200 rounded-xl resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#AD2E01] hover:bg-[#8D2501] text-white font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
