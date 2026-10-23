import { useState, useEffect } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import { XCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ModificarSensorialModal({ isOpen, onClose, sensorial, onSave }) {
  const [perfilSensorial, setPerfilSensorial] = useState('');

  useEffect(() => {
    if (sensorial) {
      setPerfilSensorial(sensorial.perfilSensorial || sensorial.notas || '');
    }
  }, [sensorial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      ...sensorial,
      perfilSensorial,
      notas: perfilSensorial,
    });
    toast.success('Perfil sensorial registrado correctamente');
    onClose();
  };

  if (!sensorial) return null;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={true}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 py-1">
        {/* Título en color Terracota/Rojo como en la imagen */}
        <div>
          <h3 className="text-xl font-bold text-brand-terracota">
            Registrar perfil sensorial
          </h3>
          <p className="text-xs text-stone-400 font-mono mt-0.5">
            Lote: {sensorial.codigoLote}
          </p>
        </div>

        {/* Sección: Perfil sensorial descrito por catador(es) */}
        <div className="space-y-2">
          <h4 className="text-base font-bold text-stone-800">
            Perfil sensorial descrito por catador(es)
          </h4>

          <div className="space-y-1.5 text-xs sm:text-sm text-stone-600 font-medium bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/70">
            <p>
              <span className="font-bold text-stone-800">Catador:</span>{' '}
              <span className="uppercase text-stone-700">{sensorial.catador}</span>
            </p>
            <p>
              <span className="font-bold text-stone-800">Perfil sensorial:</span>{' '}
              <span className="text-stone-600">
                {sensorial.perfilSensorialCatador || sensorial.notas || 'caramelo x, chocolate x.'}
              </span>
            </p>
            <p>
              <span className="font-bold text-stone-800">Puntaje SCA:</span>{' '}
              <span className="text-brand-terracota font-bold underline decoration-stone-300">
                {sensorial.puntajeSca || sensorial.puntajeTotal || '82.25'}
              </span>
            </p>
          </div>
        </div>

        {/* Campo editable: Perfil sensorial */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-800 flex items-center gap-1">
            <span className="text-red-500">*</span> Perfil sensorial
          </label>
          <textarea
            rows={3}
            value={perfilSensorial}
            onChange={(e) => setPerfilSensorial(e.target.value)}
            required
            placeholder="Ingrese o actualice el perfil sensorial..."
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-sky-300 focus:border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white transition-all resize-y text-stone-800"
          />
        </div>

        {/* Botones de Cancelar y Guardar como en la imagen */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-gray hover:bg-stone-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancelar</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <Save className="w-4 h-4" />
            <span>Guardar</span>
          </button>
        </div>
      </form>
    </ModalBase>
  );
}
