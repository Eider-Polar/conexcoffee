import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Eye,
  Globe,
} from 'lucide-react';
import { QueryState } from '@/components/feedback';
import { useOfertas } from '../hooks/useCaficultorData';
import { DetalleOfertaModal } from '../components';

export default function CaficultorOfertasPage() {
  const navigate = useNavigate();
  const ofertasQuery = useOfertas();
  const ofertas = ofertasQuery.data ?? [];
  const [searchTerm, setSearchTerm] = useState('');

  const [modalDetalle, setModalDetalle] = useState(false);
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);

  const ofertasFiltradas = ofertas.filter((o) => {
    const term = searchTerm.toLowerCase();
    return (
      o.codigo.toLowerCase().includes(term) ||
      o.variedad.toLowerCase().includes(term) ||
      o.estado.toLowerCase().includes(term)
    );
  });

  const abrirDetalleOferta = (o) => {
    setOfertaSeleccionada(o);
    setModalDetalle(true);
  };

  if (ofertasQuery.isLoading || ofertasQuery.isError) {
    return <QueryState query={ofertasQuery} />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Cabecera Oficial */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Ofertas de Café
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Lotes aprobados y publicados para empresas exportadoras y compradores internacionales.
          </p>
        </div>

        {/* Botón de Sitio Web / Página Web (NO botón de registro) */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Globe className="w-4 h-4 text-stone-300" />
          <span>Ver en Página Web</span>
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
            placeholder="Buscar oferta por código o variedad..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          />
        </div>

        <div className="text-xs text-stone-500 font-semibold self-end md:self-auto">
          Total de registros:{' '}
          <span className="font-extrabold text-brand-terracota">{ofertasFiltradas.length}</span>
        </div>
      </div>

      {/* Tabla Oficial de Ofertas */}
      {/* Columnas: N°, Código, Cantidad, Variedad de café (negro), Estado, Acciones */}
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
              {ofertasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-stone-400">
                    No tienes ofertas registradas con ese criterio.
                  </td>
                </tr>
              ) : (
                ofertasFiltradas.map((o, index) => (
                  <tr key={o.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-4 px-4 text-center text-stone-400 font-bold">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-stone-900">
                      <div>{o.codigo}</div>
                      <div className="text-[10px] text-stone-400 font-normal">
                        {o.fincaNombre}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-stone-900">
                      {o.cantidadKg.toLocaleString('es-CO')} Kg
                    </td>
                    {/* Variedad de café en color negro según la instrucción */}
                    <td className="py-4 px-4 font-semibold text-stone-900">
                      {o.variedad} ({o.especie})
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        {o.estado}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => abrirDetalleOferta(o)}
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

      {/* Componente Modal Modular */}
      <DetalleOfertaModal
        isOpen={modalDetalle}
        onClose={() => setModalDetalle(false)}
        oferta={ofertaSeleccionada}
      />
    </div>
  );
}
