import { useState } from 'react';
import { Card } from '@/components/ui';
import { Coffee, Edit3, Eye, Award, Sparkles } from 'lucide-react';
import { ANALISIS_SENSORIALES_DATA } from '../data/laboratorioData';
import { ModificarSensorialModal, VerSensorialModal } from '../components';

export default function LaboratorioAnalisisSensorialPage() {
  const [sensorialList, setSensorialList] = useState(ANALISIS_SENSORIALES_DATA);
  const [sensorialEditar, setSensorialEditar] = useState(null);
  const [sensorialVer, setSensorialVer] = useState(null);

  // Estado para el Tooltip flotante (Fixed para evitar recortes de overflow en tablas)
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleUpdate = (actualizado) => {
    setSensorialList((prev) =>
      prev.map((s) => (s.id === actualizado.id ? actualizado : s))
    );
  };

  const handleMouseEnterPill = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      left: rect.left,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      item,
    });
  };

  const handleMouseLeavePill = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Evaluación de Calidad — Análisis Sensorial</h1>
        <p className="text-surface-500 mt-1">
          Calificación de tazas bajo protocolo SCA, evaluación de atributos sensoriales y perfil descriptivo
        </p>
      </div>

      {/* Tabla Principal */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-surface-50 text-surface-600 border-b border-surface-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Lote</th>
                <th className="py-3.5 px-4 font-bold">Variedad</th>
                <th className="py-3.5 px-4 font-bold text-center">Puntaje</th>
                <th className="py-3.5 px-4 font-bold">Perfil Sensorial</th>
                <th className="py-3.5 px-4 font-bold">Productor</th>
                <th className="py-3.5 px-4 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 text-xs">
              {sensorialList.map((item) => (
                <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                  {/* Lote */}
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className="text-surface-900 bg-surface-100 px-2.5 py-1 rounded">
                      {item.codigoLote}
                    </span>
                  </td>

                  {/* Variedad */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-stone-900">
                      {item.variedad}
                    </span>
                    <span className="block text-[11px] text-stone-500 font-normal">
                      {item.finca}
                    </span>
                  </td>

                  {/* Puntaje */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-[#AD2E01] font-mono font-bold rounded-lg border border-amber-200/60 text-xs shadow-2xs">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {item.puntajeSca || item.puntajeTotal} pts
                    </span>
                  </td>

                  {/* Perfil Sensorial con Disparador de Tooltip */}
                  <td className="py-3.5 px-4">
                    <div
                      onMouseEnter={(e) => handleMouseEnterPill(e, item)}
                      onMouseLeave={handleMouseLeavePill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/90 border border-amber-200 hover:border-amber-400 text-stone-800 hover:text-[#AD2E01] transition-all shadow-2xs cursor-help select-none group"
                    >
                      <Coffee className="w-3.5 h-3.5 text-[#AD2E01] shrink-0" />
                      <span className="font-semibold text-xs max-w-[170px] truncate">
                        {item.tituloPerfil || 'Perfil Sensorial'}
                      </span>
                      <Sparkles className="w-3 h-3 text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
                    </div>
                  </td>

                  {/* Productor */}
                  <td className="py-3.5 px-4 text-surface-800 font-medium">
                    {item.productor}
                  </td>

                  {/* Acciones */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Botón 1: Registrar / Editar perfil sensorial */}
                      <button
                        type="button"
                        onClick={() => setSensorialEditar(item)}
                        title="Registrar / Editar perfil sensorial"
                        aria-label="Registrar o editar perfil sensorial"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4 text-primary-600" />
                      </button>

                      {/* Botón 2: Ver Ficha Sensorial */}
                      <button
                        type="button"
                        onClick={() => setSensorialVer(item)}
                        title="Ver ficha sensorial SCA"
                        aria-label="Ver ficha sensorial"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-surface-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* TOOLTIP NO GENÉRICO FLOTANTE (Posicionado con fixed sin recortes) */}
      {/* ======================================================== */}
      {activeTooltip && (
        <div
          className="fixed z-[9999] pointer-events-none w-72 sm:w-80 p-3.5 bg-stone-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-stone-700/80 animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: Math.max(16, Math.min(activeTooltip.left, window.innerWidth - 340)),
            top: activeTooltip.top > 230 ? activeTooltip.top - 8 : activeTooltip.bottom + 8,
            transform: activeTooltip.top > 230 ? 'translateY(-100%)' : 'translateY(0)',
          }}
        >
          {/* Cabecera del Tooltip */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-700/70 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-md bg-[#AD2E01] text-white">
                <Coffee className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Perfil de Catación
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              {activeTooltip.item.codigoLote}
            </span>
          </div>

          {/* Título y Puntaje */}
          <div className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
            <span>{activeTooltip.item.tituloPerfil || 'Notas Sensoriales'}</span>
            <span className="text-amber-400 font-mono text-[11px] font-extrabold">
              {activeTooltip.item.puntajeSca || activeTooltip.item.puntajeTotal} SCA
            </span>
          </div>

          {/* Descripción Sensorial Completa */}
          <p className="text-[11px] text-stone-200 leading-relaxed italic bg-black/40 p-2.5 rounded-lg border border-stone-800">
            "{activeTooltip.item.perfilSensorial || activeTooltip.item.notas || 'Sin descripción sensorial registrada.'}"
          </p>

          {/* Pie con Catador Responsable */}
          <div className="mt-2 pt-1.5 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
            <span>Catador evaluador:</span>
            <span className="font-semibold text-stone-200 uppercase">
              {activeTooltip.item.catador}
            </span>
          </div>

          {/* Flecha indicadora (Caret) según posición arriba o abajo */}
          {activeTooltip.top > 230 ? (
            <div className="absolute left-6 top-full w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-stone-900/95" />
          ) : (
            <div className="absolute left-6 bottom-full w-0 h-0 border-x-6 border-x-transparent border-b-6 border-b-stone-900/95" />
          )}
        </div>
      )}

      {/* Modales */}
      <ModificarSensorialModal
        isOpen={!!sensorialEditar}
        onClose={() => setSensorialEditar(null)}
        sensorial={sensorialEditar}
        onSave={handleUpdate}
      />

      <VerSensorialModal
        isOpen={!!sensorialVer}
        onClose={() => setSensorialVer(null)}
        sensorial={sensorialVer}
      />
    </div>
  );
}
