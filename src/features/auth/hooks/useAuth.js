import useAuthStore from '@/store/useAuthStore';
import { getMe, logout as logoutApi } from '../api/authApi';
import { ROLE_DASHBOARD_ROUTES } from '@/lib/constants';

// ============================================
// useAuth — Hook de autenticación
// ============================================
// Provee funciones de autenticación y verifica la sesión al montar.
//
// Uso:
//   const { user, isAuthenticated, checkSession, logout } = useAuth();
// ============================================

export default function useAuth() {
  const { user, role, isAuthenticated, isLoading, setUser, clearAuth, setLoading } = useAuthStore();

  /**
   * Verifica la sesión actual llamando a getMe().
   * Debe llamarse al cargar la app (en AppProviders).
   */
  const checkSession = async () => {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
    } catch {
      // Si getMe falla (401), el interceptor ya limpia el auth
      clearAuth();
    }
  };

  /**
   * Cierra la sesión del usuario.
   */
  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // Si falla el logout en backend, igual limpiamos frontend
    } finally {
      clearAuth();
    }
  };

  /**
   * Obtiene la ruta del dashboard según el rol del usuario.
   */
  const getDashboardRoute = () => {
    return ROLE_DASHBOARD_ROUTES[role] || '/';
  };

  return {
    user,
    role,
    isAuthenticated,
    isLoading,
    checkSession,
    logout,
    getDashboardRoute,
  };
}
