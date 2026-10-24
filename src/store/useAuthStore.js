import { create } from 'zustand';
import queryClient from '@/lib/queryClient';

// ============================================
// Store de Autenticación — ConexCoffee
// ============================================
// ⚠️ REGLA DE SEGURIDAD CRÍTICA:
// Este store NO usa persistencia (localStorage/sessionStorage).
// La sesión se mantiene con cookies HttpOnly del backend.
// Al recargar la página, se llama a getMe() para recuperar el usuario.
//
// NUNCA guardar tokens, contraseñas, o datos sensibles aquí.
// Solo se almacena la información del usuario que devuelve el backend.
// ============================================

const useAuthStore = create((set) => ({
  // Estado
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true, // true hasta que se verifique la sesión inicial

  // ============================================
  // Actions
  // ============================================

  /**
   * Establece el usuario autenticado en el store.
   * Llamado después de login exitoso o getMe().
   *
   * @param {object} userData - Datos del usuario desde el backend
   * @param {string} userData.role - Rol del usuario (superadmin, empresa, etc.)
   */
  setUser: (userData) =>
    set({
      user: userData,
      role: userData?.role || null,
      isAuthenticated: true,
      isLoading: false,
    }),

  /**
   * Limpia completamente el estado de autenticación.
   * Llamado al hacer logout o cuando el backend responde 401.
   */
  clearAuth: () => {
    // La caché de datos de servidor pertenece al usuario saliente: descartarla
    // para no mostrar su información a la siguiente sesión.
    queryClient.clear();
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  /**
   * Establece el estado de carga.
   * Útil mientras se verifica la sesión al cargar la app.
   */
  setLoading: (loading) =>
    set({ isLoading: loading }),
}));

export { useAuthStore };
export default useAuthStore;
