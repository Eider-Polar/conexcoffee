import axios from 'axios';
import { API_BASE_URL } from '@/lib/env';

// ============================================
// Instancia global de Axios — ConexCoffee
// ============================================
// ⚠️ REGLA DE ARQUITECTURA:
// Capa de infraestructura pura. NO depende de React ni de stores superiores.
// Si ocurre un 401, invoca el handler registrado mediante `setUnauthorizedHandler`.
// ============================================

let onUnauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  onUnauthorizedHandler = handler;
}

const api = axios.create({
  baseURL: API_BASE_URL || undefined,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// ============================================
// Interceptor de REQUEST
// ============================================
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ============================================
// Interceptor de RESPONSE
// ============================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Con config.skipAuthRedirect = true (ej. getMe, health) un 401 es
    // esperado (visitante anónimo) y NO debe tocar el estado ni redirigir.
    if (status === 401 && !error.config?.skipAuthRedirect) {
      if (typeof onUnauthorizedHandler === 'function') {
        onUnauthorizedHandler();
      }
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
