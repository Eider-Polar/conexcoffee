import { DomainError } from '../utils/DomainError.js';
import { ERROR_CATALOG } from '../utils/errorCatalog.js';

/**
 * Middleware RBAC para validar roles autorizados en ConexCoffee
 * Roles disponibles:
 * 'ADMINISTRADOR', 'EMPRESA_EXPORTADORA', 'ASISTENTE_TECNICO',
 * 'CAFICULTOR', 'LABORATORIO', 'CATADOR', 'BROKER', 'COMPRADOR_INTERNACIONAL'
 * @param {...string} allowedRoles
 */
export const checkRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new DomainError(
        ERROR_CATALOG.AUTH_TOKEN_MISSING.code,
        'Usuario no autenticado para validar permisos',
        null,
        401
      ));
    }

    const userRole = req.user.rol_principal;
    if (allowedRoles.includes(userRole) || userRole === 'ADMINISTRADOR') {
      return next();
    }

    return next(new DomainError(
      ERROR_CATALOG.ROLE_UNAUTHORIZED.code,
      `El rol '${userRole}' no tiene autorización para ejecutar esta acción`,
      `Roles requeridos: ${allowedRoles.join(', ')}`,
      403
    ));
  };
};

export default checkRoles;
