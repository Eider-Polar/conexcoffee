import { useState } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import { Button } from '@/components/ui';
import { Award, UserCheck, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AsignarCatadorModal({
  isOpen,
  onClose,
  analisis,
  catadores = [],
  onAsignar,
}) {
  const [selectedCatador, setSelectedCatador] = useState(
    analisis?.catadorAsignado || (catadores[0] ? `${catadores[0].nombres} ${catadores[0].apellidos}` : '')
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCatador || selectedCatador === 'Sin asignar') {
      toast.error('Selecciona un catador válido');
      return;
    }
    onAsignar?.(analisis, selectedCatador);
    toast.success(`Catador ${selectedCatador} asignado exitosamente`);
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={`Asignar Catador — ${analisis?.codigo || ''}`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <Shield className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <span>
            Al asignar el catador, se generará automáticamente la sesión para la evaluación sensorial bajo protocolo SCA.
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-surface-700 uppercase tracking-wider mb-2">
            Seleccionar Catador Q-Grader Certificado *
          </label>
          <select
            value={selectedCatador}
            onChange={(e) => setSelectedCatador(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="">-- Selecciona un catador --</option>
            {catadores.map((c) => (
              <option key={c.id} value={`${c.nombres} ${c.apellidos}`}>
                {c.nombres} {c.apellidos} ({c.certificadoQ || 'Q-Grader'})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            <UserCheck className="w-4 h-4" />
            Confirmar Asignación
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
