import { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditarFincaModal({ isOpen, onClose, finca, onGuardar }) {
  const [fincaEdicion, setFincaEdicion] = useState(finca);

  if (!isOpen || !fincaEdicion) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fincaEdicion.nombre || !fincaEdicion.areaCafe || !fincaEdicion.altura) {
      toast.error('Complete los campos requeridos (*)');
      return;
    }

    onGuardar(fincaEdicion);
    toast.success('Finca actualizada con éxito');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-brand-terracota">
              <Pencil className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Editar Finca</h3>
              <p className="text-xs text-stone-500">{fincaEdicion.nombre}</p>
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Nombre de la Finca *</label>
              <input
                type="text"
                required
                value={fincaEdicion.nombre}
                onChange={(e) =>
                  setFincaEdicion({ ...fincaEdicion, nombre: e.target.value })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Asociación o Empresa
              </label>
              <input
                type="text"
                value={fincaEdicion.asociacion || ''}
                onChange={(e) =>
                  setFincaEdicion({ ...fincaEdicion, asociacion: e.target.value })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Área Café (ha) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={fincaEdicion.areaCafe}
                onChange={(e) =>
                  setFincaEdicion({
                    ...fincaEdicion,
                    areaCafe: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Área Otros Cultivos (ha)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={fincaEdicion.areaOtrosCultivos || 0}
                onChange={(e) =>
                  setFincaEdicion({
                    ...fincaEdicion,
                    areaOtrosCultivos: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Altura en msnm *
              </label>
              <input
                type="number"
                min="0"
                required
                value={fincaEdicion.altura}
                onChange={(e) =>
                  setFincaEdicion({
                    ...fincaEdicion,
                    altura: parseInt(e.target.value, 10) || 0,
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
              className="px-5 py-2 bg-brand-terracota hover:bg-brand-terracota-dark text-white font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
