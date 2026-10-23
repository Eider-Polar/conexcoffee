// ============================================
// Keep-Alive Robot — ConexCoffee
// ============================================
// Robot de ping periódico para evitar caídas por inactividad
// y mantener despiertos los servicios de despliegue (Vercel / Render / Backend).
//
// OPT-IN: solo se activa con VITE_ENABLE_KEEPALIVE=true, hay API real
// configurada y no se está en modo demo. Recomendado: sustituir por un cron
// externo (UptimeRobot / GitHub Actions) para no generar carga por cada visitante.
// ============================================

import api from './axios';
import { HAS_API, IS_DEMO_MODE } from './env';

const KEEPALIVE_ENABLED = import.meta.env.VITE_ENABLE_KEEPALIVE === 'true';

let keepAliveInterval = null;
const PING_INTERVAL_MS = 4 * 60 * 1000; // Cada 4 minutos

export function startKeepAliveRobot() {
  if (!KEEPALIVE_ENABLED || !HAS_API || IS_DEMO_MODE) return;
  if (keepAliveInterval) return;

  const pingServer = async () => {
    try {
      // Intenta ping al endpoint de salud o ruta base
      // skipAuthRedirect: un 401 en el ping nunca debe cerrar la sesión
      await api.get('/health', { timeout: 8000, skipAuthRedirect: true }).catch(async () => {
        // Fallback al endpoint raíz de la API
        await api.get('/', { timeout: 8000, skipAuthRedirect: true }).catch(() => {});
      });
      // Ping silencioso exitoso
    } catch {
      // Ignorar fallos de red silenciosamente sin bloquear la interfaz
    }
  };

  // Ping inicial tras 10 segundos de carga
  const initialTimer = setTimeout(pingServer, 10000);

  // Intervalo recurrente
  keepAliveInterval = setInterval(pingServer, PING_INTERVAL_MS);

  return () => {
    clearTimeout(initialTimer);
    if (keepAliveInterval) {
      clearInterval(keepAliveInterval);
      keepAliveInterval = null;
    }
  };
}

export function stopKeepAliveRobot() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
  }
}
