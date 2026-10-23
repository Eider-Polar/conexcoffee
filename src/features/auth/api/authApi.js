import api from '@/lib/axios';
import { IS_DEMO_MODE } from '@/lib/env';

// ============================================
// Auth API — Endpoints de autenticación
// ============================================
// Todas las llamadas de autenticación pasan por la instancia
// global de Axios (con withCredentials para cookies HttpOnly).
//
// Mientras no exista backend, IS_DEMO_MODE (src/lib/env.js) redirige
// login/register a ./demoAuth.js. En producción con
// VITE_ENABLE_DEMO=false se usa siempre la API real y un fallo de red
// se propaga como error (nunca se simula un éxito).
// ============================================

/**
 * Iniciar sesión con email y contraseña.
 */
export async function login(credentials) {
  if (IS_DEMO_MODE) {
    const { demoLogin } = await import('./demoAuth');
    return demoLogin(credentials);
  }

  const { data } = await api.post('/auth/login', credentials);
  return data;
}

/**
 * Registrar un nuevo usuario (comprador).
 *
 * @param {object} userData - Datos del comprador a registrar
 * @returns {{ user: object, message: string }}
 */
export async function register(userData) {
  if (IS_DEMO_MODE) {
    const { demoRegister } = await import('./demoAuth');
    return demoRegister(userData);
  }

  const { data } = await api.post('/auth/register', userData);
  return data;
}

/**
 * Cerrar sesión.
 * El backend debe invalidar la cookie HttpOnly.
 */
export async function logout() {
  if (IS_DEMO_MODE) return { message: 'Sesión demo cerrada' };

  const { data } = await api.post('/auth/logout');
  return data;
}

/**
 * Obtener el usuario autenticado actual.
 * Se llama al cargar la app para verificar si la sesión es válida.
 * El backend lee la cookie HttpOnly y devuelve los datos del usuario.
 *
 * skipAuthRedirect: un 401 aquí es normal para visitantes anónimos.
 */
export async function getMe() {
  const { data } = await api.get('/auth/me', { skipAuthRedirect: true });
  return data;
}
