import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import useUIStore from '@/store/useUIStore';
import { Menu, LogOut, User, Bell } from 'lucide-react';

// ============================================
// Header — Barra superior del dashboard
// ============================================
// Muestra: botón de menú (mobile), buscador, notificaciones, perfil.
// ============================================

export default function Header() {
  const { user, role, clearAuth } = useAuthStore();
  const { setSidebarOpen } = useUIStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // TODO: Llamar al endpoint de logout del backend
      // await api.post('/auth/logout');
      clearAuth();
      navigate('/login');
    } catch {
      // Si falla el logout en backend, igual limpiamos el frontend
      clearAuth();
      navigate('/login');
    }
  };

  const rolMostrar =
    role === 'caficultor' || user?.role === 'caficultor'
      ? 'Caficultor'
      : role
      ? role.charAt(0).toUpperCase() + role.slice(1)
      : 'Caficultor';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-surface-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100 cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors relative cursor-pointer">
            <Bell className="h-5 w-5" />
            {/* Badge de notificación */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-surface-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 text-[#AD2E01] flex items-center justify-center font-bold text-xs">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-stone-900 leading-tight">
                {user?.name || 'Finca La Esperanza'}
              </span>
              <span className="text-[11px] font-semibold text-[#AD2E01] leading-tight">
                {rolMostrar}
              </span>
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="p-2 rounded-lg text-surface-500 hover:bg-danger-50 hover:text-danger-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
