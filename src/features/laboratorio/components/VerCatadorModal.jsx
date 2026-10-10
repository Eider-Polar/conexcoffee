import ModalBase from '@/components/modals/ModalBase';
import { Button } from '@/components/ui';
import { Award, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

export default function VerCatadorModal({ isOpen, onClose, catador }) {
  if (!catador) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Ficha del Catador" size="md">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
          <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
            {catador.nombres?.[0]}{catador.apellidos?.[0]}
          </div>
          <div>
            <h3 className="font-bold text-surface-900 text-base">
              {catador.nombres} {catador.apellidos}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 bg-white px-2 py-0.5 rounded border border-primary-200">
              <Award className="w-3.5 h-3.5" />
              {catador.certificadoQ || 'Q-Grader Certificado'}
            </span>
          </div>
        </div>

        <div className="divide-y divide-surface-100 text-sm">
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500">Documento de Identificación:</span>
            <span className="font-mono font-medium text-surface-900">{catador.identificacion}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-surface-400" />
              Teléfono:
            </span>
            <span className="font-medium text-surface-900">{catador.telefono}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-surface-400" />
              Correo Electrónico:
            </span>
            <span className="font-medium text-surface-900">{catador.email || 'No registrado'}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500">Experiencia en Catación:</span>
            <span className="font-medium text-surface-900">{catador.experiencia || '5 años'}</span>
          </div>
          <div className="py-2.5 flex justify-between items-center">
            <span className="text-surface-500">Estado en Laboratorio:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {catador.estado || 'Activo'}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-surface-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
