import { useState } from 'react';
import ModuloCabecera from '../components/ModuloCabecera';
import {
  Search,
  Eye,
  ShoppingBag,
  Users,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Pencil,
  Plus,
  Globe2,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Datos de Compras / Pedidos basados en livewire/compras/historial-compras-component.blade.php
const INITIAL_PEDIDOS = [
  {
    id: 1,
    codigo_pedido: 'ORD-2026-0814',
    fecha: '2026-08-14',
    comprador_nombre: 'John Smith',
    comprador_empresa: 'Blue Coffee Roasters Inc.',
    pais_destino: 'Estados Unidos (San Francisco)',
    lotes: [
      { codigo: 'OFR-HUILA-001', variedad: 'Pink Bourbon', cantidad_sacos: 25, peso_kg: 1500, precio_kg: 9.8 },
      { codigo: 'OFR-CAUCA-014', variedad: 'Geisha Lavado', cantidad_sacos: 10, peso_kg: 600, precio_kg: 14.5 },
    ],
    subtotal: 23400.0,
    flete: 1250.0,
    total: 24650.0,
    estado: 'Pago aceptado',
    metodo_pago: 'Transferencia Bancaria Internacional (SWIFT)',
    referencia_pago: 'SWIFT-US7849102',
    naviera: 'Maersk Sealand - Línea Buenaventura',
  },
  {
    id: 2,
    codigo_pedido: 'ORD-2026-0820',
    fecha: '2026-08-20',
    comprador_nombre: 'Hans Weber',
    comprador_empresa: 'Hamburg Kaffee Import GmbH',
    pais_destino: 'Alemania (Hamburgo)',
    lotes: [
      { codigo: 'OFR-NAR-003', variedad: 'Castillo Fermentado', cantidad_sacos: 30, peso_kg: 1800, precio_kg: 8.2 },
    ],
    subtotal: 14760.0,
    flete: 980.0,
    total: 15740.0,
    estado: 'Compra en camino',
    metodo_pago: 'Carta de Crédito Irrevocable (L/C)',
    referencia_pago: 'LC-DE998231',
    naviera: 'Hapag-Lloyd - Puerto Cartagena',
  },
  {
    id: 3,
    codigo_pedido: 'ORD-2026-0829',
    fecha: '2026-08-29',
    comprador_nombre: 'Kenji Takahashi',
    comprador_empresa: 'Tokyo Specialty Bean Co.',
    pais_destino: 'Japón (Yokohama)',
    lotes: [
      { codigo: 'OFR-ANT-008', variedad: 'Bourbon Chiroso', cantidad_sacos: 20, peso_kg: 1200, precio_kg: 12.0 },
    ],
    subtotal: 14400.0,
    flete: 1400.0,
    total: 15800.0,
    estado: 'Pago pendiente',
    metodo_pago: 'Transferencia Bancaria Internacional',
    referencia_pago: 'Pendiente de confirmación',
    naviera: 'ONE Ocean Network Express',
  },
  {
    id: 4,
    codigo_pedido: 'ORD-2026-0902',
    fecha: '2026-09-02',
    comprador_nombre: 'Sophie Laurent',
    comprador_empresa: 'Cafés de Terroir Paris',
    pais_destino: 'Francia (Le Havre)',
    lotes: [
      { codigo: 'OFR-HUILA-005', variedad: 'Caturra Chiroso', cantidad_sacos: 15, peso_kg: 900, precio_kg: 10.5 },
    ],
    subtotal: 9450.0,
    flete: 850.0,
    total: 10300.0,
    estado: 'Entregado',
    metodo_pago: 'Stripe / Tarjeta Corporativa',
    referencia_pago: 'ch_3NzK81LEe92X',
    naviera: 'CMA CGM - Cartagena',
  },
  {
    id: 5,
    codigo_pedido: 'ORD-2026-0906',
    fecha: '2026-09-06',
    comprador_nombre: 'Liam O’Connor',
    comprador_empresa: 'Dublin Artisan Roasters',
    pais_destino: 'Irlanda (Dublín)',
    lotes: [
      { codigo: 'OFR-TOL-002', variedad: 'Geisha Natural', cantidad_sacos: 8, peso_kg: 480, precio_kg: 16.0 },
    ],
    subtotal: 7680.0,
    flete: 620.0,
    total: 8300.0,
    estado: 'Pago rechazado',
    metodo_pago: 'Transferencia Rechazada por Límite',
    referencia_pago: 'REJ-IRL-9921',
    naviera: 'Por asignar',
  },
];

// Datos de Compradores basados en modulos/compradores/
const INITIAL_COMPRADORES = [
  {
    id: 1,
    numero_identificacion: 'US-9823412',
    tipo_documento: 'PAS',
    primer_nombre: 'JOHN',
    segundo_nombre: 'DAVID',
    primer_apellido: 'SMITH',
    segundo_apellido: 'MILLER',
    telefono: '+1 415 892 3411',
    correo: 'john.smith@bluecoffeeroasters.com',
    empresa: 'Blue Coffee Roasters Inc.',
    pais: 'Estados Unidos',
    ciudad: 'San Francisco, CA',
    pedidos_totales: 14,
    volumen_kg: 25200,
    estado: 'Activo',
  },
  {
    id: 2,
    numero_identificacion: 'DE-4581290',
    tipo_documento: 'PAS',
    primer_nombre: 'HANS',
    segundo_nombre: 'PETER',
    primer_apellido: 'WEBER',
    segundo_apellido: 'KLEIN',
    telefono: '+49 40 7654 3210',
    correo: 'h.weber@hamburgkaffee.de',
    empresa: 'Hamburg Kaffee Import GmbH',
    pais: 'Alemania',
    ciudad: 'Hamburgo',
    pedidos_totales: 8,
    volumen_kg: 16800,
    estado: 'Activo',
  },
  {
    id: 3,
    numero_identificacion: 'JP-1192834',
    tipo_documento: 'PAS',
    primer_nombre: 'KENJI',
    segundo_nombre: '',
    primer_apellido: 'TAKAHASHI',
    segundo_apellido: 'SATO',
    telefono: '+81 3 5555 0192',
    correo: 'takahashi@tokyospecialty.jp',
    empresa: 'Tokyo Specialty Bean Co.',
    pais: 'Japón',
    ciudad: 'Tokio',
    pedidos_totales: 22,
    volumen_kg: 39000,
    estado: 'Activo',
  },
  {
    id: 4,
    numero_identificacion: 'FR-8829104',
    tipo_documento: 'PAS',
    primer_nombre: 'SOPHIE',
    segundo_nombre: 'MARIE',
    primer_apellido: 'LAURENT',
    segundo_apellido: 'DUBOIS',
    telefono: '+33 1 42 68 55 00',
    correo: 'slaurent@cafesdeterroir.fr',
    empresa: 'Cafés de Terroir Paris',
    pais: 'Francia',
    ciudad: 'París',
    pedidos_totales: 6,
    volumen_kg: 9200,
    estado: 'Activo',
  },
  {
    id: 5,
    numero_identificacion: 'GB-3349182',
    tipo_documento: 'PAS',
    primer_nombre: 'LIAM',
    segundo_nombre: '',
    primer_apellido: 'O’CONNOR',
    segundo_apellido: '',
    telefono: '+353 1 496 2200',
    correo: 'liam@dublinartisan.ie',
    empresa: 'Dublin Artisan Roasters',
    pais: 'Irlanda',
    ciudad: 'Dublín',
    pedidos_totales: 4,
    volumen_kg: 5400,
    estado: 'Activo',
  },
];

export default function ComprasPage() {
  const [pestanaActiva, setPestanaActiva] = useState('compras'); // 'compras' | 'compradores'

  // Datos
  const [pedidos] = useState(INITIAL_PEDIDOS);
  const [compradores, setCompradores] = useState(INITIAL_COMPRADORES);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Modales
  const [modalDetallePedido, setModalDetallePedido] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const [modalRegistrarComprador, setModalRegistrarComprador] = useState(false);
  const [modalEditarComprador, setModalEditarComprador] = useState(false);
  const [modalDetalleComprador, setModalDetalleComprador] = useState(false);
  const [modalConsultarComprador, setModalConsultarComprador] = useState(false);
  const [compradorSeleccionado, setCompradorSeleccionado] = useState(null);

  // Consulta rápida
  const [cedulaConsulta, setCedulaConsulta] = useState('');
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  // Formulario nuevo comprador
  const [nuevoComprador, setNuevoComprador] = useState({
    numero_identificacion: '',
    tipo_documento: 'PAS',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    telefono: '',
    correo: '',
    empresa: '',
    pais: 'Estados Unidos',
    ciudad: '',
  });

  // Filtrado de pedidos
  const pedidosFiltrados = pedidos.filter((p) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      p.codigo_pedido.toLowerCase().includes(term) ||
      p.comprador_nombre.toLowerCase().includes(term) ||
      p.comprador_empresa.toLowerCase().includes(term) ||
      p.pais_destino.toLowerCase().includes(term);

    const matchesEstado =
      filtroEstado === 'todos' || p.estado.toLowerCase() === filtroEstado.toLowerCase();

    return matchesSearch && matchesEstado;
  });

  // Filtrado de compradores
  const compradoresFiltrados = compradores.filter((c) => {
    const term = searchTerm.toLowerCase();
    const fullName = `${c.primer_nombre} ${c.segundo_nombre} ${c.primer_apellido} ${c.segundo_apellido}`.toLowerCase();
    return (
      c.numero_identificacion.toLowerCase().includes(term) ||
      fullName.includes(term) ||
      c.empresa.toLowerCase().includes(term) ||
      c.pais.toLowerCase().includes(term) ||
      c.correo.toLowerCase().includes(term)
    );
  });

  // Guardar nuevo comprador
  const handleGuardarComprador = (e) => {
    e.preventDefault();
    if (!nuevoComprador.numero_identificacion || !nuevoComprador.primer_nombre || !nuevoComprador.primer_apellido) {
      toast.error('Complete los campos obligatorios (*)');
      return;
    }

    const nuevo = {
      id: Date.now(),
      ...nuevoComprador,
      primer_nombre: nuevoComprador.primer_nombre.toUpperCase(),
      segundo_nombre: nuevoComprador.segundo_nombre.toUpperCase(),
      primer_apellido: nuevoComprador.primer_apellido.toUpperCase(),
      segundo_apellido: nuevoComprador.segundo_apellido.toUpperCase(),
      pedidos_totales: 0,
      volumen_kg: 0,
      estado: 'Activo',
    };

    setCompradores([nuevo, ...compradores]);
    toast.success('Comprador internacional registrado correctamente');
    setModalRegistrarComprador(false);
    setNuevoComprador({
      numero_identificacion: '',
      tipo_documento: 'PAS',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      telefono: '',
      correo: '',
      empresa: '',
      pais: 'Estados Unidos',
      ciudad: '',
    });
  };

  // Guardar edición comprador
  const handleGuardarEdicionComprador = (e) => {
    e.preventDefault();
    if (!compradorSeleccionado) return;
    setCompradores((prev) =>
      prev.map((c) => (c.id === compradorSeleccionado.id ? compradorSeleccionado : c))
    );
    toast.success('Comprador actualizado correctamente');
    setModalEditarComprador(false);
  };

  // Consultar comprador por documento
  const handleConsultarComprador = (e) => {
    e.preventDefault();
    const encontrado = compradores.find(
      (c) => c.numero_identificacion.trim().toLowerCase() === cedulaConsulta.trim().toLowerCase()
    );
    if (encontrado) {
      setResultadoConsulta(encontrado);
      toast.success('Comprador encontrado');
    } else {
      setResultadoConsulta(null);
      toast.error('No se encontró ningún comprador con esa identificación');
    }
  };

  // Badge de estado de compra
  const renderBadgeEstado = (estado) => {
    switch (estado) {
      case 'Pago aceptado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pago aceptado
          </span>
        );
      case 'Compra en camino':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Truck className="w-3.5 h-3.5" /> Compra en camino
          </span>
        );
      case 'Pago pendiente':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pago pendiente
          </span>
        );
      case 'Entregado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Entregado
          </span>
        );
      case 'Pago rechazado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Pago rechazado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
            {estado}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabecera idéntica al componente Blade original (portada comprador.jpg) */}
      <ModuloCabecera
        titulo="Compras y Compradores"
        subtitulo="Gestión centralizada de pedidos internacionales, transacciones de café y cartera de compradores"
        imagen="/images/portadas/comprador.jpg"
        mensajeInfo="En este módulo podrás visualizar tus pedidos y gestionar la información detallada de cada uno de tus compradores."
        totalRegistros={pestanaActiva === 'compras' ? pedidos.length : compradores.length}
        textoBotonRegistrar="Registrar Comprador"
        textoBotonConsultar="Consultar Comprador"
        onRegistrar={() => setModalRegistrarComprador(true)}
        onConsultar={() => {
          setCedulaConsulta('');
          setResultadoConsulta(null);
          setModalConsultarComprador(true);
        }}
      />

      {/* Pestañas de Navegación: Compras / Pedidos vs Compradores */}
      <div className="flex border-b border-stone-200 gap-8">
        <button
          onClick={() => {
            setPestanaActiva('compras');
            setSearchTerm('');
          }}
          className={`pb-3.5 text-sm font-bold flex items-center gap-2 relative transition-colors ${
            pestanaActiva === 'compras'
              ? 'text-amber-800 border-b-2 border-amber-800'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Historial de Compras y Pedidos ({pedidos.length})</span>
        </button>

        <button
          onClick={() => {
            setPestanaActiva('compradores');
            setSearchTerm('');
          }}
          className={`pb-3.5 text-sm font-bold flex items-center gap-2 relative transition-colors ${
            pestanaActiva === 'compradores'
              ? 'text-amber-800 border-b-2 border-amber-800'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Directorio de Compradores ({compradores.length})</span>
        </button>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              pestanaActiva === 'compras'
                ? 'Buscar por código, comprador, país...'
                : 'Buscar por cédula, nombre, empresa, país...'
            }
            className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
          />
        </div>

        {pestanaActiva === 'compras' && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-medium text-stone-500">Estado Pedido:</span>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="text-sm border border-stone-200 rounded-xl px-3 py-2 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
            >
              <option value="todos">Todos los estados</option>
              <option value="pago aceptado">Pago aceptado</option>
              <option value="compra en camino">Compra en camino</option>
              <option value="pago pendiente">Pago pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="pago rechazado">Pago rechazado</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: HISTORIAL DE COMPRAS / PEDIDOS */}
      {pestanaActiva === 'compras' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nº</th>
                  <th className="py-3 px-4">Código Pedido</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Comprador / Empresa</th>
                  <th className="py-3 px-4">Destino</th>
                  <th className="py-3 px-4 text-right">Total (USD)</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pedidosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-stone-400">
                      No se encontraron pedidos que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  pedidosFiltrados.map((pedido, index) => (
                    <tr key={pedido.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-4 text-stone-500 font-medium">{index + 1}</td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        <div className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                          <span>{pedido.codigo_pedido}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-600 text-xs">{pedido.fecha}</td>
                      <td className="py-3 px-4 text-stone-800">
                        <span className="font-semibold block text-xs">{pedido.comprador_nombre}</span>
                        <span className="text-[11px] text-stone-500">{pedido.comprador_empresa}</span>
                      </td>
                      <td className="py-3 px-4 text-stone-600 text-xs">
                        <div className="flex items-center gap-1">
                          <Globe2 className="w-3 h-3 text-stone-400" />
                          <span>{pedido.pais_destino}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-stone-900">
                        ${pedido.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-center">{renderBadgeEstado(pedido.estado)}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            setPedidoSeleccionado(pedido);
                            setModalDetallePedido(true);
                          }}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Ver detalle del pedido"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
            <span>
              Total pedidos: <b>{pedidosFiltrados.length}</b> de {pedidos.length}
            </span>
            <span className="text-stone-400">Página 1 de 1</span>
          </div>
        </div>
      )}

      {/* TAB 2: DIRECTORIO DE COMPRADORES */}
      {pestanaActiva === 'compradores' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nº</th>
                  <th className="py-3 px-4">Identificación</th>
                  <th className="py-3 px-4">Nombres</th>
                  <th className="py-3 px-4">Apellidos</th>
                  <th className="py-3 px-4">Teléfono</th>
                  <th className="py-3 px-4">País / Empresa</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {compradoresFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-stone-400">
                      No se encontraron compradores registrados.
                    </td>
                  </tr>
                ) : (
                  compradoresFiltrados.map((comp, index) => (
                    <tr key={comp.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-4 text-stone-500 font-medium">{index + 1}</td>
                      <td className="py-3 px-4 font-semibold text-stone-900">{comp.numero_identificacion}</td>
                      <td className="py-3 px-4 text-stone-800 font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                            {comp.primer_nombre[0]}
                          </div>
                          <span>
                            {comp.primer_nombre} {comp.segundo_nombre}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-700">
                        {comp.primer_apellido} {comp.segundo_apellido}
                      </td>
                      <td className="py-3 px-4 text-stone-600 text-xs">{comp.telefono}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold block text-xs text-stone-800">{comp.empresa}</span>
                        <span className="text-[11px] text-stone-500">{comp.pais}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setCompradorSeleccionado(comp);
                              setModalEditarComprador(true);
                            }}
                            className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition-colors"
                            title="Editar comprador"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setCompradorSeleccionado(comp);
                              setModalDetalleComprador(true);
                            }}
                            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Ver detalles"
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

          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
            <span>
              Total compradores: <b>{compradoresFiltrados.length}</b> de {compradores.length}
            </span>
            <span className="text-stone-400">Página 1 de 1</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DETALLE DE PEDIDO / COMPRA                                         */}
      {/* ========================================================================= */}
      {modalDetallePedido && pedidoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="bg-gradient-to-r from-amber-950 to-stone-900 p-6 text-white relative">
              <button
                onClick={() => setModalDetallePedido(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-800/60 border border-amber-600/30 flex items-center justify-center text-amber-300">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Detalle del Pedido #{pedidoSeleccionado.codigo_pedido}</h3>
                  <p className="text-xs text-amber-200/80">
                    Fecha de orden: {pedidoSeleccionado.fecha} • {pedidoSeleccionado.estado}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 text-sm">
              {/* Información Comprador y Envío */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <span className="text-stone-400 block font-semibold uppercase">Comprador</span>
                  <span className="font-bold text-stone-800 block text-sm">{pedidoSeleccionado.comprador_nombre}</span>
                  <span className="text-stone-600 block">{pedidoSeleccionado.comprador_empresa}</span>
                  <span className="text-stone-500 block">{pedidoSeleccionado.pais_destino}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                  <span className="text-stone-400 block font-semibold uppercase">Pago y Logística</span>
                  <span className="font-semibold text-stone-800 block">{pedidoSeleccionado.metodo_pago}</span>
                  <span className="text-stone-500 block">Ref: {pedidoSeleccionado.referencia_pago}</span>
                  <span className="text-stone-500 block">Naviera: {pedidoSeleccionado.naviera}</span>
                </div>
              </div>

              {/* Desglose de Lotes */}
              <div>
                <h4 className="text-xs font-bold uppercase text-stone-600 mb-2">Lotes de Café Especial</h4>
                <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-2.5 px-3">Código</th>
                        <th className="py-2.5 px-3">Variedad</th>
                        <th className="py-2.5 px-3 text-right">Sacos</th>
                        <th className="py-2.5 px-3 text-right">Peso (Kg)</th>
                        <th className="py-2.5 px-3 text-right">Precio/Kg</th>
                        <th className="py-2.5 px-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {pedidoSeleccionado.lotes.map((lote, i) => (
                        <tr key={i}>
                          <td className="py-2.5 px-3 font-bold text-stone-900">{lote.codigo}</td>
                          <td className="py-2.5 px-3 text-stone-700">{lote.variedad}</td>
                          <td className="py-2.5 px-3 text-right text-stone-700">{lote.cantidad_sacos}</td>
                          <td className="py-2.5 px-3 text-right text-stone-700">{lote.peso_kg} kg</td>
                          <td className="py-2.5 px-3 text-right text-stone-700">${lote.precio_kg.toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-bold text-stone-900">
                            ${(lote.peso_kg * lote.precio_kg).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totales */}
              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal Café:</span>
                    <span>${pedidoSeleccionado.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Flete Marítimo y Seguro:</span>
                    <span>${pedidoSeleccionado.flete.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total Facturado:</span>
                    <span className="text-amber-900">${pedidoSeleccionado.total.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setModalDetallePedido(false)}
                className="px-4 py-2 text-sm bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REGISTRAR COMPRADOR                                                */}
      {/* ========================================================================= */}
      {modalRegistrarComprador && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Registrar Comprador Internacional</h3>
                  <p className="text-xs text-stone-500">Ingrese datos corporativos y de contacto para subastas</p>
                </div>
              </div>
              <button onClick={() => setModalRegistrarComprador(false)} className="text-stone-400 hover:text-stone-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarComprador} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tipo de Documento *</label>
                  <select
                    value={nuevoComprador.tipo_documento}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, tipo_documento: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  >
                    <option value="PAS">Pasaporte</option>
                    <option value="TAX_ID">Tax ID / Registro Fiscal</option>
                    <option value="CE">Cédula de Extranjería</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Identificación / Tax ID *</label>
                  <input
                    type="text"
                    required
                    value={nuevoComprador.numero_identificacion}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, numero_identificacion: e.target.value })}
                    placeholder="Ej. US-9823412"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Primer Nombre *</label>
                  <input
                    type="text"
                    required
                    value={nuevoComprador.primer_nombre}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, primer_nombre: e.target.value })}
                    placeholder="Ej. John"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Primer Apellido *</label>
                  <input
                    type="text"
                    required
                    value={nuevoComprador.primer_apellido}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, primer_apellido: e.target.value })}
                    placeholder="Ej. Smith"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Empresa / Tostaduría *</label>
                  <input
                    type="text"
                    required
                    value={nuevoComprador.empresa}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, empresa: e.target.value })}
                    placeholder="Ej. Blue Coffee Roasters Inc."
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">País *</label>
                  <input
                    type="text"
                    required
                    value={nuevoComprador.pais}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, pais: e.target.value })}
                    placeholder="Ej. Estados Unidos"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Teléfono Internacional</label>
                  <input
                    type="tel"
                    value={nuevoComprador.telefono}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, telefono: e.target.value })}
                    placeholder="Ej. +1 415 892 3411"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={nuevoComprador.correo}
                    onChange={(e) => setNuevoComprador({ ...nuevoComprador, correo: e.target.value })}
                    placeholder="Ej. buyer@roasters.com"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalRegistrarComprador(false)}
                  className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-amber-800 text-white font-semibold rounded-xl hover:bg-amber-900 transition-colors"
                >
                  Guardar Comprador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDITAR COMPRADOR                                                   */}
      {/* ========================================================================= */}
      {modalEditarComprador && compradorSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Editar Comprador</h3>
                  <p className="text-xs text-stone-500">{compradorSeleccionado.numero_identificacion}</p>
                </div>
              </div>
              <button onClick={() => setModalEditarComprador(false)} className="text-stone-400 hover:text-stone-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarEdicionComprador} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Empresa</label>
                  <input
                    type="text"
                    value={compradorSeleccionado.empresa}
                    onChange={(e) => setCompradorSeleccionado({ ...compradorSeleccionado, empresa: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">País</label>
                  <input
                    type="text"
                    value={compradorSeleccionado.pais}
                    onChange={(e) => setCompradorSeleccionado({ ...compradorSeleccionado, pais: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={compradorSeleccionado.telefono}
                    onChange={(e) => setCompradorSeleccionado({ ...compradorSeleccionado, telefono: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Correo</label>
                  <input
                    type="email"
                    value={compradorSeleccionado.correo}
                    onChange={(e) => setCompradorSeleccionado({ ...compradorSeleccionado, correo: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalEditarComprador(false)}
                  className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-amber-800 text-white font-semibold rounded-xl hover:bg-amber-900 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONSULTAR COMPRADOR                                                */}
      {/* ========================================================================= */}
      {modalConsultarComprador && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Consultar Comprador</h3>
                  <p className="text-xs text-stone-500">Búsqueda rápida por número de documento o Tax ID</p>
                </div>
              </div>
              <button onClick={() => setModalConsultarComprador(false)} className="text-stone-400 hover:text-stone-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <form onSubmit={handleConsultarComprador} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={cedulaConsulta}
                  onChange={(e) => setCedulaConsulta(e.target.value)}
                  placeholder="Ingrese Tax ID o pasaporte..."
                  className="flex-1 border border-stone-300 rounded-xl px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white font-semibold text-sm rounded-xl hover:bg-stone-900"
                >
                  Buscar
                </button>
              </form>

              {resultadoConsulta && (
                <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-sm">
                      {resultadoConsulta.primer_nombre} {resultadoConsulta.primer_apellido}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                      {resultadoConsulta.estado}
                    </span>
                  </div>
                  <p className="text-stone-600"><b>Empresa:</b> {resultadoConsulta.empresa}</p>
                  <p className="text-stone-600"><b>País:</b> {resultadoConsulta.pais}</p>
                  <p className="text-stone-600"><b>Pedidos realizados:</b> {resultadoConsulta.pedidos_totales} órdenes</p>
                  <p className="text-stone-600"><b>Teléfono:</b> {resultadoConsulta.telefono}</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setModalConsultarComprador(false)}
                className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VER DETALLE COMPRADOR                                              */}
      {/* ========================================================================= */}
      {modalDetalleComprador && compradorSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-950 to-stone-900 p-6 text-white relative">
              <button
                onClick={() => setModalDetalleComprador(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-xl font-bold">
                  {compradorSeleccionado.primer_nombre[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {compradorSeleccionado.primer_nombre} {compradorSeleccionado.primer_apellido}
                  </h3>
                  <p className="text-xs text-amber-200/80">{compradorSeleccionado.empresa}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span><b>País / Ciudad:</b> {compradorSeleccionado.pais} ({compradorSeleccionado.ciudad || 'No especificada'})</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span><b>Correo:</b> {compradorSeleccionado.correo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <span><b>Teléfono:</b> {compradorSeleccionado.telefono}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-700 shrink-0" />
                <span><b>Historial:</b> {compradorSeleccionado.pedidos_totales} pedidos ({compradorSeleccionado.volumen_kg.toLocaleString('es-CO')} kg café)</span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setModalDetalleComprador(false)}
                className="px-4 py-2 text-sm bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-medium"
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
