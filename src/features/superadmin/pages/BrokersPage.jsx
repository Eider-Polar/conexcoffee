import { useState } from 'react';
import {
  Handshake,
  Search,
  Pencil,
  Eye,
  X,
  Building2,
  CheckCircle,
} from 'lucide-react';
import ModuloCabecera from '../components/ModuloCabecera';

const INITIAL_BROKERS = [
  {
    id: 1,
    numeroIdentificacion: '12053621',
    primerNombre: 'OSCAR',
    segundoNombre: '',
    primerApellido: 'VALVERDE',
    segundoApellido: 'CASTILLO',
    telefono: '3104256987',
    correo: 'oscar.valverde@brokerconex.com',
    fechaNacimiento: '1988-09-12',
    genero: 'M',
    direccion: 'Carrera 5 # 14-20, Centro Empresarial',
    municipio: 'Bogotá D.C.',
    departamento: 'Cundinamarca',
    empresasVinculadas: ['Café Especial Huila SAS', 'Exportadora Andina de Café'],
    totalNegociaciones: 28,
    activo: true,
    avatar: '/images/users/avatar-7.jpg',
  },
  {
    id: 2,
    numeroIdentificacion: '12055621',
    primerNombre: 'ALFONSO',
    segundoNombre: 'JAVIER',
    primerApellido: 'ZULUAGA',
    segundoApellido: 'RESTREPO',
    telefono: '3148901234',
    correo: 'alfonso.zuluaga@brokerconex.com',
    fechaNacimiento: '1984-06-25',
    genero: 'M',
    direccion: 'Calle 10 # 43E-12, Poblado',
    municipio: 'Medellín',
    departamento: 'Antioquia',
    empresasVinculadas: ['Origen Café Colombia'],
    totalNegociaciones: 45,
    activo: true,
    avatar: '/images/users/avatar-8.jpg',
  },
  {
    id: 3,
    numeroIdentificacion: '10948372',
    primerNombre: 'VALENTINA',
    segundoNombre: 'SOFÍA',
    primerApellido: 'HERRERA',
    segundoApellido: 'DUQUE',
    telefono: '3167788990',
    correo: 'valentina.herrera@brokerconex.com',
    fechaNacimiento: '1992-12-04',
    genero: 'F',
    direccion: 'Avenida Santander # 55-10',
    municipio: 'Manizales',
    departamento: 'Caldas',
    empresasVinculadas: ['Alianza Cafetera del Sur', 'Café Especial Huila SAS'],
    totalNegociaciones: 19,
    activo: true,
    avatar: '/images/users/avatar-9.jpg',
  },
];

export default function BrokersPage() {
  const [brokers, setBrokers] = useState(INITIAL_BROKERS);
  const [searchTerm, setSearchTerm] = useState('');

  // Modales
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [modalConsultarAbierto, setModalConsultarAbierto] = useState(false);

  const [brokerActual, setBrokerActual] = useState(null);
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
    fechaNacimiento: '',
    genero: 'M',
    direccion: '',
    municipio: '',
    departamento: '',
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
      fechaNacimiento: '',
      genero: 'M',
      direccion: '',
      municipio: '',
      departamento: '',
    });
    setModalRegistroAbierto(true);
  };

  const abrirModalEditar = (b) => {
    setBrokerActual(b);
    setFormData({
      numeroIdentificacion: b.numeroIdentificacion || '',
      primerNombre: b.primerNombre || '',
      segundoNombre: b.segundoNombre || '',
      primerApellido: b.primerApellido || '',
      segundoApellido: b.segundoApellido || '',
      telefono: b.telefono || '',
      correo: b.correo || '',
      fechaNacimiento: b.fechaNacimiento || '',
      genero: b.genero || 'M',
      direccion: b.direccion || '',
      municipio: b.municipio || '',
      departamento: b.departamento || '',
    });
    setModalEditarAbierto(true);
  };

  const abrirModalDetalles = (b) => {
    setBrokerActual(b);
    setModalDetalleAbierto(true);
  };

  const abrirModalConsultar = () => {
    setCedulaConsulta('');
    setResultadoConsulta(null);
    setModalConsultarAbierto(true);
  };

  const ejecutarConsulta = (e) => {
    e.preventDefault();
    const encontrado = brokers.find(
      (b) => b.numeroIdentificacion.trim() === cedulaConsulta.trim()
    );
    setResultadoConsulta(encontrado || 'NO_ENCONTRADO');
  };

  const guardarCreacion = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      ...formData,
      empresasVinculadas: [],
      totalNegociaciones: 0,
      activo: true,
      avatar: '/images/users/user-dummy-img.jpg',
    };
    setBrokers([nuevo, ...brokers]);
    setModalRegistroAbierto(false);
  };

  const guardarEdicion = (e) => {
    e.preventDefault();
    setBrokers(
      brokers.map((b) =>
        b.id === brokerActual.id ? { ...b, ...formData } : b
      )
    );
    setModalEditarAbierto(false);
  };

  const filtrados = brokers.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      b.numeroIdentificacion.toLowerCase().includes(term) ||
      b.primerNombre.toLowerCase().includes(term) ||
      b.primerApellido.toLowerCase().includes(term) ||
      b.telefono.toLowerCase().includes(term) ||
      (b.municipio && b.municipio.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      {/* Cabecera idéntica a components.cabecera-modulo con botones oficiales Consultar y Registrar */}
      <ModuloCabecera
        titulo="Brokers"
        subtitulo="Intermediarios comerciales autorizados para negociación de lotes y contratos"
        imagenPortada="/images/portadas/broker.jpg"
        mensaje="En este módulo podrás registrar la información detallada de cada uno de tus brokers."
        icono={Handshake}
        totalRegistros={filtrados.length}
        onConsultar={abrirModalConsultar}
        textoBotonConsultar="Consultar Broker"
        onRegistrar={abrirModalCrear}
        textoBotonRegistrar="Registrar Broker"
      />

      {/* Buscador */}
      <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-2xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Buscar por identificación, nombre, teléfono…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-terracota/20 focus:border-brand-terracota"
          />
        </div>
      </div>

      {/* Tabla Oficial (Nº, Identificación, Nombres, Apellidos, Teléfono, Acciones) */}
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
                <th scope="col" className="px-5 py-3.5 font-bold text-center">Empresas</th>
                <th scope="col" className="px-5 py-3.5 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-surface-500">
                    No se encontraron brokers registrados.
                  </td>
                </tr>
              ) : (
                filtrados.map((b, index) => (
                  <tr key={b.id} className="hover:bg-surface-50/80 transition-colors">
                    <td className="px-4 py-3.5 text-center font-bold text-surface-500 text-xs">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-surface-900">
                      {b.numeroIdentificacion}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={b.avatar}
                          alt={b.primerNombre}
                          className="h-8 w-8 rounded-full object-cover border border-surface-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/users/user-dummy-img.jpg';
                          }}
                        />
                        <span className="font-semibold text-surface-800">
                          {b.primerNombre} {b.segundoNombre}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-surface-700">
                      {b.primerApellido} {b.segundoApellido}
                    </td>
                    <td className="px-5 py-3.5 text-surface-600 font-mono text-xs">
                      {b.telefono}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        <Building2 className="h-3 w-3" />
                        {b.empresasVinculadas.length} vinculadas
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(b)}
                          title="Editar"
                          className="p-1.5 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-brand-terracota hover:border-brand-terracota/30 hover:bg-brand-tint transition-colors cursor-pointer shadow-2xs"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => abrirModalDetalles(b)}
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

      {/* MODAL REGISTRAR BROKER */}
      {modalRegistroAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-surface-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-surface-200">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-brand-tint text-brand-terracota flex items-center justify-center">
                  <Handshake className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900">Registrar Broker</h3>
                  <p className="text-xs text-surface-500">Datos personales del intermediario comercial</p>
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
                    Número de Identificación *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.numeroIdentificacion}
                    onChange={(e) => setFormData({ ...formData, numeroIdentificacion: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                    placeholder="Ej. 12053621"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Teléfono *</label>
                  <input
                    required
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                    placeholder="Ej. 3104256987"
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
                  <label className="block text-xs font-bold text-surface-700 mb-1">Segundo Nombre</label>
                  <input
                    type="text"
                    value={formData.segundoNombre}
                    onChange={(e) => setFormData({ ...formData, segundoNombre: e.target.value.toUpperCase() })}
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
                  <label className="block text-xs font-bold text-surface-700 mb-1">Segundo Apellido</label>
                  <input
                    type="text"
                    value={formData.segundoApellido}
                    onChange={(e) => setFormData({ ...formData, segundoApellido: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                    placeholder="broker@conexcoffee.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Ciudad / Municipio</label>
                  <input
                    type="text"
                    value={formData.municipio}
                    onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 mb-1">Dirección de Oficina</label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                />
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
                  className="px-5 py-2 rounded-xl bg-brand-terracota hover:bg-brand-terracota-dark text-white text-sm font-semibold shadow-md cursor-pointer"
                >
                  Guardar Broker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONSULTAR BROKER */}
      {modalConsultarAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-brand-terracota" />
                <h3 className="text-base font-bold text-surface-900">Consultar Broker</h3>
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
                  Ingrese el número de identificación del broker:
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    type="text"
                    value={cedulaConsulta}
                    onChange={(e) => setCedulaConsulta(e.target.value)}
                    placeholder="Ej. 12053621"
                    className="flex-1 px-3 py-2 text-sm rounded-xl border border-surface-200 focus:ring-2 focus:ring-brand-terracota/20 focus:border-brand-terracota"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-terracota hover:bg-brand-terracota-dark text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            {resultadoConsulta === 'NO_ENCONTRADO' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                No se encontró ningún broker registrado con la identificación ingresada.
              </div>
            )}

            {resultadoConsulta && resultadoConsulta !== 'NO_ENCONTRADO' && (
              <div className="mt-4 p-4 bg-brand-tint border border-brand-terracota/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-surface-900 text-sm">
                    {resultadoConsulta.primerNombre} {resultadoConsulta.primerApellido}
                  </span>
                </div>
                <div className="text-xs text-surface-600">
                  <strong>Cédula:</strong> {resultadoConsulta.numeroIdentificacion}
                </div>
                <div className="text-xs text-surface-600">
                  <strong>Teléfono:</strong> {resultadoConsulta.telefono}
                </div>
                <div className="text-xs text-surface-600">
                  <strong>Ubicación:</strong> {resultadoConsulta.municipio}, {resultadoConsulta.departamento}
                </div>
                <div className="pt-2 border-t border-brand-terracota/10">
                  <span className="text-xs font-bold text-surface-700">Empresas vinculadas:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {resultadoConsulta.empresasVinculadas.map((e) => (
                      <span key={e} className="px-2 py-0.5 rounded text-[11px] bg-white border border-surface-200 text-surface-700 font-medium">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DETALLES */}
      {modalDetalleAbierto && brokerActual && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-3">
                <img
                  src={brokerActual.avatar}
                  alt={brokerActual.primerNombre}
                  className="h-12 w-12 rounded-full object-cover border-2 border-brand-terracota"
                  onError={(e) => {
                    e.currentTarget.src = '/images/users/user-dummy-img.jpg';
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold text-surface-900">
                    {brokerActual.primerNombre} {brokerActual.primerApellido}
                  </h3>
                  <span className="text-xs text-surface-500 font-mono">CC {brokerActual.numeroIdentificacion}</span>
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
                  <span className="text-surface-500 block">Teléfono</span>
                  <span className="font-semibold text-surface-800">{brokerActual.telefono}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Correo</span>
                  <span className="font-semibold text-surface-800">{brokerActual.correo}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Ubicación</span>
                  <span className="font-semibold text-surface-800">{brokerActual.municipio}, {brokerActual.departamento}</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Total Negociaciones</span>
                  <span className="font-semibold text-brand-terracota">{brokerActual.totalNegociaciones} cerradas</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-surface-700 block mb-1.5">Empresas con Contrato Activo</span>
                <div className="space-y-1.5">
                  {brokerActual.empresasVinculadas.map((emp) => (
                    <div key={emp} className="flex items-center gap-2 p-2 bg-surface-50 rounded-lg text-xs font-medium text-surface-800 border border-surface-100">
                      <Building2 className="h-3.5 w-3.5 text-brand-terracota" />
                      <span>{emp}</span>
                    </div>
                  ))}
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

      {/* MODAL EDITAR BROKER */}
      {modalEditarAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-surface-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-surface-200">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Pencil className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900">Editar Broker</h3>
                  <p className="text-xs text-surface-500">{brokerActual?.primerNombre} {brokerActual?.primerApellido}</p>
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
                  <label className="block text-xs font-bold text-surface-700 mb-1">Identificación</label>
                  <input
                    type="text"
                    value={formData.numeroIdentificacion}
                    onChange={(e) => setFormData({ ...formData, numeroIdentificacion: e.target.value })}
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
                  <label className="block text-xs font-bold text-surface-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
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
                  Actualizar Broker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
