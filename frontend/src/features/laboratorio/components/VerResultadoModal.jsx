import { useState } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import {
  FlaskConical,
  FileText,
  CheckCircle2,
  Printer,
  Image as ImageIcon,
} from 'lucide-react';

export default function VerResultadoModal({
  isOpen,
  onClose,
  resultado,
  onAprobar,
  onGenerarReporte,
}) {
  const [fotoActiva, setFotoActiva] = useState('muestra');

  if (!resultado) return null;

  const infoTecnico = resultado.informacionTecnico || {};
  const fisico = resultado.analisisFisico || {};
  const imagenes = resultado.imagenes || {};

  const tabsFotos = [
    { id: 'muestra', label: 'Muestra', url: imagenes.muestra },
    { id: 'finca', label: 'Finca', url: imagenes.finca },
    { id: 'cultivo', label: 'Cultivo', url: imagenes.cultivo },
    { id: 'almacenamiento', label: 'Almacenamiento', url: imagenes.almacenamiento },
    { id: 'loteOfertado', label: 'Lote Ofertado', url: imagenes.loteOfertado },
  ];

  const imagenActual = tabsFotos.find((t) => t.id === fotoActiva) || tabsFotos[0];

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex flex-wrap items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-50 text-brand-terracota">
            <FlaskConical className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-brand-terracota bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                {resultado.codigo}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  resultado.estado === 'Aprobada'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {resultado.estado === 'Aprobada' ? 'Muestra Aprobada' : 'Pendiente de Aprobación'}
              </span>
            </div>
            <h3 className="font-extrabold text-stone-900 text-base mt-0.5">
              {resultado.variedad} — {resultado.finca}
            </h3>
          </div>
        </div>
      }
      size="2xl"
    >
      <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1 text-stone-800">
        {/* ============================================ */}
        {/* GALERÍA DE IMÁGENES (5 tipos requeridos) */}
        {/* ============================================ */}
        <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-brand-terracota" />
              Evidencias Fotográficas
            </span>
            <span className="text-[11px] font-semibold text-stone-500">
              {imagenActual.label}
            </span>
          </div>

          {/* Selector de pestañas fotográficas */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {tabsFotos.map((tab) => {
              const activa = fotoActiva === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFotoActiva(tab.id)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer truncate ${
                    activa
                      ? 'bg-brand-terracota text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Imagen Visor */}
          <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-stone-200 bg-stone-900/10 shadow-2xs">
            {imagenActual.url ? (
              <img
                src={imagenActual.url}
                alt={imagenActual.label}
                className="w-full h-full object-cover transition-opacity duration-200"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 text-xs">
                <ImageIcon className="w-8 h-8 mb-1" />
                <span>Sin fotografía disponible</span>
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
              Fotografía: {imagenActual.label}
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECCIÓN 1: INFORMACIÓN DE TOMA DE MUESTRA */}
        {/* ============================================ */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs space-y-3">
          <div className="border-b border-stone-200/70 pb-2 flex items-center justify-between">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand-terracota" />
              Información de Toma de Muestra
            </h4>
            <span className="text-xs font-mono font-medium text-stone-500">
              {resultado.proceso}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 font-medium block">
                Fecha toma de muestra:
              </span>
              <strong className="text-stone-900 font-mono text-sm block mt-0.5">
                {infoTecnico.fechaTomaMuestra || 'N/A'}
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 font-medium block">
                Peso de la muestra:
              </span>
              <strong className="text-stone-900 font-mono text-sm block mt-0.5">
                {infoTecnico.peso || resultado.peso}
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 font-medium block">
                % Humedad por técnico:
              </span>
              <strong className="text-brand-terracota font-mono text-sm block mt-0.5">
                {infoTecnico.humedadTecnico}%
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 font-medium block">
                Laboratorio asignado:
              </span>
              <strong className="text-stone-900 font-semibold text-sm block mt-0.5">
                {infoTecnico.laboratorio || 'LABORATORIO 1'}
              </strong>
            </div>
          </div>

          <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs">
            <span className="text-stone-500 font-medium block mb-1">
              Observaciones por técnico:
            </span>
            <p className="text-stone-800 leading-relaxed font-medium italic">
              "{infoTecnico.observacionesTecnico || 'Sin observaciones registradas por el técnico.'}"
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECCIÓN 2: RESULTADOS — ANÁLISIS FÍSICO */}
        {/* ============================================ */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs space-y-3">
          <div className="border-b border-stone-200/70 pb-2 flex items-center justify-between">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-brand-terracota" />
              Resultados — Análisis Físico
            </h4>
            <span className="text-[11px] text-stone-500 font-mono">
              Fecha: {fisico.fechaAnalisisLaboratorio}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">Densidad</span>
              <strong className="text-stone-900 font-mono font-bold text-sm block mt-0.5">
                {fisico.densidad}
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">Actividad de agua (aw)</span>
              <strong className="text-stone-900 font-mono font-bold text-sm block mt-0.5">
                {fisico.actividadAgua}
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">Peso almendra</span>
              <strong className="text-stone-900 font-mono font-bold text-sm block mt-0.5">
                {fisico.pesoAlmendra} g
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">Peso almendra sana (excelso)</span>
              <strong className="text-emerald-700 font-mono font-bold text-sm block mt-0.5">
                {fisico.pesoAlmendraSana} g
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">% Merma</span>
              <strong className="text-stone-900 font-mono font-bold text-sm block mt-0.5">
                {fisico.porcentajeMerma}%
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">Factor de rendimiento</span>
              <strong className="text-brand-terracota font-mono font-bold text-sm block mt-0.5">
                {fisico.factorRendimiento}
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">% Defectos</span>
              <strong className="text-stone-900 font-mono font-bold text-sm block mt-0.5">
                {fisico.porcentajeDefectos}%
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">Malla seleccionada</span>
              <strong className="text-stone-900 font-semibold text-sm block mt-0.5">
                {fisico.mallaSeleccionada}
              </strong>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-stone-500 block text-[11px] font-medium">% Por encima de malla</span>
              <strong className="text-stone-900 font-mono font-bold text-sm block mt-0.5">
                {fisico.porcentajeEncimaMalla}%
              </strong>
            </div>

            <div className="col-span-2 sm:col-span-3 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/70 flex items-center justify-between">
              <div>
                <span className="text-stone-600 block text-[11px] font-medium">
                  Precio aproximado por carga (125 kg)
                </span>
                <strong className="text-brand-terracota font-mono font-extrabold text-base block mt-0.5">
                  ${fisico.precioAproximadoCarga} COP
                </strong>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                Estimación de liquidación
              </span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* BOTONES DE ACCIÓN */}
        {/* ============================================ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 text-xs font-semibold cursor-pointer transition-colors text-center order-3 sm:order-1"
          >
            Cerrar
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 order-1 sm:order-2 w-full sm:w-auto">
            {/* Botón de Generar Reporte */}
            <button
              type="button"
              onClick={() => onGenerarReporte(resultado)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.99]"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Generar Reporte</span>
            </button>

            {/* Botón de Aprobar Muestra */}
            <button
              type="button"
              onClick={() => onAprobar(resultado)}
              disabled={resultado.estado === 'Aprobada'}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                resultado.estado === 'Aprobada'
                  ? 'bg-emerald-600 cursor-default opacity-90'
                  : 'bg-brand-terracota hover:bg-brand-terracota-dark active:scale-[0.99]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {resultado.estado === 'Aprobada' ? 'Muestra Aprobada' : 'Aprobar Muestra'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
