import { useCallback } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { getMe, login as loginApi, logout as logoutApi } from '../api/authApi';
import { ROLE_DASHBOARD_ROUTES } from '@/lib/constants';
import { IS_DEMO_MODE } from '@/lib/env';

// ============================================
// useAuth — Hook de autenticación
// ============================================
// Provee funciones de autenticación y verifica la sesión al montar.
// Usa selectores de Zustand para evitar re-renders innecesarios;
// las acciones del store son estables.
//
// Uso:
//   const { user, isAuthenticated, checkSession, login, logout } = useAuth();
// ============================================

export default function useAuth() {
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setLoading = useAuthStore((s) => s.setLoading);

  /**
   * Verifica la sesión actual llamando a getMe().
   * Debe llamarse al cargar la app (en AppProviders).
   * En modo demo no hay backend ni cookie: se arranca sin sesión.
   */
  const checkSession = useCallback(async () => {
    if (IS_DEMO_MODE) {
      clearAuth();
      return;
    }
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
    } catch {
      // 401 esperado para visitantes anónimos: sin sesión
      clearAuth();
    }
  }, [clearAuth, setLoading, setUser]);

  /**
   * Inicia sesión y guarda el usuario en el store.
   * @returns {Promise<object>} usuario autenticado
   */
  const login = useCallback(
    async (credentials) => {
      const data = await loginApi(credentials);
      setUser(data.user);
      return data.user;
    },
    [setUser]
  );

  /**
   * Cierra la sesión del usuario.
   */
  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // Si falla el logout en backend, igual limpiamos frontend
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  /**
   * Obtiene la ruta del dashboard según el rol del usuario.
   */
  const getDashboardRoute = useCallback(() => ROLE_DASHBOARD_ROUTES[role] || '/', [role]);

  return {
    user,
    role,
    isAuthenticated,
    isLoading,
    checkSession,
    login,
    logout,
    getDashboardRoute,
  };
}
