import { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditarLoteModal({ isOpen, onClose, lote, onGuardar }) {
  const [loteEdicion, setLoteEdicion] = useState(lote);

  if (!isOpen || !loteEdicion) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loteEdicion.nombreLote) {
      toast.error('Complete el nombre del lote');
      return;
    }

    onGuardar(loteEdicion);
    toast.success('Lote actualizado con éxito');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-[#AD2E01]">
              <Pencil className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Editar Lote</h3>
              <p className="text-xs text-stone-500">{loteEdicion.nombreLote}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Nombre del Lote *</label>
            <input
              type="text"
              required
              value={loteEdicion.nombreLote}
              onChange={(e) =>
                setLoteEdicion({ ...loteEdicion, nombreLote: e.target.value })
              }
              className="w-full px-3 py-2 border border-stone-200 rounded-xl font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Especie</label>
              <select
                value={loteEdicion.especie}
                onChange={(e) =>
                  setLoteEdicion({ ...loteEdicion, especie: e.target.value })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl bg-white"
              >
                <option value="Arábica">Arábica</option>
                <option value="Robusta">Robusta</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Variedad de Café</label>
              <input
                type="text"
                value={loteEdicion.variedad}
                onChange={(e) =>
                  setLoteEdicion({ ...loteEdicion, variedad: e.target.value })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">N° Árboles</label>
              <input
                type="number"
                min="0"
                value={loteEdicion.numeroArboles}
                onChange={(e) =>
                  setLoteEdicion({
                    ...loteEdicion,
                    numeroArboles: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Distancia Árboles (m)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={loteEdicion.distanciaArboles}
                onChange={(e) =>
                  setLoteEdicion({
                    ...loteEdicion,
                    distanciaArboles: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Distancia Surcos (m)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={loteEdicion.distanciaSurcos}
                onChange={(e) =>
                  setLoteEdicion({
                    ...loteEdicion,
                    distanciaSurcos: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
              />
            </div>
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
