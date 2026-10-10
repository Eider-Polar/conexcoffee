import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Calendar, Coffee, Eye, ChevronRight, X } from 'lucide-react';
import ModalBase from '@/components/modals/ModalBase';
import VariedadesModal from '../components/VariedadesModal';
import { MOCK_CONTENEDORES, PAISES_DISPONIBLES } from '../data/mockData';


// ============================================
// ContenedoresPage — Lista de contenedores disponibles
// ============================================

export default function CompradorContenedoresPage() {
  const [paisFiltro, setPaisFiltro] = useState('');
  const [contenedorSeleccionado, setContenedorSeleccionado] = useState(null);
  const navigate = useNavigate();

  const contenedoresFiltrados = paisFiltro
    ? MOCK_CONTENEDORES.filter((c) => c.paisDestino === paisFiltro)
    : MOCK_CONTENEDORES;

  const porcentajeDisponible = (c) =>
    Math.round((c.kgDisponibles / c.totalKg) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Contenedores disponibles</h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Explora los contenedores de café especial disponibles para tu país
          </p>
        </div>

        {/* Filtro por país */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary-600 shrink-0" />
          <select
            id="filtro-pais"
            value={paisFiltro}
            onChange={(e) => setPaisFiltro(e.target.value)}
            className="border border-surface-300 rounded-lg px-3 py-2 text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 bg-white"
          >
            <option value="">Todos los países</option>
            {PAISES_DISPONIBLES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultados */}
      {contenedoresFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="h-12 w-12 text-surface-300 mb-3" />
          <p className="text-surface-500 font-medium">No hay contenedores disponibles para este país</p>
          <button
            onClick={() => setPaisFiltro('')}
            className="mt-3 text-sm text-primary-600 hover:underline cursor-pointer"
          >
            Ver todos los contenedores
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {contenedoresFiltrados.map((contenedor) => {
            const pct = porcentajeDisponible(contenedor);
            return (
              <div
                key={contenedor.id}
                className="bg-white border border-surface-200 rounded-2xl p-5 hover:shadow-md hover:border-primary-200 transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Ícono */}
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Package className="h-6 w-6 text-primary-600" />
                  </div>

                  {/* Info principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-bold text-surface-900 text-base">{contenedor.codigo}</h2>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700 border border-success-200">
                        {contenedor.estado}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-surface-500">
                      <span className="flex items-center gap-1">
                        <Coffee className="h-3.5 w-3.5" />
                        Origen: {contenedor.origen}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        Destino: {contenedor.paisDestino}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Disponible: {contenedor.fechaDisponible}
                      </span>
                    </div>

                    {/* Barra de disponibilidad */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-surface-500 mb-1">
                        <span>{contenedor.kgDisponibles.toLocaleString()} kg disponibles</span>
                        <span>{pct}% del contenedor</span>
                      </div>
                      <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Variedades disponibles (chips) */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {contenedor.variedades.map((v) => (
                        <span
                          key={v.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-surface-100 text-surface-600 font-medium"
                        >
                          <Coffee className="h-3 w-3" />
                          {v.nombre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Empresa + botón Ver */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <p className="text-xs text-surface-400">{contenedor.empresa}</p>
                    <button
                      id={`btn-ver-${contenedor.id}`}
                      onClick={() => setContenedorSeleccionado(contenedor)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                      Ver variedades
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de variedades */}
      {contenedorSeleccionado && (
        <VariedadesModal
          isOpen={!!contenedorSeleccionado}
          onClose={() => setContenedorSeleccionado(null)}
          contenedor={contenedorSeleccionado}
          onVerDetalle={(variedad) => {
            setContenedorSeleccionado(null);
            navigate(`/comprador/catalogo/${variedad.id}`, {
              state: { variedad, contenedor: contenedorSeleccionado },
            });
          }}
        />
      )}
    </div>
  );
}
