import { useState } from 'react';
import {
  Plus,
  Search,
  Eye,
  Pencil,
} from 'lucide-react';
import { QueryState } from '@/components/feedback';
import {
  useLotes,
  useCrearLote,
  useActualizarLote,
  useFincas,
} from '../hooks/useCaficultorData';
import {
  RegistrarLoteModal,
  EditarLoteModal,
  DetalleLoteModal,
} from '../components';

export default function CaficultorLotesPage() {
  const lotesQuery = useLotes();
  const lotes = lotesQuery.data ?? [];
  const fincasQuery = useFincas();
  const fincas = fincasQuery.data ?? [];
  const crearLote = useCrearLote();
  const actualizarLote = useActualizarLote();
  const [searchTerm, setSearchTerm] = useState('');

  // Modales
  const [modalRegistroLote, setModalRegistroLote] = useState(false);
  const [modalEditarLote, setModalEditarLote] = useState(false);
  const [modalDetalleLote, setModalDetalleLote] = useState(false);
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);
  const [loteEdicion, setLoteEdicion] = useState(null);

  const lotesFiltrados = lotes.filter((l) => {
    const term = searchTerm.toLowerCase();
    return (
      l.nombreLote.toLowerCase().includes(term) ||
      l.variedad.toLowerCase().includes(term) ||
      l.fincaNombre.toLowerCase().includes(term)
    );
  });

  const handleGuardarNuevoLote = (nuevoLote) => {
    crearLote.mutate(nuevoLote);
  };

  const handleGuardarEdicionLote = (loteActualizado) => {
    actualizarLote.mutate(loteActualizado);
  };

  const abrirEdicionLote = (l) => {
    setLoteEdicion(l);
    setModalEditarLote(true);
  };

  const abrirDetalleLote = (l) => {
    setLoteSeleccionado(l);
    setModalDetalleLote(true);
  };

  if (lotesQuery.isLoading || lotesQuery.isError) {
    return <QueryState query={lotesQuery} />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Cabecera Oficial */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Mis Lotes
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Gestión de parcelas y lotes agronómicos, variedades cultivadas y densidad de siembra.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalRegistroLote(true)}
          className="px-4 py-2.5 rounded-xl bg-[#AD2E01] hover:bg-[#8D2501] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Lote</span>
        </button>
      </div>

      {/* Barra de Búsqueda y Contador */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por lote, variedad o finca..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          />
        </div>

        <div className="text-xs text-stone-500 font-semibold self-end md:self-auto">
          Total de registros:{' '}
          <span className="font-extrabold text-[#AD2E01]">{lotesFiltrados.length}</span>
        </div>
      </div>

      {/* Tabla Oficial de Lotes */}
      {/* Columnas: N° del lote, Lote, Variedad de café (en color negro), Número de árboles, Distancia de árboles, Finca, Acciones (Editar y Ver) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 text-center w-12">N°</th>
                <th className="py-3.5 px-4">Lote</th>
                <th className="py-3.5 px-4">Variedad de Café</th>
                <th className="py-3.5 px-4 text-center">Número de Árboles</th>
                <th className="py-3.5 px-4 text-center">Distancia de Árboles</th>
                <th className="py-3.5 px-4">Finca</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {lotesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-stone-400">
                    No tienes lotes registrados con esos criterios.
                  </td>
                </tr>
              ) : (
                lotesFiltrados.map((l, index) => (
                  <tr key={l.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-4 px-4 text-center text-stone-400 font-bold">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-bold text-stone-900">
                      {l.nombreLote}
                    </td>
                    {/* Variedad en color negro como solicitó el usuario */}
                    <td className="py-4 px-4 font-semibold text-stone-900">
                      {l.variedad} ({l.especie})
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-stone-800">
                      {l.numeroArboles ? l.numeroArboles.toLocaleString('es-CO') : '—'}
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-stone-700">
                      {l.distanciaArboles ? `${l.distanciaArboles} m` : '—'}
                    </td>
                    <td className="py-4 px-4 font-medium text-stone-800">
                      {l.fincaNombre}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => abrirEdicionLote(l)}
                          className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg cursor-pointer"
                          title="Editar Lote"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => abrirDetalleLote(l)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                          title="Ver Detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Componentes Modales Modulares */}
      <RegistrarLoteModal
        isOpen={modalRegistroLote}
        onClose={() => setModalRegistroLote(false)}
        fincas={fincas}
        onGuardar={handleGuardarNuevoLote}
      />

      {modalEditarLote && loteEdicion && (
        <EditarLoteModal
          key={loteEdicion.id}
          isOpen={modalEditarLote}
          onClose={() => setModalEditarLote(false)}
          lote={loteEdicion}
          onGuardar={handleGuardarEdicionLote}
        />
      )}

      <DetalleLoteModal
        isOpen={modalDetalleLote}
        onClose={() => setModalDetalleLote(false)}
        lote={loteSeleccionado}
      />
    </div>
  );
}
