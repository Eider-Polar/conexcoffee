import ModalBase from '@/components/modals/ModalBase';
import { Button } from '@/components/ui';
import { FlaskConical, Calendar, User, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

export default function VerAnalisisModal({ isOpen, onClose, analisis }) {
  if (!analisis) return null;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={`Ficha Técnica de Análisis Físico — ${analisis.codigo}`}
      size="lg"
    >
      <div className="space-y-4">
        {/* Encabezado de la muestra */}
        <div className="p-4 bg-surface-50 rounded-lg border border-surface-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-surface-900 text-base">{analisis.codigo}</h3>
            </div>
            <p className="text-xs text-surface-500 mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-surface-400" />
              Fecha de Registro: {analisis.fechaRegistro}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            {analisis.estado}
          </span>
        </div>

        {/* Métricas del análisis */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white border border-surface-200 rounded-lg text-center">
            <span className="text-xs text-surface-500 block">Humedad</span>
            <span className="text-lg font-bold text-surface-900">{analisis.humedad}</span>
            <span className="text-[10px] text-emerald-600 font-medium block">Rango óptimo</span>
          </div>
          <div className="p-3 bg-white border border-surface-200 rounded-lg text-center">
            <span className="text-xs text-surface-500 block">Peso Muestra</span>
            <span className="text-lg font-bold text-surface-900">{analisis.pesoMuestra}</span>
            <span className="text-[10px] text-surface-400 block">Pergamino seco</span>
          </div>
          <div className="p-3 bg-white border border-surface-200 rounded-lg text-center">
            <span className="text-xs text-surface-500 block">Merma Estimada</span>
            <span className="text-lg font-bold text-surface-900">{analisis.merma || '18.4%'}</span>
            <span className="text-[10px] text-surface-400 block">Cáscara y cisco</span>
          </div>
          <div className="p-3 bg-white border border-surface-200 rounded-lg text-center">
            <span className="text-xs text-surface-500 block">Rendimiento</span>
            <span className="text-lg font-bold text-surface-900">{analisis.factorRendimiento || '88.5 kg'}</span>
            <span className="text-[10px] text-surface-400 block">Por saco 70kg</span>
          </div>
        </div>

        {/* Detalle adicional */}
        <div className="divide-y divide-surface-100 text-sm border-t border-b border-surface-200 py-1">
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500 flex items-center gap-1.5">
              <User className="w-4 h-4 text-surface-400" />
              Responsable de Laboratorio:
            </span>
            <span className="font-semibold text-surface-900">{analisis.responsable}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500">Defectos Primer Grupo (Severos):</span>
            <span className="font-medium text-surface-900">{analisis.defectosPrimerGrupo ?? 0}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500">Defectos Segundo Grupo (Secundarios):</span>
            <span className="font-medium text-surface-900">{analisis.defectosSegundoGrupo ?? 3}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-surface-500">Catador Asignado:</span>
            <span className="font-semibold text-primary-700">{analisis.catadorAsignado || 'Sin asignar'}</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
