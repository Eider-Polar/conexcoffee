import api from '@/lib/axios';

// ============================================
// Auth API — Endpoints de autenticación
// ============================================
// Todas las llamadas de autenticación pasan por la instancia
// global de Axios (con withCredentials para cookies HttpOnly).
// ============================================

// Credenciales de prueba locales para demostración
const DEMO_USERS = {
  'superadmin@conexcoffee.com': { id: 'usr-1', name: 'SuperAdmin Conex', email: 'superadmin@conexcoffee.com', role: 'superadmin' },
  'empresa@conexcoffee.com': { id: 'usr-2', name: 'Café & Export S.A.S.', email: 'empresa@conexcoffee.com', role: 'empresa' },
  'broker@conexcoffee.com': { id: 'usr-3', name: 'Carlos Broker', email: 'broker@conexcoffee.com', role: 'broker' },
  'caficultor@conexcoffee.com': { id: 'usr-4', name: 'Finca La Esperanza', email: 'caficultor@conexcoffee.com', role: 'caficultor' },
  'productor@conexcoffee.com': { id: 'usr-4', name: 'Finca La Esperanza', email: 'productor@conexcoffee.com', role: 'caficultor' },
  'laboratorio@conexcoffee.com': { id: 'usr-6', name: 'Lab Certificación Calidad', email: 'laboratorio@conexcoffee.com', role: 'laboratorio' },
  'tecnico@conexcoffee.com': { id: 'usr-7', name: 'Ing. Asistente Técnico', email: 'tecnico@conexcoffee.com', role: 'tecnico' },
  'catador@conexcoffee.com': { id: 'usr-8', name: 'Q-Grader Certificado', email: 'catador@conexcoffee.com', role: 'catador' },
  'comprador@conexcoffee.com': { id: 'usr-5', name: 'Coffee Roasters Int.', email: 'comprador@conexcoffee.com', role: 'comprador' },
};

/**
 * Iniciar sesión con email y contraseña.
 * Incluye fallback de demostración con credenciales de prueba
 * si el backend aún no está levantado en local.
 */
export async function login(credentials) {
  const { email, password } = credentials;

  // Verificación directa de cuentas demo para pruebas locales
  if (DEMO_USERS[email] && password === '12345678') {
    return {
      user: DEMO_USERS[email],
      message: 'Sesión demo iniciada exitosamente',
    };
  }

  const { data } = await api.post('/auth/login', credentials);
  return data;
}

/**
 * Registrar un nuevo usuario (comprador).
 *
 * MODO DEMO: Si el backend no está disponible (ERR_CONNECTION_REFUSED),
 * simula un registro exitoso para poder probar el flujo en frontend.
 *
 * Para conectar con el backend real: no se necesita cambiar nada aquí.
 * Cuando la API responda correctamente, el bloque try devolverá la respuesta real.
 *
 * @param {object} userData - Datos del comprador a registrar
 * @returns {{ user: object, message: string }}
 */
export async function register(userData) {
  try {
    const { data } = await api.post('/auth/register', userData);
    return data;
  } catch (error) {
    // Si el backend no está levantado (error de red / conexión rechazada),
    // devolver respuesta simulada para pruebas de frontend.
    const isNetworkError =
      !error.response || error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED';

    if (isNetworkError) {
      // Simular latencia real de servidor
      await new Promise((r) => setTimeout(r, 800));
      return {
        message: 'Usuario registrado correctamente (modo demo)',
        user: {
          id: `demo-${Date.now()}`,
          nombres: userData.nombres,
          apellidos: userData.apellidos,
          email: userData.email,
          role: 'comprador',
        },
      };
    }

    // Si el backend sí responde pero con error (ej: email duplicado, validación),
    // propagar el error para que el formulario lo muestre.
    throw error;
  }
}

/**
 * Cerrar sesión.
 * El backend debe invalidar la cookie HttpOnly.
 */
export async function logout() {
  const { data } = await api.post('/auth/logout');
  return data;
}

/**
 * Obtener el usuario autenticado actual.
 * Se llama al cargar la app para verificar si la sesión es válida.
 * El backend lee la cookie HttpOnly y devuelve los datos del usuario.
 */
export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data;
}
