import { useState } from 'react';
import {
  Gift,
  Search,
  Eye,
  FileDown,
  X,
  Layers,
  Award,
} from 'lucide-react';
import ModuloCabecera from '../components/ModuloCabecera';

const INITIAL_OFERTAS = [
  {
    id: 1,
    codigo: 'OFR-HUILA-001',
    cantidad: 1500.0, // kg
    variedadCafe: 'Pink Bourbon',
    puntajeSca: 88.5,
    proceso: 'Honey Anaeróbico',
    precioKg: 18.5, // USD
    caficultor: 'Miguel Florez',
    empresa: 'Café Especial Huila SAS',
    estado: 'Publicada',
    notasCata: 'Jazmín, frutos rojos, acidez fosfórica brillante y postgusto dulce prolongado.',
  },
  {
    id: 2,
    codigo: 'OFR-CAUCA-024',
    cantidad: 2400.0,
    variedadCafe: 'Castillo / Colombia',
    puntajeSca: 86.0,
    proceso: 'Lavado Tradicional',
    precioKg: 12.0,
    caficultor: 'Pedro Prueba',
    empresa: 'Exportadora Andina de Café',
    estado: 'Negociación',
    notasCata: 'Panela, cítricos dulces, chocolate con leche y cuerpo cremoso.',
  },
  {
    id: 3,
    codigo: 'OFR-NARINO-089',
    cantidad: 800.0,
    variedadCafe: 'Geisha de Altura',
    puntajeSca: 90.2,
    proceso: 'Natural 96h',
    precioKg: 35.0,
    caficultor: 'María del Rosario Ruiz',
    empresa: 'Origen Café Colombia',
    estado: 'Vendida',
    notasCata: 'Floral intenso, bergamota, melocotón maduro y acidez málica compleja.',
  },
];

const INITIAL_PREOFERTAS = [
  {
    id: 1,
    codigo: 'PRE-TOLIMA-012',
    caficultor: 'Jorge Enrique Martínez',
    finca: 'Finca La Colina',
    variedad: 'Caturra Orgánico',
    cantidadEstimada: 1200,
    estado: 'En Catación',
  },
  {
    id: 2,
    codigo: 'PRE-HUILA-055',
    caficultor: 'Ana Lucía Pérez',
    finca: 'Finca El Mirador',
    variedad: 'Bourbon Rosado',
    cantidadEstimada: 900,
    estado: 'Muestra Enviada',
  },
];

export default function OfertasPage() {
  const [pestanaActiva, setPestanaActiva] = useState('ofertas');
  const [ofertas] = useState(INITIAL_OFERTAS);
  const [preofertas] = useState(INITIAL_PREOFERTAS);
  const [searchTerm, setSearchTerm] = useState('');

  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [ofertaActual, setOfertaActual] = useState(null);

  const abrirDetalles = (o) => {
    setOfertaActual(o);
    setModalDetalleAbierto(true);
  };

  const descargarFichaPdf = (o) => {
    alert(`Generando y descargando Ficha Técnica PDF para la oferta ${o.codigo} (Certificado SCA)...`);
  };

  const ofertasFiltradas = ofertas.filter((o) => {
    const term = searchTerm.toLowerCase();
    return (
      o.codigo.toLowerCase().includes(term) ||
      o.variedadCafe.toLowerCase().includes(term) ||
      o.caficultor.toLowerCase().includes(term) ||
      o.estado.toLowerCase().includes(term)
    );
  });

  const preofertasFiltradas = preofertas.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.codigo.toLowerCase().includes(term) ||
      p.caficultor.toLowerCase().includes(term) ||
      p.variedad.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Cabecera idéntica a components.cabecera-modulo con portada oferta.jpg */}
      <ModuloCabecera
        titulo="Ofertas y Pre-ofertas"
        subtitulo="Lotes calificados listos para subasta internacional y órdenes de compra directa"
        imagenPortada="/images/portadas/oferta.jpg"
        mensaje="En este modulo podras ver la información detallada de cada una de tus ofertas."
        icono={Gift}
        totalRegistros={pestanaActiva === 'ofertas' ? ofertasFiltradas.length : preofertasFiltradas.length}
      />

      {/* Pestañas Submódulos */}
      <div className="flex items-center justify-between border-b border-surface-200">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPestanaActiva('ofertas')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              pestanaActiva === 'ofertas'
                ? 'border-[#AD2E01] text-[#AD2E01]'
                : 'border-transparent text-surface-500 hover:text-surface-800'
            }`}
          >
            <Gift className="h-4 w-4" />
            Ofertas en Firme ({ofertas.length})
          </button>
          <button
            type="button"
            onClick={() => setPestanaActiva('preofertas')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              pestanaActiva === 'preofertas'
                ? 'border-[#AD2E01] text-[#AD2E01]'
                : 'border-transparent text-surface-500 hover:text-surface-800'
            }`}
          >
            <Layers className="h-4 w-4" />
            Pre-Ofertas en Evaluación ({preofertas.length})
          </button>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-2xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Buscar por código, variedad o estado…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-[#AD2E01]/20 focus:border-[#AD2E01]"
          />
        </div>
      </div>

      {/* TABLA OFICIAL OFERTAS: Nº, CODIGO, CANTIDAD, VARIEDAD DE CAFE, ESTADO, ACCIONES */}
      {pestanaActiva === 'ofertas' && (
        <div className="bg-white rounded-2xl border border-surface-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface-50 border-b border-surface-200 text-surface-600 uppercase text-xs tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-bold w-12 text-center">Nº</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Código</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Cantidad (kg)</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Variedad de Café</th>
                  <th scope="col" className="px-5 py-3.5 font-bold text-center">Puntaje SCA</th>
                  <th scope="col" className="px-5 py-3.5 font-bold text-center">Estado</th>
                  <th scope="col" className="px-5 py-3.5 font-bold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {ofertasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-surface-500">
                      No se encontraron ofertas registradas.
                    </td>
                  </tr>
                ) : (
                  ofertasFiltradas.map((o, index) => (
                    <tr key={o.id} className="hover:bg-surface-50/80 transition-colors">
                      <td className="px-4 py-3.5 text-center font-bold text-surface-500 text-xs">
                        {index + 1}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-surface-900">
                        {o.codigo}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-surface-800">
                        {o.cantidad.toLocaleString('es-CO')} kg
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-surface-800 block">{o.variedadCafe}</span>
                        <span className="text-[11px] text-surface-500">{o.proceso}</span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-[#FFF1ED] text-[#AD2E01] border border-[#AD2E01]/30">
                          <Award className="h-3 w-3" />
                          {o.puntajeSca} pts
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            o.estado === 'Publicada'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : o.estado === 'Negociación'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {o.estado}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => abrirDetalles(o)}
                            title="Ver Detalles"
                            className="p-1.5 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => descargarFichaPdf(o)}
                            title="Descargar Ficha Técnica PDF"
                            className="p-1.5 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-[#AD2E01] hover:border-[#AD2E01]/30 hover:bg-[#FFF1ED] transition-colors cursor-pointer shadow-2xs"
                          >
                            <FileDown className="h-4 w-4" />
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
      )}

      {/* TABLA PRE-OFERTAS */}
      {pestanaActiva === 'preofertas' && (
        <div className="bg-white rounded-2xl border border-surface-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface-50 border-b border-surface-200 text-surface-600 uppercase text-xs tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-bold w-12 text-center">Nº</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Código Pre-oferta</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Caficultor</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Finca</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Variedad</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Estimado (kg)</th>
                  <th scope="col" className="px-5 py-3.5 font-bold text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {preofertasFiltradas.map((p, index) => (
                  <tr key={p.id} className="hover:bg-surface-50/80 transition-colors">
                    <td className="px-4 py-3.5 text-center font-bold text-surface-500 text-xs">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-surface-900">
                      {p.codigo}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-surface-800">
                      {p.caficultor}
                    </td>
                    <td className="px-5 py-3.5 text-surface-600 text-xs">
                      {p.finca}
                    </td>
                    <td className="px-5 py-3.5 text-surface-700">
                      {p.variedad}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-surface-800">
                      {p.cantidadEstimada.toLocaleString('es-CO')} kg
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL DETALLES OFERTA */}
      {modalDetalleAbierto && ofertaActual && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#FFF1ED] text-[#AD2E01] flex items-center justify-center">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900 font-mono">{ofertaActual.codigo}</h3>
                  <span className="text-xs text-surface-500">{ofertaActual.empresa}</span>
                </div>
              </div>
              <button
                onClick={() => setModalDetalleAbierto(false)}
                className="p-1 rounded-lg text-surface-400 hover:bg-surface-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-surface-50 p-3 rounded-xl border border-surface-200 text-xs">
                <div>
                  <span className="text-surface-500 block">Variedad</span>
                  <span className="font-semibold text-surface-800">{ofertaActual.variedadCafe}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Proceso</span>
                  <span className="font-semibold text-surface-800">{ofertaActual.proceso}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Puntaje Catación SCA</span>
                  <span className="font-bold text-[#AD2E01]">{ofertaActual.puntajeSca} puntos</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Precio / kg</span>
                  <span className="font-bold text-emerald-700">${ofertaActual.precioKg} USD</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Cantidad Total</span>
                  <span className="font-semibold text-surface-800">{ofertaActual.cantidad} kg</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Productor</span>
                  <span className="font-semibold text-surface-800">{ofertaActual.caficultor}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-surface-700 block mb-1">Notas Sensoriales de Cata</span>
                <p className="text-xs text-surface-700 bg-surface-50 p-3 rounded-lg border border-surface-100 italic leading-relaxed">
                  "{ofertaActual.notasCata}"
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <button
                type="button"
                onClick={() => descargarFichaPdf(ofertaActual)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#AD2E01] hover:bg-[#8D2501] text-white text-xs font-semibold shadow-sm cursor-pointer"
              >
                <FileDown className="h-4 w-4" />
                Descargar Ficha PDF
              </button>
              <button
                type="button"
                onClick={() => setModalDetalleAbierto(false)}
                className="px-4 py-2 rounded-xl bg-surface-900 text-white text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
