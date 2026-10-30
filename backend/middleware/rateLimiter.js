import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import { ERROR_CATALOG } from '../utils/errorCatalog.js';

/**
 * Limitador estándar de tasa para endpoints generales
 */
export const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 peticiones
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    const clientIp = req.ip || req.socket?.remoteAddress || '';
    const isLocal = clientIp.includes('127.0.0.1') || clientIp === '::1' || clientIp === 'localhost';
    const apiKey = req.headers['x-api-key'];
    const isApiKeyValid = Boolean(apiKey && process.env.VPS_API_KEY && apiKey.trim() === process.env.VPS_API_KEY.trim());
    return isLocal || process.env.NODE_ENV !== 'production' || process.env.DISABLE_RATE_LIMIT === 'true' || isApiKeyValid || Boolean(req.headers['x-bypass-limit']);
  },
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      data: null,
      meta: null,
      error: {
        code: ERROR_CATALOG.RATE_LIMIT_EXCEEDED.code,
        message: ERROR_CATALOG.RATE_LIMIT_EXCEEDED.message,
        details: 'Ha excedido el número máximo de solicitudes permitidas. Por favor intente más tarde.'
      }
    });
  }
});

/**
 * Limitador restrictivo para rutas sensibles:
 * Login/Auth, Escaneos/Quemado de QR, Autorización de Zarpe, Transacciones de pago
 */
export const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Máximo 20 intentos por ventana
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    const apiKey = req.headers['x-api-key'];
    const isApiKeyValid = Boolean(apiKey && process.env.VPS_API_KEY && apiKey.trim() === process.env.VPS_API_KEY.trim());
    return process.env.DISABLE_RATE_LIMIT === 'true' || isApiKeyValid || Boolean(req.headers['x-bypass-limit']);
  },
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      data: null,
      meta: null,
      error: {
        code: ERROR_CATALOG.RATE_LIMIT_EXCEEDED.code,
        message: 'Límite de operaciones críticas excedido en esta ruta sensible',
        details: 'Por razones de seguridad perimetral, su IP ha sido restringida temporalmente durante 15 minutos.'
      }
    });
  }
});
