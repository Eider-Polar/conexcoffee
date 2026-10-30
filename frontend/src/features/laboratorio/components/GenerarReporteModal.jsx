import ModalBase from '@/components/modals/ModalBase';
import { Button } from '@/components/ui';
import { Printer, Download, Award, Coffee, CheckCircle2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GenerarReporteModal({ isOpen, onClose, hoja }) {
  if (!hoja) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success('Descargando reporte oficial de catación (PDF)...');
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={`Reporte Oficial de Catación SCA — ${hoja.codigoLote}`}
      size="xl"
    >
      <div className="space-y-4 printable-content">
        {/* Encabezado del Certificado */}
        <div className="p-4 border-2 border-primary-500 rounded-xl bg-surface-50 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-dark_conex.png"
                alt="Conexcoffee"
                className="h-8 w-auto object-contain"
              />
              <div className="border-l border-surface-300 pl-3">
                <h3 className="font-bold text-surface-900 text-sm">Laboratorio de Calidad & Catación</h3>
                <p className="text-[11px] text-surface-500">Certificación Especializada de Café Verde</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-primary-700 bg-white px-2.5 py-1 rounded-md border border-primary-200">
                {hoja.codigoLote}
              </span>
              <p className="text-[10px] text-surface-400 mt-1">Fecha: {hoja.fecha}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-surface-200 text-xs">
            <div>
              <span className="text-surface-500 block">Variedad:</span>
              <span className="font-bold text-surface-900 text-sm">{hoja.variedad}</span>
            </div>
            <div>
              <span className="text-surface-500 block">Proceso:</span>
              <span className="font-bold text-primary-800 text-sm">{hoja.proceso}</span>
            </div>
            <div>
              <span className="text-surface-500 block">Caficultor / Finca:</span>
              <span className="font-semibold text-surface-900">{hoja.caficultor}</span>
              <span className="text-surface-500 block text-[10px]">{hoja.finca}</span>
            </div>
            <div>
              <span className="text-surface-500 block">Puntaje SCA Final:</span>
              <span className="font-extrabold text-primary-600 text-base flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-500" />
                {hoja.puntajeFinal} pts
              </span>
            </div>
          </div>
        </div>

        {/* Parámetros Evaluados */}
        <div className="p-3 bg-white border border-surface-200 rounded-lg text-xs space-y-2">
          <h4 className="font-semibold text-surface-700 uppercase tracking-wider">
            Detalle de Protocolo Sensorial (SCA Cupping Protocol)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2 bg-surface-50 rounded">
              <span className="text-surface-500 block">Fragancia / Aroma:</span>
              <span className="font-bold text-surface-900">8.75 / 10.0</span>
            </div>
            <div className="p-2 bg-surface-50 rounded">
              <span className="text-surface-500 block">Sabor:</span>
              <span className="font-bold text-surface-900">8.50 / 10.0</span>
            </div>
            <div className="p-2 bg-surface-50 rounded">
              <span className="text-surface-500 block">Acidez:</span>
              <span className="font-bold text-surface-900">8.50 / 10.0</span>
            </div>
            <div className="p-2 bg-surface-50 rounded">
              <span className="text-surface-500 block">Balance:</span>
              <span className="font-bold text-surface-900">8.50 / 10.0</span>
            </div>
          </div>
        </div>

        {/* Sellos de Validación */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Firma y aprobación por Catador Q-Grader certificado registrado en la plataforma.</span>
          </div>
          <span className="font-bold text-emerald-800 shrink-0">ESTADO: APROBADO</span>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 pt-3 border-t border-surface-200">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Imprimir
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Descargar PDF
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
