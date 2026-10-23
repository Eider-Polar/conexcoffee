import { useState } from 'react';
import {
  Plus,
  Search,
  Eye,
  Pencil,
} from 'lucide-react';
import { QueryState } from '@/components/feedback';
import {
  usePreofertas,
  useCrearPreoferta,
  useActualizarPreoferta,
  useLotes,
} from '../hooks/useCaficultorData';
import {
  RegistrarPreOfertaModal,
  EditarPreOfertaModal,
  DetallePreOfertaModal,
} from '../components';

export default function CaficultorPreOfertasPage() {
  const preofertasQuery = usePreofertas();
  const preofertas = preofertasQuery.data ?? [];
  const lotesQuery = useLotes();
  const lotes = lotesQuery.data ?? [];
  const crearPreoferta = useCrearPreoferta();
  const actualizarPreoferta = useActualizarPreoferta();
  const [searchTerm, setSearchTerm] = useState('');

  // Modales
  const [modalRegistro, setModalRegistro] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [preofertaSeleccionada, setPreofertaSeleccionada] = useState(null);
  const [preofertaEdicion, setPreofertaEdicion] = useState(null);

  const preofertasFiltradas = preofertas.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.codigo.toLowerCase().includes(term) ||
      p.variedad.toLowerCase().includes(term) ||
      p.loteNombre.toLowerCase().includes(term) ||
      p.estado.toLowerCase().includes(term)
    );
  });

  const handleGuardarNuevaPreOferta = (nueva) => {
    crearPreoferta.mutate(nueva);
  };

  const handleGuardarEdicionPreOferta = (preofertaActualizada) => {
    actualizarPreoferta.mutate(preofertaActualizada);
  };

  const abrirEdicionPreOferta = (p) => {
    setPreofertaEdicion(p);
    setModalEditar(true);
  };

  const abrirDetallePreOferta = (p) => {
    setPreofertaSeleccionada(p);
    setModalDetalle(true);
  };

  if (preofertasQuery.isLoading || preofertasQuery.isError) {
    return <QueryState query={preofertasQuery} />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Cabecera Oficial */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Pre-Ofertas de Café
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Postulación de café cosechado para revisión técnica, análisis de muestras y validación.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalRegistro(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-terracota hover:bg-brand-terracota-dark text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Pre-Oferta</span>
        </button>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, lote o variedad..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          />
        </div>

        <div className="text-xs text-stone-500 font-semibold self-end md:self-auto">
          Total de registros:{' '}
          <span className="font-extrabold text-brand-terracota">
            {preofertasFiltradas.length}
          </span>
        </div>
      </div>

      {/* Tabla Oficial de Pre-Ofertas */}
      {/* Columnas: N°, Código, Cantidad, Variedad de café (negro), Estado, Acciones (Editar y Ver) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 text-center w-12">N°</th>
                <th className="py-3.5 px-4">Código</th>
                <th className="py-3.5 px-4 text-center">Cantidad (Kg)</th>
                <th className="py-3.5 px-4">Variedad de Café</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {preofertasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-stone-400">
                    No tienes pre-ofertas registradas con ese criterio.
                  </td>
                </tr>
              ) : (
                preofertasFiltradas.map((p, index) => (
                  <tr key={p.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-4 px-4 text-center text-stone-400 font-bold">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-stone-900">
                      <div>{p.codigo}</div>
                      <div className="text-[10px] text-stone-400 font-normal">
                        {p.loteNombre}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-stone-900">
                      {p.cantidadKg.toLocaleString('es-CO')} Kg
                    </td>
                    {/* Variedad de café en color negro según la instrucción */}
                    <td className="py-4 px-4 font-semibold text-stone-900">
                      {p.variedad} ({p.especie})
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          p.estado === 'Aprobada'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.estado === 'En Evaluación'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {p.estado}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => abrirEdicionPreOferta(p)}
                          className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg cursor-pointer"
                          title="Editar Pre-Oferta"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => abrirDetallePreOferta(p)}
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
      <RegistrarPreOfertaModal
        isOpen={modalRegistro}
        onClose={() => setModalRegistro(false)}
        lotes={lotes}
        onGuardar={handleGuardarNuevaPreOferta}
      />

      {modalEditar && preofertaEdicion && (
        <EditarPreOfertaModal
          key={preofertaEdicion.id}
          isOpen={modalEditar}
          onClose={() => setModalEditar(false)}
          preoferta={preofertaEdicion}
          onGuardar={handleGuardarEdicionPreOferta}
        />
      )}

      <DetallePreOfertaModal
        isOpen={modalDetalle}
        onClose={() => setModalDetalle(false)}
        preoferta={preofertaSeleccionada}
      />
    </div>
  );
}
