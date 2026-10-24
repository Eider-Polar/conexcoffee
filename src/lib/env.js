// ============================================
// Configuración de entorno — ConexCoffee
// ============================================
// Punto único de lectura de variables VITE_*.
//
// MODO DEMO (sin backend):
//   - Se activa automáticamente en desarrollo (`npm run dev`).
//   - En producción solo se activa con VITE_ENABLE_DEMO=true
//     (útil para desplegar una demo en Vercel mientras no hay API).
//   - Con VITE_ENABLE_DEMO=false se fuerza el uso del backend real.
// ============================================

const demoFlag = import.meta.env.VITE_ENABLE_DEMO;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const IS_DEMO_MODE =
  demoFlag === 'true' || (demoFlag !== 'false' && import.meta.env.DEV);

/** true si hay una API configurada a la que se pueda llamar. */
export const HAS_API = Boolean(API_BASE_URL);

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ConexCoffee';
export const PAYMENT_PUBLIC_KEY = import.meta.env.VITE_PAYMENT_PUBLIC_KEY || '';
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
export const KEEPALIVE_ENABLED = import.meta.env.VITE_ENABLE_KEEPALIVE === 'true';

if (!IS_DEMO_MODE && !HAS_API) {
  console.error(
    '[ConexCoffee] VITE_API_BASE_URL no está definida y el modo demo está desactivado.'
  );
}
