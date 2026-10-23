import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';
import { API_BASE_URL } from '@/lib/env';

// ============================================
// Instancia global de Axios — ConexCoffee
// ============================================
// ⚠️ REGLA DE SEGURIDAD:
// withCredentials: true → permite enviar/recibir cookies HttpOnly automáticamente.
// NUNCA guardar tokens en localStorage o en el estado global.
// La sesión se maneja EXCLUSIVAMENTE con cookies HttpOnly desde el backend.
// ============================================

const api = axios.create({
  baseURL: API_BASE_URL || undefined,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    // Header adicional para ayudar al backend a identificar requests del frontend
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// ============================================
// Interceptor de REQUEST
// ============================================
// Añade headers de seguridad a cada petición.
// NO añadimos Authorization header porque la sesión
// se maneja con cookies HttpOnly (más seguro).
// ============================================
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// Interceptor de RESPONSE
// ============================================
// Captura errores de autenticación (401) de forma global.
// Si el backend responde con 401, significa que la sesión
// expiró o es inválida → cerramos sesión automáticamente.
// ============================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Con config.skipAuthRedirect = true (ej. getMe, health) un 401 es
    // esperado (visitante anónimo) y NO debe tocar el estado ni redirigir.
    if (status === 401 && !error.config?.skipAuthRedirect) {
      // Limpiar estado de autenticación. No se hace redirección dura:
      // ProtectedRoute detecta isAuthenticated=false y navega a /login
      // sin recargar la app. Las rutas públicas no se ven afectadas.
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
    }

    if (status === 403) {
      // Acceso prohibido — el usuario no tiene el rol adecuado
      console.warn('[ConexCoffee] Acceso prohibido: rol insuficiente');
    }

    if (status === 429) {
      // Rate limiting — demasiadas peticiones
      console.warn('[ConexCoffee] Demasiadas peticiones. Intenta de nuevo más tarde.');
    }

    return Promise.reject(error);
  }
);

/**
 * Extrae un mensaje legible de un error de Axios.
 * Evita repetir `error.response?.data?.message` en cada componente.
 */
export function getErrorMessage(error, fallback = 'Ocurrió un error inesperado') {
  if (error?.code === 'ECONNABORTED') return 'La solicitud tardó demasiado. Intenta de nuevo.';
  if (!error?.response) return 'No se pudo conectar con el servidor.';
  return error.response.data?.message || fallback;
}

export default api;
