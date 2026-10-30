import { notifySuperAdmins } from '../helpers/NotifyAdmins.js';
import models from '../modules/index.js';

const { AlertaSistemaGlobal } = models;

// --- CONFIGURACIÓN DE UMBRALES ---
// Ventana de evaluación (en milisegundos)
const WINDOW_MS = (parseInt(process.env.DDOS_WINDOW_SECONDS) || 10) * 1000;

// Máximo de peticiones permitidas en esa ventana (40 peticiones en 10s = 4 req/s)
// NOTA: El polling de 5s del frontend genera solo 2 peticiones en 10s, por lo que pasa sin problemas.
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.DDOS_MAX_REQUESTS_WINDOW) || 40;

// Tiempo de bloqueo temporal si se supera el umbral (15 minutos)
const BLOCK_DURATION_MS = (parseInt(process.env.DDOS_BLOCK_MINUTES) || 15) * 60 * 1000;

// Intervalo mínimo entre notificaciones push para no saturar al SuperAdmin (10 minutos)
const ALERT_COOLDOWN_MS = 10 * 60 * 1000;

// Almacenamiento en memoria
const ipRequestHistory = new Map(); // ip -> { count: number, resetTime: number }
const blacklistedIps = new Map();   // ip -> unblockTime (timestamp)
const alertCooldowns = new Map();   // ip -> lastAlertTime (timestamp)

// Limpieza periódica cada 5 minutos para evitar acumulación de memoria
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestHistory.entries()) {
    if (now > data.resetTime) ipRequestHistory.delete(ip);
  }
  for (const [ip, unblockTime] of blacklistedIps.entries()) {
    if (now > unblockTime) blacklistedIps.delete(ip);
  }
  for (const [ip, alertTime] of alertCooldowns.entries()) {
    if (now - alertTime > ALERT_COOLDOWN_MS) alertCooldowns.delete(ip);
  }
}, 5 * 60 * 1000);

/**
 * Middleware para mitigar ataques de denegación de servicio (DDoS / Flood)
 * Detecta ráfagas anómalas, bloquea la IP y notifica a los SuperAdmins.
 */
export const ddosShield = async (req, res, next) => {
  // Ignorar peticiones OPTIONS (Preflight de CORS del navegador)
  if (req.method === 'OPTIONS') {
    return next();
  }

  // Obtener IP real del cliente (compatible con Nginx / Cloudflare / Proxy)
  const clientIp = req.headers['cf-connecting-ip'] || 
                   req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.socket?.remoteAddress || 
                   req.ip || 
                   'unknown';

  // Excluir localhost del servidor en entorno local o si es el script interno de métricas
  const isLocalhost = clientIp.includes('127.0.0.1') || clientIp === '::1' || clientIp === 'localhost';
  const hasValidApiKey = req.headers['x-api-key'] && req.headers['x-api-key'] === process.env.VPS_API_KEY;
  const isVpsInternalScript = isLocalhost || process.env.NODE_ENV !== 'production' || hasValidApiKey || process.env.DISABLE_RATE_LIMIT === 'true';
  if (isVpsInternalScript) {
    return next();
  }

  const now = Date.now();

  // 1. Verificar si la IP está bloqueada
  if (blacklistedIps.has(clientIp)) {
    const unblockTime = blacklistedIps.get(clientIp);
    if (now < unblockTime) {
      const remainingSeconds = Math.ceil((unblockTime - now) / 1000);
      return res.status(429).json({
        success: false,
        msg: `Acceso temporalmente bloqueado por exceso de peticiones inusuales. Intenta de nuevo en ${remainingSeconds} segundos.`,
        retryAfter: remainingSeconds
      });
    } else {
      blacklistedIps.delete(clientIp);
    }
  }

  // 2. Control de ventana deslizante por IP
  let history = ipRequestHistory.get(clientIp);
  if (!history || now > history.resetTime) {
    history = { count: 1, resetTime: now + WINDOW_MS };
    ipRequestHistory.set(clientIp, history);
  } else {
    history.count++;
  }

  // 3. ¿Superó el umbral de pico extremo (DDoS)?
  if (history.count > MAX_REQUESTS_PER_WINDOW) {
    // Bloquear IP
    blacklistedIps.set(clientIp, now + BLOCK_DURATION_MS);
    ipRequestHistory.delete(clientIp);

    console.warn(`🚨 [DDoS Shield] IP Bloqueada por tráfico anómalo: ${clientIp} (${history.count} peticiones en ${WINDOW_MS / 1000}s)`);

    // Enviar Alerta Push y registrar en Base de Datos (con control de cooldown)
    const lastAlert = alertCooldowns.get(clientIp) || 0;
    if (now - lastAlert > ALERT_COOLDOWN_MS) {
      alertCooldowns.set(clientIp, now);

      const alertTitle = '🚨 Alerta de Tráfico Anómalo (DDoS)';
      const alertMsg = `Se detectó un pico inusual de ${history.count} peticiones en ${WINDOW_MS / 1000}s desde la IP ${clientIp}. La IP ha sido bloqueada temporalmente por 15 minutos.`;

      // 1. Notificación Push a SuperAdmins
      notifySuperAdmins(alertTitle, alertMsg, '/logs').catch(err => 
        console.error('Error enviando notificación push de seguridad:', err)
      );

      // 2. Registrar en la base de datos alertas_sistema_global
      if (AlertaSistemaGlobal) {
        AlertaSistemaGlobal.create({
          tipo: 'seguridad_ddos',
          titulo: alertTitle,
          mensaje: alertMsg,
          activa_desde: new Date(),
          activa_hasta: new Date(now + BLOCK_DURATION_MS)
        }).catch(err => console.warn('No se pudo registrar alerta de DDoS en BD:', err.message));
      }
    }

    return res.status(429).json({
      success: false,
      msg: 'Demasiadas solicitudes en un periodo muy corto. Tu IP ha sido bloqueada temporalmente.',
      retryAfter: Math.ceil(BLOCK_DURATION_MS / 1000)
    });
  }

  next();
};

export default ddosShield;
