// ============================================
// Configuración de entorno — ConexCoffee
// ============================================
// Punto único de lectura de variables VITE_*.
// Conectado por defecto al Backend Real en http://localhost:3001/api
// ============================================

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:3001/api';

export const IS_DEMO_MODE = false;

export const HAS_API = Boolean(API_BASE_URL);
