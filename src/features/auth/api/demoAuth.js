// ============================================
// Demo Auth — SOLO para desarrollo / demos sin backend
// ============================================
// Este módulo se importa de forma dinámica desde authApi.js
// únicamente cuando IS_DEMO_MODE es true (ver src/lib/env.js).
// En producción con VITE_ENABLE_DEMO=false nunca se descarga.
//
// Eliminar este archivo cuando el backend esté disponible.
// ============================================

const DEMO_PASSWORD = '12345678';

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

const latency = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/** Devuelve la respuesta de login demo, o lanza un error con forma de Axios. */
export async function demoLogin({ email, password }) {
  await latency(300);
  const user = DEMO_USERS[email];
  if (user && password === DEMO_PASSWORD) {
    return { user, message: 'Sesión demo iniciada exitosamente' };
  }
  const error = new Error('Credenciales inválidas');
  error.response = { status: 401, data: { message: 'Credenciales inválidas (modo demo)' } };
  throw error;
}

/** Simula el registro de un comprador. */
export async function demoRegister(userData) {
  await latency(800);
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
