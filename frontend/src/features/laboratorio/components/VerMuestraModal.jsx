import ModalBase from '@/components/modals/ModalBase';
import { Button } from '@/components/ui';
import { Archive, Calendar, Scale, Droplet, User, MapPin, CheckCircle2 } from 'lucide-react';

export default function VerMuestraModal({ isOpen, onClose, muestra }) {
  if (!muestra) return null;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalle de Muestra — ${muestra.codigoLote}`}
      size="md"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3.5 bg-surface-50 rounded-lg border border-surface-200">
          <div className="flex items-center gap-2.5">
            <Archive className="w-5 h-5 text-primary-600" />
            <div>
              <h3 className="font-bold text-surface-900 text-base">{muestra.codigoLote}</h3>
              <p className="text-xs text-surface-500">Muestra de Café Pergamino Seco</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700">
            {muestra.estado}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-surface-200 rounded-lg">
            <span className="text-xs text-surface-500 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-surface-400" /> Peso
            </span>
            <span className="text-base font-bold text-surface-900 mt-1 block">{muestra.peso}</span>
          </div>
          <div className="p-3 bg-white border border-surface-200 rounded-lg">
            <span className="text-xs text-surface-500 flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-surface-400" /> Humedad
            </span>
            <span className="text-base font-bold text-primary-700 mt-1 block">{muestra.humedad}</span>
          </div>
        </div>

        <div className="divide-y divide-surface-100 text-sm">
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-surface-400" /> Fecha de Ingreso:
            </span>
            <span className="font-medium text-surface-900">{muestra.fecha}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500 flex items-center gap-1.5">
              <User className="w-4 h-4 text-surface-400" /> Caficultor:
            </span>
            <span className="font-medium text-surface-900">{muestra.caficultor}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-surface-400" /> Finca de Origen:
            </span>
            <span className="font-medium text-surface-900">{muestra.finca}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500">Variedad:</span>
            <span className="font-medium text-surface-900">{muestra.variedad || 'Castillo'}</span>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-surface-200">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
