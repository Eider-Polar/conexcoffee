import { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Pencil,
  Eye,
  X,
  CheckCircle,
} from 'lucide-react';
import ModuloCabecera from '../components/ModuloCabecera';

const INITIAL_COMPRADORES = [
  {
    id: 1,
    numeroIdentificacion: 'US-9823412',
    primerNombre: 'JOHN',
    segundoNombre: 'DAVID',
    primerApellido: 'SMITH',
    segundoApellido: 'MILLER',
    telefono: '+1 415 892 3411',
    correo: 'john.smith@bluecoffeeroasters.com',
    empresaCompradora: 'Blue Coffee Roasters Inc.',
    pais: 'Estados Unidos',
    ciudad: 'San Francisco, CA',
    pedidosCount: 14,
    volumenSacos: 420,
    activo: true,
    avatar: '/images/users/avatar-1.jpg',
  },
  {
    id: 2,
    numeroIdentificacion: 'DE-4581290',
    primerNombre: 'HANS',
    segundoNombre: 'PETER',
    primerApellido: 'WEBER',
    segundoApellido: 'KLEIN',
    telefono: '+49 40 7654 3210',
    correo: 'h.weber@hamburgkaffee.de',
    empresaCompradora: 'Hamburg Kaffee Import GmbH',
    pais: 'Alemania',
    ciudad: 'Hamburgo',
    pedidosCount: 8,
    volumenSacos: 280,
    activo: true,
    avatar: '/images/users/avatar-10.jpg',
  },
  {
    id: 3,
    numeroIdentificacion: 'JP-1192834',
    primerNombre: 'KENJI',
    segundoNombre: '',
    primerApellido: 'TAKAHASHI',
    segundoApellido: 'SATO',
    telefono: '+81 3 5555 0192',
    correo: 'takahashi@tokyospecialty.jp',
    empresaCompradora: 'Tokyo Specialty Bean Co.',
    pais: 'Japón',
    ciudad: 'Tokio',
    pedidosCount: 22,
    volumenSacos: 650,
    activo: true,
    avatar: '/images/users/avatar-2.jpg',
  },
];

export default function CompradoresPage() {
  const [compradores, setCompradores] = useState(INITIAL_COMPRADORES);
  const [searchTerm, setSearchTerm] = useState('');

  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [modalConsultarAbierto, setModalConsultarAbierto] = useState(false);

  const [compradorActual, setCompradorActual] = useState(null);
  const [cedulaConsulta, setCedulaConsulta] = useState('');
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  const [formData, setFormData] = useState({
    numeroIdentificacion: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    correo: '',
    empresaCompradora: '',
    pais: '',
    ciudad: '',
  });

  const abrirModalCrear = () => {
    setFormData({
      numeroIdentificacion: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
      correo: '',
      empresaCompradora: '',
      pais: '',
      ciudad: '',
    });
    setModalRegistroAbierto(true);
  };

  const abrirModalEditar = (c) => {
    setCompradorActual(c);
    setFormData({
      numeroIdentificacion: c.numeroIdentificacion || '',
      primerNombre: c.primerNombre || '',
      segundoNombre: c.segundoNombre || '',
      primerApellido: c.primerApellido || '',
      segundoApellido: c.segundoApellido || '',
      telefono: c.telefono || '',
      correo: c.correo || '',
      empresaCompradora: c.empresaCompradora || '',
      pais: c.pais || '',
      ciudad: c.ciudad || '',
    });
    setModalEditarAbierto(true);
  };

  const abrirModalDetalles = (c) => {
    setCompradorActual(c);
    setModalDetalleAbierto(true);
  };

  const abrirModalConsultar = () => {
    setCedulaConsulta('');
    setResultadoConsulta(null);
    setModalConsultarAbierto(true);
  };

  const ejecutarConsulta = (e) => {
    e.preventDefault();
    const encontrado = compradores.find(
      (c) => c.numeroIdentificacion.trim() === cedulaConsulta.trim()
    );
    setResultadoConsulta(encontrado || 'NO_ENCONTRADO');
  };

  const guardarCreacion = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      ...formData,
      pedidosCount: 0,
      volumenSacos: 0,
      activo: true,
      avatar: '/images/users/user-dummy-img.jpg',
    };
    setCompradores([nuevo, ...compradores]);
    setModalRegistroAbierto(false);
  };

  const guardarEdicion = (e) => {
    e.preventDefault();
    setCompradores(
      compradores.map((c) =>
        c.id === compradorActual.id ? { ...c, ...formData } : c
      )
    );
    setModalEditarAbierto(false);
  };

  const filtrados = compradores.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.numeroIdentificacion.toLowerCase().includes(term) ||
      c.primerNombre.toLowerCase().includes(term) ||
      c.primerApellido.toLowerCase().includes(term) ||
      c.telefono.toLowerCase().includes(term) ||
      c.empresaCompradora.toLowerCase().includes(term) ||
      c.pais.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Cabecera idéntica a components.cabecera-modulo con botones oficiales Consultar y Registrar */}
      <ModuloCabecera
        titulo="Compradores"
        subtitulo="Clientes e importadores internacionales de café de especialidad"
        imagenPortada="/images/portadas/comprador.jpg"
        mensaje="En este módulo podrás registrar la información detallada de cada uno de tus compradores."
        icono={ShoppingCart}
        totalRegistros={filtrados.length}
        onConsultar={abrirModalConsultar}
        textoBotonConsultar="Consultar Comprador"
        onRegistrar={abrirModalCrear}
        textoBotonRegistrar="Registrar Comprador"
      />

      {/* Buscador */}
      <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-2xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Buscar por ID, nombre, empresa, país…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-[#AD2E01]/20 focus:border-[#AD2E01]"
          />
        </div>
      </div>

      {/* Tabla Oficial (Nº, IDENTIFICACION, NOMBRES, APELLIDOS, TELEFONO, ACCIONES) */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-50 border-b border-surface-200 text-surface-600 uppercase text-xs tracking-wider">
              <tr>
                <th scope="col" className="px-4 py-3.5 font-bold w-12 text-center">Nº</th>
                <th scope="col" className="px-5 py-3.5 font-bold">Identificación</th>
                <th scope="col" className="px-5 py-3.5 font-bold">Nombres</th>
                <th scope="col" className="px-5 py-3.5 font-bold">Apellidos</th>
                <th scope="col" className="px-5 py-3.5 font-bold">Teléfono</th>
                <th scope="col" className="px-5 py-3.5 font-bold text-center">País / Empresa</th>
                <th scope="col" className="px-5 py-3.5 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-surface-500">
                    No se encontraron compradores registrados.
                  </td>
                </tr>
              ) : (
                filtrados.map((c, index) => (
                  <tr key={c.id} className="hover:bg-surface-50/80 transition-colors">
                    <td className="px-4 py-3.5 text-center font-bold text-surface-500 text-xs">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-surface-900 font-mono text-xs">
                      {c.numeroIdentificacion}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.primerNombre}
                          className="h-8 w-8 rounded-full object-cover border border-surface-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/users/user-dummy-img.jpg';
                          }}
                        />
                        <span className="font-semibold text-surface-800">
                          {c.primerNombre} {c.segundoNombre}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-surface-700">
                      {c.primerApellido} {c.segundoApellido}
                    </td>
                    <td className="px-5 py-3.5 text-surface-600 font-mono text-xs">
                      {c.telefono}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold text-surface-800">{c.pais}</span>
                        <span className="text-[11px] text-surface-400">{c.empresaCompradora}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(c)}
                          title="Editar"
                          className="p-1.5 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-[#AD2E01] hover:border-[#AD2E01]/30 hover:bg-[#FFF1ED] transition-colors cursor-pointer shadow-2xs"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => abrirModalDetalles(c)}
                          title="Ver"
                          className="p-1.5 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Eye className="h-4 w-4" />
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

      {/* MODAL REGISTRAR COMPRADOR */}
      {modalRegistroAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-surface-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-surface-200">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#FFF1ED] text-[#AD2E01] flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900">Registrar Comprador</h3>
                  <p className="text-xs text-surface-500">Datos del cliente o casa importadora</p>
                </div>
              </div>
              <button
                onClick={() => setModalRegistroAbierto(false)}
                className="p-1.5 rounded-lg text-surface-400 hover:bg-surface-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={guardarCreacion} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">
                    Tax ID / Identificación *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.numeroIdentificacion}
                    onChange={(e) => setFormData({ ...formData, numeroIdentificacion: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                    placeholder="Ej. US-9823412"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Empresa Compradora *</label>
                  <input
                    required
                    type="text"
                    value={formData.empresaCompradora}
                    onChange={(e) => setFormData({ ...formData, empresaCompradora: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                    placeholder="Ej. Blue Coffee Roasters Inc."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Primer Nombre *</label>
                  <input
                    required
                    type="text"
                    value={formData.primerNombre}
                    onChange={(e) => setFormData({ ...formData, primerNombre: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Primer Apellido *</label>
                  <input
                    required
                    type="text"
                    value={formData.primerApellido}
                    onChange={(e) => setFormData({ ...formData, primerApellido: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Teléfono Internacional *</label>
                  <input
                    required
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                    placeholder="+1 415 892 3411"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Correo Electrónico *</label>
                  <input
                    required
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">País *</label>
                  <input
                    required
                    type="text"
                    value={formData.pais}
                    onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                    placeholder="Ej. Estados Unidos, Alemania, Japón"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Ciudad Destino</label>
                  <input
                    type="text"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-surface-200">
                <button
                  type="button"
                  onClick={() => setModalRegistroAbierto(false)}
                  className="px-4 py-2 rounded-xl border border-surface-200 text-sm font-semibold text-surface-600 hover:bg-surface-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#AD2E01] hover:bg-[#8D2501] text-white text-sm font-semibold shadow-md cursor-pointer"
                >
                  Guardar Comprador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONSULTAR COMPRADOR */}
      {modalConsultarAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-[#AD2E01]" />
                <h3 className="text-base font-bold text-surface-900">Consultar Comprador</h3>
              </div>
              <button
                onClick={() => setModalConsultarAbierto(false)}
                className="p-1 rounded-lg text-surface-400 hover:bg-surface-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={ejecutarConsulta} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-surface-700 mb-1">
                  Ingrese la identificación / Tax ID:
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    type="text"
                    value={cedulaConsulta}
                    onChange={(e) => setCedulaConsulta(e.target.value)}
                    placeholder="Ej. US-9823412"
                    className="flex-1 px-3 py-2 text-sm rounded-xl border border-surface-200 focus:ring-2 focus:ring-[#AD2E01]/20 focus:border-[#AD2E01]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#AD2E01] hover:bg-[#8D2501] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            {resultadoConsulta === 'NO_ENCONTRADO' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                No se encontró ningún comprador con esa identificación.
              </div>
            )}

            {resultadoConsulta && resultadoConsulta !== 'NO_ENCONTRADO' && (
              <div className="mt-4 p-4 bg-[#FFF1ED] border border-[#AD2E01]/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-surface-900 text-sm">
                    {resultadoConsulta.primerNombre} {resultadoConsulta.primerApellido}
                  </span>
                </div>
                <div className="text-xs text-surface-600">
                  <strong>Empresa:</strong> {resultadoConsulta.empresaCompradora}
                </div>
                <div className="text-xs text-surface-600">
                  <strong>País / Destino:</strong> {resultadoConsulta.pais} ({resultadoConsulta.ciudad})
                </div>
                <div className="text-xs text-surface-600">
                  <strong>Volumen comprado:</strong> {resultadoConsulta.volumenSacos} sacos en {resultadoConsulta.pedidosCount} pedidos
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DETALLES */}
      {modalDetalleAbierto && compradorActual && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-3">
                <img
                  src={compradorActual.avatar}
                  alt={compradorActual.primerNombre}
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#AD2E01]"
                  onError={(e) => {
                    e.currentTarget.src = '/images/users/user-dummy-img.jpg';
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold text-surface-900">
                    {compradorActual.primerNombre} {compradorActual.primerApellido}
                  </h3>
                  <span className="text-xs text-surface-500 font-medium">{compradorActual.empresaCompradora}</span>
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
                  <span className="text-surface-500 block">Identificación Fiscal</span>
                  <span className="font-semibold text-surface-800 font-mono">{compradorActual.numeroIdentificacion}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">País / Ciudad</span>
                  <span className="font-semibold text-surface-800">{compradorActual.pais}, {compradorActual.ciudad}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Teléfono</span>
                  <span className="font-semibold text-surface-800">{compradorActual.telefono}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Correo</span>
                  <span className="font-semibold text-surface-800">{compradorActual.correo}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FFF1ED] p-3 rounded-xl border border-[#AD2E01]/20 text-center">
                  <span className="text-2xl font-extrabold text-[#AD2E01]">{compradorActual.pedidosCount}</span>
                  <div className="text-xs font-semibold text-surface-600">Pedidos Procesados</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center">
                  <span className="text-2xl font-extrabold text-blue-700">{compradorActual.volumenSacos}</span>
                  <div className="text-xs font-semibold text-surface-600">Sacos Exportados</div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setModalDetalleAbierto(false)}
                className="px-4 py-2 rounded-xl bg-surface-900 text-white text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR COMPRADOR */}
      {modalEditarAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-surface-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-surface-200">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Pencil className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900">Editar Comprador</h3>
                  <p className="text-xs text-surface-500">{compradorActual?.primerNombre} {compradorActual?.primerApellido}</p>
                </div>
              </div>
              <button
                onClick={() => setModalEditarAbierto(false)}
                className="p-1.5 rounded-lg text-surface-400 hover:bg-surface-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={guardarEdicion} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Tax ID / Identificación</label>
                  <input
                    type="text"
                    value={formData.numeroIdentificacion}
                    onChange={(e) => setFormData({ ...formData, numeroIdentificacion: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Empresa</label>
                  <input
                    type="text"
                    value={formData.empresaCompradora}
                    onChange={(e) => setFormData({ ...formData, empresaCompradora: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Primer Nombre</label>
                  <input
                    type="text"
                    value={formData.primerNombre}
                    onChange={(e) => setFormData({ ...formData, primerNombre: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Primer Apellido</label>
                  <input
                    type="text"
                    value={formData.primerApellido}
                    onChange={(e) => setFormData({ ...formData, primerApellido: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Correo</label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-surface-200">
                <button
                  type="button"
                  onClick={() => setModalEditarAbierto(false)}
                  className="px-4 py-2 rounded-xl border border-surface-200 text-sm font-semibold text-surface-600 hover:bg-surface-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-md cursor-pointer"
                >
                  Actualizar Comprador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
