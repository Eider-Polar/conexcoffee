import jwt from 'jsonwebtoken';
import { DomainError } from '../utils/DomainError.js';
import { ERROR_CATALOG } from '../utils/errorCatalog.js';
import UsuarioSistemaRepository from '../modules/usuarios_sistema/repository/UsuarioSistemaRepository.js';
import { sequelize } from '../config/database.js';

const usuarioRepo = new UsuarioSistemaRepository();

const extractCookieToken = (req) => {
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').reduce((acc, part) => {
    const [rawKey, ...rawVal] = part.trim().split('=');
    if (rawKey) acc[rawKey.trim()] = decodeURIComponent(rawVal.join('='));
    return acc;
  }, {});
  return cookies.token || cookies.jwt || null;
};

export const checkAuth = async (req, res, next) => {
  let token = req.headers.authorization || req.headers['authorization'] || extractCookieToken(req);

  try {
    if (!token) {
      throw new DomainError(
        ERROR_CATALOG.AUTH_TOKEN_MISSING.code,
        ERROR_CATALOG.AUTH_TOKEN_MISSING.message,
        'Se requiere sesión mediante cookie HttpOnly o cabecera Authorization Bearer <token>',
        401
      );
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trim();
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'conexcoffee_secret_key');
    } catch (jwtErr) {
      if (jwtErr.name === 'TokenExpiredError') {
        throw new DomainError(
          ERROR_CATALOG.SESSION_EXPIRED.code,
          'La sesión ha expirado. Por favor inicie sesión nuevamente.',
          null,
          401
        );
      }
      throw new DomainError(
        ERROR_CATALOG.AUTH_TOKEN_MISSING.code,
        'Token de autenticación no válido o corrupto',
        null,
        401
      );
    }

    const user = await usuarioRepo.findById(decoded.id);
    if (!user || !user.esta_activo) {
      throw new DomainError(
        ERROR_CATALOG.INVALID_CREDENTIALS.code,
        'Usuario no encontrado o cuenta inactiva',
        null,
        401
      );
    }

    req.user = user;
    req.userId = user.id;
    req.userRole = user.rol_principal;

    // Contexto de auditoría perimetral para PostgreSQL (registro de cambios)
    const clientIp = req.headers['cf-connecting-ip'] || 
                     req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                     req.socket?.remoteAddress || 
                     req.ip || 
                     '127.0.0.1';
    const cleanIp = clientIp.includes('127.0.0.1') ? '127.0.0.1' : clientIp.replace(/^.*:/, '');
    const userAgent = (req.headers['user-agent'] || 'Sistema ConexCoffee').slice(0, 300);

    try {
      await sequelize.query(
        "SELECT set_config('app.current_user_id', :userId, false), set_config('app.client_ip', :clientIp, false), set_config('app.user_agent', :userAgent, false);",
        { replacements: { userId: user.id, clientIp: cleanIp, userAgent } }
      );
    } catch (_) {}

    next();
  } catch (error) {
    next(error);
  }
};

export default checkAuth;