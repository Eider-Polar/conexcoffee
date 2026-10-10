import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Shield,
  X,
  Check,
} from 'lucide-react';
import ModuloCabecera from '../components/ModuloCabecera';

const INITIAL_USUARIOS = [
  {
    id: 1,
    nombre: 'SuperAdmin Conex',
    email: 'admin@conexcoffee.com',
    rol: 'SuperAdmin',
    estado: 'Activo',
    ultimoAcceso: '2026-09-11 22:40',
    avatar: '/images/users/avatar-1.jpg',
  },
  {
    id: 2,
    nombre: 'Café Especial Huila SAS',
    email: 'contacto@cafehuila.com',
    rol: 'Empresa',
    estado: 'Activo',
    ultimoAcceso: '2026-09-11 18:25',
    avatar: '/images/users/avatar-2.jpg',
  },
  {
    id: 3,
    nombre: 'Oscar Valverde',
    email: 'oscar.valverde@brokerconex.com',
    rol: 'Broker',
    estado: 'Activo',
    ultimoAcceso: '2026-09-11 15:10',
    avatar: '/images/users/avatar-7.jpg',
  },
  {
    id: 4,
    nombre: 'Miguel Florez',
    email: 'miguel.florez@conexcoffee.com',
    rol: 'Productor',
    estado: 'Activo',
    ultimoAcceso: '2026-09-10 09:30',
    avatar: '/images/users/avatar-3.jpg',
  },
  {
    id: 5,
    nombre: 'Blue Coffee Roasters Inc.',
    email: 'john.smith@bluecoffeeroasters.com',
    rol: 'Comprador',
    estado: 'Activo',
    ultimoAcceso: '2026-09-11 14:15',
    avatar: '/images/users/avatar-10.jpg',
  },
  {
    id: 6,
    nombre: 'Laboratorio Central TecniCafé',
    email: 'laboratorio@tecnicafe.co',
    rol: 'Laboratorio',
    estado: 'Activo',
    ultimoAcceso: '2026-09-09 11:45',
    avatar: '/images/users/avatar-5.jpg',
  },
  {
    id: 7,
    nombre: 'Carlos Eduardo Ramírez',
    email: 'carlos.ramirez@conexcoffee.com',
    rol: 'Tecnico',
    estado: 'Activo',
    ultimoAcceso: '2026-09-11 08:20',
    avatar: '/images/users/avatar-8.jpg',
  },
];

const ROLES_DISPONIBLES = [
  'SuperAdmin',
  'Empresa',
  'Broker',
  'Productor',
  'Comprador',
  'Laboratorio',
  'Tecnico',
  'Catador',
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(INITIAL_USUARIOS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');

  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);
  const [modalRolAbierto, setModalRolAbierto] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'Productor',
    password: '',
  });

  const abrirModalCrear = () => {
    setFormData({
      nombre: '',
      email: '',
      rol: 'Productor',
      password: '',
    });
    setModalRegistroAbierto(true);
  };

  const abrirModalAsignarRol = (u) => {
    setUsuarioActual(u);
    setModalRolAbierto(true);
  };

  const guardarCreacion = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      nombre: formData.nombre,
      email: formData.email,
      rol: formData.rol,
      estado: 'Activo',
      ultimoAcceso: 'Recién registrado',
      avatar: '/images/users/user-dummy-img.jpg',
    };
    setUsuarios([nuevo, ...usuarios]);
    setModalRegistroAbierto(false);
  };

  const asignarRol = (nuevoRol) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === usuarioActual.id ? { ...u, rol: nuevoRol } : u
      )
    );
    setModalRolAbierto(false);
  };

  const toggleEstado = (id) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === id
          ? { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' }
          : u
      )
    );
  };

  const filtrados = usuarios.filter((u) => {
    const term = searchTerm.toLowerCase();
    const coincideTexto =
      u.nombre.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.rol.toLowerCase().includes(term);

    if (filtroRol === 'todos') return coincideTexto;
    return coincideTexto && u.rol === filtroRol;
  });

  return (
    <div className="space-y-6">
      {/* Cabecera idéntica a components.cabecera-modulo */}
      <ModuloCabecera
        titulo="Gestión de Usuarios"
        subtitulo="Control de accesos, roles y permisos de la plataforma ConexCoffee"
        imagenPortada="/images/portadas/empresa.jpg"
        mensaje="En este módulo podrás administrar los usuarios del sistema, sus roles y permisos asignados."
        icono={Users}
        totalRegistros={filtrados.length}
        onRegistrar={abrirModalCrear}
        textoBotonRegistrar="Crear Usuario"
      />

      {/* Buscador y Filtro por Rol */}
      <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o rol…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-[#AD2E01]/20 focus:border-[#AD2E01]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-surface-400 shrink-0" />
          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-surface-200 bg-white text-surface-700 focus:outline-none focus:ring-2 focus:ring-[#AD2E01]/20 cursor-pointer"
          >
            <option value="todos">Todos los roles</option>
            {ROLES_DISPONIBLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla Oficial de Usuarios */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-50 border-b border-surface-200 text-surface-600 uppercase text-xs tracking-wider">
              <tr>
                <th scope="col" className="px-4 py-3.5 font-bold w-12 text-center">Nº</th>
                <th scope="col" className="px-5 py-3.5 font-bold">Usuario</th>
                <th scope="col" className="px-5 py-3.5 font-bold">Correo</th>
                <th scope="col" className="px-5 py-3.5 font-bold text-center">Rol Asignado</th>
                <th scope="col" className="px-5 py-3.5 font-bold text-center">Estado</th>
                <th scope="col" className="px-5 py-3.5 font-bold text-center">Último Acceso</th>
                <th scope="col" className="px-5 py-3.5 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-surface-500">
                    No se encontraron usuarios con esos filtros.
                  </td>
                </tr>
              ) : (
                filtrados.map((u, index) => (
                  <tr key={u.id} className="hover:bg-surface-50/80 transition-colors">
                    <td className="px-4 py-3.5 text-center font-bold text-surface-500 text-xs">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatar}
                          alt={u.nombre}
                          className="h-8 w-8 rounded-full object-cover border border-surface-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/users/user-dummy-img.jpg';
                          }}
                        />
                        <span className="font-semibold text-surface-900">{u.nombre}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-surface-600 text-xs font-mono">
                      {u.email}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-[#FFF1ED] text-[#AD2E01] border border-[#AD2E01]/20">
                        <Shield className="h-3 w-3" />
                        {u.rol}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleEstado(u.id)}
                        className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          u.estado === 'Activo'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-surface-100 text-surface-500 border border-surface-200 hover:bg-surface-200'
                        }`}
                      >
                        {u.estado}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-center text-xs text-surface-500 font-mono">
                      {u.ultimoAcceso}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => abrirModalAsignarRol(u)}
                          title="Cambiar Rol"
                          className="p-1.5 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-[#AD2E01] hover:border-[#AD2E01]/30 hover:bg-[#FFF1ED] transition-colors cursor-pointer shadow-2xs"
                        >
                          <Shield className="h-4 w-4" />
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

      {/* MODAL CREAR USUARIO */}
      {modalRegistroAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#AD2E01]" />
                <h3 className="text-base font-bold text-surface-900">Crear Nuevo Usuario</h3>
              </div>
              <button
                onClick={() => setModalRegistroAbierto(false)}
                className="p-1 rounded-lg text-surface-400 hover:bg-surface-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={guardarCreacion} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-surface-700 mb-1">Nombre Completo *</label>
                <input
                  required
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  placeholder="Ej. Juan Carlos Pérez"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-surface-700 mb-1">Correo Electrónico *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  placeholder="usuario@conexcoffee.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-surface-700 mb-1">Rol Inicial *</label>
                <select
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                >
                  {ROLES_DISPONIBLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-surface-700 mb-1">Contraseña Temporal *</label>
                <input
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-surface-200"
                  placeholder="Mínimo 8 caracteres"
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
                  className="px-5 py-2 rounded-xl bg-[#AD2E01] hover:bg-[#8D2501] text-white text-sm font-semibold shadow-md cursor-pointer"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ASIGNAR ROL */}
      {modalRolAbierto && usuarioActual && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#AD2E01]" />
                <h3 className="text-base font-bold text-surface-900">Asignar Rol a {usuarioActual.nombre}</h3>
              </div>
              <button
                onClick={() => setModalRolAbierto(false)}
                className="p-1 rounded-lg text-surface-400 hover:bg-surface-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-surface-600 my-3">
              Seleccione el rol que determinará los permisos y accesos del usuario en la plataforma:
            </p>

            <div className="space-y-1.5 mt-2 max-h-60 overflow-y-auto">
              {ROLES_DISPONIBLES.map((r) => (
                <button
                  key={r}
                  onClick={() => asignarRol(r)}
                  className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                    usuarioActual.rol === r
                      ? 'border-[#AD2E01] bg-[#FFF1ED] text-[#AD2E01] font-bold'
                      : 'border-surface-200 hover:bg-surface-50 text-surface-800'
                  }`}
                >
                  <span className="text-xs font-semibold">{r}</span>
                  {usuarioActual.rol === r && <Check className="h-4 w-4 text-[#AD2E01]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
