import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Coffee,
  Ship,
  ArrowRight,
  Lock,
  Unlock,
  Thermometer,
  Droplets,
  Layers,
  Building2,
  Sparkles,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { CountryFlag } from './Flags';

// ==========================================================
// ConexCoffee — ContenedorRealistaViewer
// Inspección 100% Fotorrealista:
// 1. Contenedor cerrado con fotografía real en muelle
// 2. Compuertas reales que rotan en 3D
// 3. Interior real con sacos de café colombiano de especialidad
// ==========================================================

export default function ContenedorRealistaViewer({ contenedor }) {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [activeVarietyIndex, setActiveVarietyIndex] = useState(0);

  if (!contenedor) return null;

  const currentVariety = contenedor.variedades[activeVarietyIndex] || contenedor.variedades[0];

  return (
    <div className="space-y-8">
      {/* ==========================================================
          1. Ficha Técnica y Empresa Responsable del Contenedor
          ========================================================== */}
      <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-surface-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 rounded-sm overflow-hidden shadow-xs border border-surface-200 shrink-0">
              <CountryFlag
                codigoIso={contenedor.codigoIso}
                pais={contenedor.pais}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-surface-900 tracking-tight">
                  Contenedor {contenedor.pais}
                </h3>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-surface-100 text-surface-700 font-bold border border-surface-200">
                  {contenedor.contenedorId}
                </span>
              </div>
              <p className="text-xs text-surface-500 mt-1 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-primary-600" />
                  <span>Ofertado por: <strong className="text-surface-800">{contenedor.empresa}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Ship className="h-3.5 w-3.5 text-surface-400" />
                  <span>Destino: <strong className="text-surface-800">{contenedor.puertoDestino}</strong></span>
                </span>
              </p>
            </div>
          </div>

          {/* Ventana de Carga Logística (Apertura y Cierre) */}
          <div className="flex items-center gap-3">
            <div className="text-left sm:text-right">
              <div className="text-[11px] text-surface-400 font-medium">Ventana Logística de Carga</div>
              <div className="text-xs sm:text-sm font-bold text-surface-800 flex items-center gap-1.5 sm:justify-end">
                <Calendar className="h-3.5 w-3.5 text-primary-600" />
                <span>{contenedor.fechaApertura} — {contenedor.fechaCierre}</span>
              </div>
            </div>

            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${contenedor.colorTema.badge}`}>
              {contenedor.estado}
            </span>
          </div>
        </div>

        {/* Parámetros Ambientales de la Unidad */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="p-3 rounded-lg bg-surface-50 border border-surface-200/70">
            <div className="text-surface-400 font-medium flex items-center gap-1.5 mb-1">
              <Layers className="h-3.5 w-3.5 text-surface-500" />
              <span>Tipo de Unidad</span>
            </div>
            <div className="font-bold text-surface-900 truncate">{contenedor.tipoContenedor}</div>
          </div>

          <div className="p-3 rounded-lg bg-surface-50 border border-surface-200/70">
            <div className="text-surface-400 font-medium flex items-center gap-1.5 mb-1">
              <Thermometer className="h-3.5 w-3.5 text-amber-500" />
              <span>Temperatura Bodega</span>
            </div>
            <div className="font-bold text-surface-900">{contenedor.temperaturaBodega}</div>
          </div>

          <div className="p-3 rounded-lg bg-surface-50 border border-surface-200/70">
            <div className="text-surface-400 font-medium flex items-center gap-1.5 mb-1">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              <span>Humedad Grano</span>
            </div>
            <div className="font-bold text-surface-900">{contenedor.humedadControlada}</div>
          </div>

          <div className="p-3 rounded-lg bg-surface-50 border border-surface-200/70">
            <div className="text-surface-400 font-medium flex items-center gap-1.5 mb-1">
              <Clock className="h-3.5 w-3.5 text-primary-600" />
              <span>Días para Zarpar</span>
            </div>
            <div className="font-bold text-surface-900">
              {contenedor.diasRestantes > 0 ? `${contenedor.diasRestantes} días restantes` : 'Zarpe en curso'}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================
          2. Bahía de Inspección con Fotografía Real y Apertura 3D
          ========================================================== */}
      <div className="relative rounded-2xl bg-surface-950 border border-surface-800 shadow-2xl overflow-hidden">
        {/* Barra de Control de la Cámara de Inspección */}
        <div className="relative z-40 px-6 py-4 bg-surface-900/95 backdrop-blur-md border-b border-surface-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-[#F25433] animate-ping" />
            <span className="text-xs font-mono text-primary-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5 text-primary-400" />
              <span>{isDoorOpen ? 'Interior Abierto • Lotes de Café' : 'Compuertas Selladas • Vista Exterior'}</span>
            </span>
            <span className="text-surface-600">|</span>
            <span className="font-mono text-xs text-white/80">{contenedor.contenedorId}</span>
          </div>

          {/* Botón de Apertura/Cierre */}
          <button
            onClick={() => setIsDoorOpen(!isDoorOpen)}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xl bg-[#F25433] hover:bg-[#AD2E01] text-white active:scale-95 border border-white/20"
          >
            {isDoorOpen ? (
              <>
                <Lock className="h-4 w-4 text-white" />
                <span>Cerrar Compuertas</span>
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4 text-amber-300 animate-pulse" />
                <span>Abrir Compuertas del Contenedor</span>
              </>
            )}
          </button>
        </div>

        {/* Escenario 3D con Perspectiva */}
        <div
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[420px] overflow-hidden bg-black"
          style={{ perspective: '1400px' }}
        >
          {/* ======================================================
              CAPA FONDO: Fotografía Real del Interior con Sacos de Café
              ====================================================== */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform transition-all duration-700 ease-out"
            style={{
              transform: isDoorOpen ? 'scale(1.02)' : 'scale(0.98)',
              filter: isDoorOpen ? 'brightness(1.0)' : 'brightness(0.3)',
            }}
          >
            <img
              src="/images/destinos/interior_contenedor.jpg"
              alt="Interior del Contenedor con Sacos de Café Colombiano"
              className="w-full h-full object-cover object-center"
            />
            {/* Capa oscura sólida para lectura óptima */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Puntos Interactivos / Hotspots de Variedades de Café */}
            <div
              className={`absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-20 transition-opacity duration-500 ${
                isDoorOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Selector de lotes estibados */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-white bg-surface-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  Lotes en Este Contenedor:
                </span>
                {contenedor.variedades.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVarietyIndex(i)}
                    type="button"
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-md ${
                      i === activeVarietyIndex
                        ? 'bg-primary-600 text-white ring-2 ring-primary-400'
                        : 'bg-surface-900/80 text-surface-200 hover:bg-surface-800 border border-white/10'
                    }`}
                  >
                    {v.nombre} ({v.score})
                  </button>
                ))}
              </div>

              {/* Tarjeta Flotante con el Manifiesto del Café Seleccionado */}
              {currentVariety && (
                <div className="max-w-md bg-surface-900/90 backdrop-blur-md p-5 rounded-xl border border-primary-500/40 shadow-2xl text-white animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/40 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>{currentVariety.score}</span>
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        currentVariety.disponible
                          ? 'bg-[#fee8e3] text-[#AD2E01] border border-[#fed4ca]'
                          : 'bg-surface-700 text-surface-400'
                      }`}
                    >
                      {currentVariety.disponible ? 'Disponible para Reserva' : 'Lote Asignado'}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-white mb-1">
                    {currentVariety.nombre}
                  </h4>
                  <p className="text-xs text-primary-200/90 mb-2 font-medium">
                    {currentVariety.origen}
                  </p>

                  <div className="text-[11px] text-primary-300 bg-primary-950/60 p-2.5 rounded-lg border border-primary-800/40 mb-3 font-mono">
                    Proceso: <strong>{currentVariety.proceso}</strong>
                  </div>

                  <p className="text-xs text-surface-200 italic leading-relaxed">
                    "{currentVariety.notas}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ======================================================
              COMPUERTA IZQUIERDA REAL (FOTOGRAFÍA 8K DEL CONTENEDOR CERRADO)
              ====================================================== */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden will-change-transform z-30 pointer-events-none"
            style={{
              transformOrigin: 'left center',
              transform: isDoorOpen ? 'rotateY(-108deg)' : 'rotateY(0deg)',
              transition: 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)',
              boxShadow: isDoorOpen ? 'none' : 'inset -3px 0 12px rgba(0,0,0,0.6)',
            }}
          >
            <img
              src="/images/destinos/contenedor_cerrado.jpg"
              alt="Compuerta Izquierda del Contenedor"
              className="w-[200%] max-w-none h-full object-cover select-none"
              style={{
                transform: 'translateX(0%)',
                objectPosition: 'left center',
              }}
            />
          </div>

          {/* ======================================================
              COMPUERTA DERECHA REAL (FOTOGRAFÍA 8K DEL CONTENEDOR CERRADO)
              ====================================================== */}
          <div
            className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden will-change-transform z-30 pointer-events-none"
            style={{
              transformOrigin: 'right center',
              transform: isDoorOpen ? 'rotateY(108deg)' : 'rotateY(0deg)',
              transition: 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)',
              boxShadow: isDoorOpen ? 'none' : 'inset 3px 0 12px rgba(0,0,0,0.6)',
            }}
          >
            <img
              src="/images/destinos/contenedor_cerrado.jpg"
              alt="Compuerta Derecha del Contenedor"
              className="w-[200%] max-w-none h-full object-cover select-none"
              style={{
                transform: 'translateX(-50%)',
                objectPosition: 'left center',
              }}
            />
          </div>
        </div>

        {/* ==========================================================
            3. Barra Inferior con CTA
            ========================================================== */}
        <div className="px-6 py-4 bg-surface-900 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-surface-400 flex items-center gap-2">
            <Coffee className="h-4 w-4 text-primary-400" />
            <span>Café verde de especialidad estibado en sacos GrainPro® con trazabilidad directa.</span>
          </div>

          <Link to="/register">
            <Button variant="primary" size="md" className="gap-2 shadow-lg w-full sm:w-auto">
              <span>Ofertar / Reservar en Contenedor {contenedor.pais}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
