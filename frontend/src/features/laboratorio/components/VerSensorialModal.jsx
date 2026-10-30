import ModalBase from '@/components/modals/ModalBase';
import { Button } from '@/components/ui';
import { Award, Coffee, Star, ShieldCheck } from 'lucide-react';

export default function VerSensorialModal({ isOpen, onClose, sensorial }) {
  if (!sensorial) return null;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={`Ficha de Evaluación Sensorial — ${sensorial.codigoLote}`}
      size="lg"
    >
      <div className="space-y-4">
        {/* Banner Superior con Puntaje SCA */}
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-xs font-mono font-semibold text-primary-700 bg-white px-2 py-0.5 rounded border border-primary-200">
              {sensorial.codigoLote}
            </span>
            <h3 className="font-bold text-surface-900 text-lg mt-1 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-primary-600" />
              Catador: {sensorial.catador}
            </h3>
            <span className="text-xs text-surface-500">Evaluado bajo protocolo SCA (Specialty Coffee Association)</span>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-xl font-extrabold text-xl shadow-xs">
              <Award className="w-6 h-6 text-amber-300" />
              {sensorial.puntajeTotal}
            </div>
            <span className="block text-[11px] font-semibold text-primary-800 uppercase tracking-wider mt-1">
              Puntos SCA
            </span>
          </div>
        </div>

        {/* Atributos Sensoriales */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 text-center">
          <div className="p-2.5 bg-surface-50 border border-surface-200 rounded-lg">
            <span className="text-xs text-surface-500 block">Fragancia</span>
            <span className="text-base font-bold text-surface-900">{sensorial.fragancia}</span>
          </div>
          <div className="p-2.5 bg-surface-50 border border-surface-200 rounded-lg">
            <span className="text-xs text-surface-500 block">Sabor</span>
            <span className="text-base font-bold text-surface-900">{sensorial.sabor}</span>
          </div>
          <div className="p-2.5 bg-surface-50 border border-surface-200 rounded-lg">
            <span className="text-xs text-surface-500 block">Balance</span>
            <span className="text-base font-bold text-surface-900">{sensorial.balance}</span>
          </div>
          <div className="p-2.5 bg-surface-50 border border-surface-200 rounded-lg">
            <span className="text-xs text-surface-500 block">Acidez</span>
            <span className="text-base font-bold text-surface-900">{sensorial.acidez || '8.50'}</span>
          </div>
          <div className="p-2.5 bg-surface-50 border border-surface-200 rounded-lg">
            <span className="text-xs text-surface-500 block">Cuerpo</span>
            <span className="text-base font-bold text-surface-900">{sensorial.cuerpo || '8.25'}</span>
          </div>
        </div>

        {/* Descriptores y Notas */}
        <div className="p-3 bg-surface-50 border border-surface-200 rounded-lg">
          <h4 className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-1">
            Descriptores Aromáticos & Perfil de Taza
          </h4>
          <p className="text-sm text-surface-800 italic">
            "{sensorial.notas || 'Notas frutales, acidez cítrica brillante y dulce final achocolatado.'}"
          </p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Certificado Q-Grader Válido
          </span>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
