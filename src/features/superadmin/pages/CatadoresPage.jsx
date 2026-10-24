import { useState } from 'react';
import { ModuloCabecera } from '@/components/data-display';
import {
  Search,
  Eye,
  Edit,
  X,
  Award,
  Phone,
  Mail,
  Building2,
  FileCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { QueryState } from '@/components/feedback';
import {
  useSuperadminCatadores,
  useCrearSuperadminCatador,
  useActualizarSuperadminCatador,
} from '../hooks/useSuperadminData';

export default function CatadoresPage() {
  const query = useSuperadminCatadores();
  const catadores = query.data ?? [];
  const crearCatador = useCrearSuperadminCatador();
  const actualizarCatador = useActualizarSuperadminCatador();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroLaboratorio, setFiltroLaboratorio] = useState('todos');

  // Modales
  const [modalRegistrarAbierto, setModalRegistrarAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalConsultarAbierto, setModalConsultarAbierto] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

  // Estados de edición / detalle / consulta
  const [catadorSeleccionado, setCatadorSeleccionado] = useState(null);
  const [cedulaConsulta, setCedulaConsulta] = useState('');
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  // Formulario nuevo
  const [nuevoCatador, setNuevoCatador] = useState({
    tipo_documento: 'CC',
    numero_identificacion: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    telefono: '',
    correo: '',
    certificacion: 'Q-Grader Arábica (CQI)',
    laboratorio: 'Laboratorio Central TecniCafé',
    experiencia: '',
  });

  // Filtrado de catadores
  const catadoresFiltrados = catadores.filter((c) => {
    const term = searchTerm.toLowerCase();
    const fullName = `${c.primer_nombre} ${c.segundo_nombre} ${c.primer_apellido} ${c.segundo_apellido}`.toLowerCase();
    const matchesSearch =
      c.numero_identificacion.includes(term) ||
      fullName.includes(term) ||
      c.telefono.includes(term) ||
      c.certificacion.toLowerCase().includes(term);

    const matchesLab =
      filtroLaboratorio === 'todos' || c.laboratorio === filtroLaboratorio;

    return matchesSearch && matchesLab;
  });

  // Guardar nuevo catador
  const handleGuardarNuevo = (e) => {
    e.preventDefault();
    if (
      !nuevoCatador.numero_identificacion ||
      !nuevoCatador.primer_nombre ||
      !nuevoCatador.primer_apellido ||
      !nuevoCatador.telefono
    ) {
      toast.error('Por favor complete los campos obligatorios (*)');
      return;
    }

    const nuevo = {
      id: Date.now(),
      ...nuevoCatador,
      primer_nombre: nuevoCatador.primer_nombre.toUpperCase(),
      segundo_nombre: nuevoCatador.segundo_nombre.toUpperCase(),
      primer_apellido: nuevoCatador.primer_apellido.toUpperCase(),
      segundo_apellido: nuevoCatador.segundo_apellido.toUpperCase(),
      muestras_evaluadas: 0,
      estado: 'Activo',
    };

    crearCatador.mutate(nuevo);
    toast.success('Catador registrado correctamente');
    setModalRegistrarAbierto(false);
    setNuevoCatador({
      tipo_documento: 'CC',
      numero_identificacion: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      telefono: '',
      correo: '',
      certificacion: 'Q-Grader Arábica (CQI)',
      laboratorio: 'Laboratorio Central TecniCafé',
      experiencia: '',
    });
  };

  // Guardar edición
  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    if (!catadorSeleccionado) return;

    actualizarCatador.mutate(catadorSeleccionado);
    toast.success('Catador actualizado correctamente');
    setModalEditarAbierto(false);
  };

  // Consultar catador por documento
  const handleConsultar = (e) => {
    e.preventDefault();
    const encontrado = catadores.find((c) =>
      c.numero_identificacion.trim().toLowerCase() === cedulaConsulta.trim().toLowerCase()
    );
    if (encontrado) {
      setResultadoConsulta(encontrado);
      toast.success('Catador encontrado en el sistema');
    } else {
      setResultadoConsulta(null);
      toast.error('No se encontró ningún catador con ese número de identificación');
    }
  };

  const laboratoriosUnicos = Array.from(new Set(catadores.map((c) => c.laboratorio)));

  return (
    <div className="space-y-6">
      {/* Cabecera idéntica al componente Blade original */}
      <ModuloCabecera
        titulo="Catadores"
        subtitulo="Registro de profesionales Q-Grader y acreditaciones de análisis sensorial"
        imagen="/images/portadas/catador.jpg"
        mensajeInfo="En este módulo podrás registrar y gestionar la información detallada de cada uno de tus catadores."
        totalRegistros={catadores.length}
        textoBotonRegistrar="Registrar Catador"
        textoBotonConsultar="Consultar Catador"
        onRegistrar={() => setModalRegistrarAbierto(true)}
        onConsultar={() => {
          setCedulaConsulta('');
          setResultadoConsulta(null);
          setModalConsultarAbierto(true);
        }}
      />

      <QueryState query={query} />

      {/* Barra de Búsqueda y Filtros */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cédula, nombre, certificación..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-medium text-stone-500">Laboratorio:</span>
          <select
            value={filtroLaboratorio}
            onChange={(e) => setFiltroLaboratorio(e.target.value)}
            className="text-sm border border-stone-200 rounded-xl px-3 py-2 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          >
            <option value="todos">Todos los laboratorios</option>
            {laboratoriosUnicos.map((lab) => (
              <option key={lab} value={lab}>
                {lab}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Catadores */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Nº</th>
                <th className="py-3 px-4">Identificación</th>
                <th className="py-3 px-4">Nombres</th>
                <th className="py-3 px-4">Apellidos</th>
                <th className="py-3 px-4">Certificación</th>
                <th className="py-3 px-4">Laboratorio</th>
                <th className="py-3 px-4">Teléfono</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {catadoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-stone-400">
                    No se encontraron catadores que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                catadoresFiltrados.map((catador, index) => (
                  <tr key={catador.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4 text-stone-500 font-medium">{index + 1}</td>
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      {catador.numero_identificacion}
                    </td>
                    <td className="py-3 px-4 text-stone-800">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                          {catador.primer_nombre[0]}
                        </div>
                        <span>
                          {catador.primer_nombre} {catador.segundo_nombre}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-700">
                      {catador.primer_apellido} {catador.segundo_apellido}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Award className="w-3.5 h-3.5" />
                        {catador.certificacion}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-600 text-xs">
                      {catador.laboratorio}
                    </td>
                    <td className="py-3 px-4 text-stone-600">{catador.telefono}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setCatadorSeleccionado(catador);
                            setModalEditarAbierto(true);
                          }}
                          className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition-colors"
                          title="Editar catador"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setCatadorSeleccionado(catador);
                            setModalDetalleAbierto(true);
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

        {/* Footer de la tabla */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>
            Total registros: <b>{catadoresFiltrados.length}</b> de {catadores.length}
          </span>
          <span className="text-stone-400">Página 1 de 1</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: REGISTRAR CATADOR                                                  */}
      {/* ========================================================================= */}
      {modalRegistrarAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Registrar Nuevo Catador</h3>
                  <p className="text-xs text-stone-500">
                    Ingrese los datos de acreditación y contacto del catador Q-Grader
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalRegistrarAbierto(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarNuevo} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tipo de Documento *
                  </label>
                  <select
                    value={nuevoCatador.tipo_documento}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, tipo_documento: e.target.value })
                    }
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PAS">Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Número de Identificación *
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevoCatador.numero_identificacion}
                    onChange={(e) =>
                      setNuevoCatador({
                        ...nuevoCatador,
                        numero_identificacion: e.target.value,
                      })
                    }
                    placeholder="Ej. 1088324567"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primer Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevoCatador.primer_nombre}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, primer_nombre: e.target.value })
                    }
                    placeholder="Ej. Andrés"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Segundo Nombre
                  </label>
                  <input
                    type="text"
                    value={nuevoCatador.segundo_nombre}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, segundo_nombre: e.target.value })
                    }
                    placeholder="Ej. Felipe"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primer Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevoCatador.primer_apellido}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, primer_apellido: e.target.value })
                    }
                    placeholder="Ej. Martínez"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    value={nuevoCatador.segundo_apellido}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, segundo_apellido: e.target.value })
                    }
                    placeholder="Ej. Zapata"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={nuevoCatador.telefono}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, telefono: e.target.value })
                    }
                    placeholder="Ej. 3128904561"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={nuevoCatador.correo}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, correo: e.target.value })
                    }
                    placeholder="Ej. catador@tecnicafe.co"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Certificación CQI / Q-Grader *
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevoCatador.certificacion}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, certificacion: e.target.value })
                    }
                    placeholder="Ej. Q-Grader Arábica (CQI #4892)"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Laboratorio Vinculado
                  </label>
                  <input
                    type="text"
                    value={nuevoCatador.laboratorio}
                    onChange={(e) =>
                      setNuevoCatador({ ...nuevoCatador, laboratorio: e.target.value })
                    }
                    placeholder="Ej. Laboratorio Central TecniCafé"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalRegistrarAbierto(false)}
                  className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-amber-800 text-white font-semibold rounded-xl hover:bg-amber-900 transition-colors shadow-sm"
                >
                  Guardar Catador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDITAR CATADOR                                                     */}
      {/* ========================================================================= */}
      {modalEditarAbierto && catadorSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Actualizar Catador</h3>
                  <p className="text-xs text-stone-500">
                    ID: {catadorSeleccionado.numero_identificacion}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalEditarAbierto(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarEdicion} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    value={catadorSeleccionado.primer_nombre}
                    onChange={(e) =>
                      setCatadorSeleccionado({
                        ...catadorSeleccionado,
                        primer_nombre: e.target.value,
                      })
                    }
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primer Apellido
                  </label>
                  <input
                    type="text"
                    value={catadorSeleccionado.primer_apellido}
                    onChange={(e) =>
                      setCatadorSeleccionado({
                        ...catadorSeleccionado,
                        primer_apellido: e.target.value,
                      })
                    }
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={catadorSeleccionado.telefono}
                    onChange={(e) =>
                      setCatadorSeleccionado({
                        ...catadorSeleccionado,
                        telefono: e.target.value,
                      })
                    }
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={catadorSeleccionado.correo}
                    onChange={(e) =>
                      setCatadorSeleccionado({
                        ...catadorSeleccionado,
                        correo: e.target.value,
                      })
                    }
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Certificación CQI
                  </label>
                  <input
                    type="text"
                    value={catadorSeleccionado.certificacion}
                    onChange={(e) =>
                      setCatadorSeleccionado({
                        ...catadorSeleccionado,
                        certificacion: e.target.value,
                      })
                    }
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Laboratorio
                  </label>
                  <input
                    type="text"
                    value={catadorSeleccionado.laboratorio}
                    onChange={(e) =>
                      setCatadorSeleccionado({
                        ...catadorSeleccionado,
                        laboratorio: e.target.value,
                      })
                    }
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalEditarAbierto(false)}
                  className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-amber-800 text-white font-semibold rounded-xl hover:bg-amber-900 transition-colors shadow-sm"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONSULTAR CATADOR                                                  */}
      {/* ========================================================================= */}
      {modalConsultarAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Consultar Catador</h3>
                  <p className="text-xs text-stone-500">
                    Búsqueda directa por número de cédula o identificación
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalConsultarAbierto(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <form onSubmit={handleConsultar} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={cedulaConsulta}
                  onChange={(e) => setCedulaConsulta(e.target.value)}
                  placeholder="Ingrese número de documento..."
                  className="flex-1 border border-stone-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-700/20"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white font-semibold text-sm rounded-xl hover:bg-stone-900 transition-colors"
                >
                  Buscar
                </button>
              </form>

              {resultadoConsulta && (
                <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">
                      {resultadoConsulta.primer_nombre} {resultadoConsulta.primer_apellido}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                      {resultadoConsulta.estado}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">
                    <b>ID:</b> {resultadoConsulta.numero_identificacion}
                  </p>
                  <p className="text-xs text-stone-600">
                    <b>Certificación:</b> {resultadoConsulta.certificacion}
                  </p>
                  <p className="text-xs text-stone-600">
                    <b>Laboratorio:</b> {resultadoConsulta.laboratorio}
                  </p>
                  <p className="text-xs text-stone-600">
                    <b>Teléfono:</b> {resultadoConsulta.telefono}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setModalConsultarAbierto(false)}
                className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VER DETALLE CATADOR                                                */}
      {/* ========================================================================= */}
      {modalDetalleAbierto && catadorSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-900 to-stone-900 p-6 text-white relative">
              <button
                onClick={() => setModalDetalleAbierto(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-xl font-bold">
                  {catadorSeleccionado.primer_nombre[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-snug">
                    {catadorSeleccionado.primer_nombre} {catadorSeleccionado.segundo_nombre}{' '}
                    {catadorSeleccionado.primer_apellido} {catadorSeleccionado.segundo_apellido}
                  </h3>
                  <p className="text-xs text-amber-200/80">
                    Catador Profesional Q-Grader Certificado
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-stone-400 block mb-0.5">Identificación</span>
                  <span className="font-semibold text-stone-800">
                    {catadorSeleccionado.tipo_documento} {catadorSeleccionado.numero_identificacion}
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-stone-400 block mb-0.5">Experiencia</span>
                  <span className="font-semibold text-stone-800">
                    {catadorSeleccionado.experiencia}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><b>Acreditación:</b> {catadorSeleccionado.certificacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><b>Laboratorio:</b> {catadorSeleccionado.laboratorio}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><b>Teléfono:</b> {catadorSeleccionado.telefono}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><b>Correo:</b> {catadorSeleccionado.correo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    <b>Muestras evaluadas:</b> {catadorSeleccionado.muestras_evaluadas} cataciones
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setModalDetalleAbierto(false)}
                className="px-4 py-2 text-sm bg-stone-800 text-white rounded-xl hover:bg-stone-900 transition-colors font-medium"
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
