import { useState } from 'react';
import {
  Plus,
  Search,
  Eye,
  Pencil,
} from 'lucide-react';
import { QueryState } from '@/components/feedback';
import { useFincas, useCrearFinca, useActualizarFinca } from '../hooks/useCaficultorData';
import {
  RegistrarFincaModal,
  EditarFincaModal,
  DetalleFincaModal,
} from '../components';

export default function CaficultorFincasPage() {
  const fincasQuery = useFincas();
  const fincas = fincasQuery.data ?? [];
  const crearFinca = useCrearFinca();
  const actualizarFinca = useActualizarFinca();
  const [searchTerm, setSearchTerm] = useState('');

  // Modales
  const [modalRegistroFinca, setModalRegistroFinca] = useState(false);
  const [modalEditarFinca, setModalEditarFinca] = useState(false);
  const [modalDetalleFinca, setModalDetalleFinca] = useState(false);
  const [fincaSeleccionada, setFincaSeleccionada] = useState(null);
  const [fincaEdicion, setFincaEdicion] = useState(null);

  const fincasFiltradas = fincas.filter((f) => {
    const term = searchTerm.toLowerCase();
    return (
      f.nombre.toLowerCase().includes(term) ||
      f.municipio.toLowerCase().includes(term) ||
      f.departamento.toLowerCase().includes(term)
    );
  });

  const handleGuardarNuevaFinca = (nuevaFinca) => {
    crearFinca.mutate(nuevaFinca);
  };

  const handleGuardarEdicionFinca = (fincaActualizada) => {
    actualizarFinca.mutate(fincaActualizada);
  };

  const abrirEdicionFinca = (f) => {
    setFincaEdicion(f);
    setModalEditarFinca(true);
  };

  const abrirDetalleFinca = (f) => {
    setFincaSeleccionada(f);
    setModalDetalleFinca(true);
  };

  if (fincasQuery.isLoading || fincasQuery.isError) {
    return <QueryState query={fincasQuery} />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Cabecera Oficial */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Mis Fincas
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Administración de tus predios cafeteros, altitudes y áreas de cultivo.
          </p>
        </div>

        {/* Solo botón Registrar Finca */}
        <div>
          <button
            type="button"
            onClick={() => setModalRegistroFinca(true)}
            className="px-4 py-2.5 rounded-xl bg-[#AD2E01] hover:bg-[#8D2501] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Finca</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar finca por nombre o municipio..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          />
        </div>

        <div className="text-xs text-stone-500 font-semibold self-end md:self-auto">
          Total de registros:{' '}
          <span className="font-extrabold text-[#AD2E01]">{fincasFiltradas.length}</span>
        </div>
      </div>

      {/* Tabla Oficial de Fincas */}
      {/* Columnas: N° de finca, Nombre (sin subtítulo), Altura, Área de café, Acciones (Editar y Ver) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 text-center w-12">N°</th>
                <th className="py-3.5 px-4">Nombre de la Finca</th>
                <th className="py-3.5 px-4">Altura (msnm)</th>
                <th className="py-3.5 px-4">Área de Café</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {fincasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-stone-400">
                    No tienes fincas registradas con ese criterio.
                  </td>
                </tr>
              ) : (
                fincasFiltradas.map((f, index) => (
                  <tr key={f.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-4 px-4 text-center text-stone-400 font-bold">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-bold text-stone-900 text-sm">
                      {f.nombre}
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-stone-800">
                      {f.altura.toLocaleString('es-CO')} msnm
                    </td>
                    <td className="py-4 px-4 font-semibold text-stone-900">
                      {f.areaCafe.toLocaleString('es-CO', { minimumFractionDigits: 1 })} ha
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => abrirEdicionFinca(f)}
                          className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg cursor-pointer"
                          title="Editar Finca"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => abrirDetalleFinca(f)}
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
      <RegistrarFincaModal
        isOpen={modalRegistroFinca}
        onClose={() => setModalRegistroFinca(false)}
        onGuardar={handleGuardarNuevaFinca}
      />

      {modalEditarFinca && fincaEdicion && (
        <EditarFincaModal
          key={fincaEdicion.id}
          isOpen={modalEditarFinca}
          onClose={() => setModalEditarFinca(false)}
          finca={fincaEdicion}
          onGuardar={handleGuardarEdicionFinca}
        />
      )}

      <DetalleFincaModal
        isOpen={modalDetalleFinca}
        onClose={() => setModalDetalleFinca(false)}
        finca={fincaSeleccionada}
      />
    </div>
  );
}
