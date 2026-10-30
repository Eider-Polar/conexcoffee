import { DomainError } from '../utils/DomainError.js';
import { ERROR_CATALOG } from '../utils/errorCatalog.js';

/**
 * Middleware para validar permisos exclusivos de Administrador ConexCoffee
 */
export const checkSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new DomainError(
      ERROR_CATALOG.AUTH_TOKEN_MISSING.code,
      'Se requiere autenticación para acceder a esta ruta administrativa',
      null,
      401
    ));
  }

  if (req.user.rol_principal !== 'ADMINISTRADOR') {
    return next(new DomainError(
      ERROR_CATALOG.ROLE_UNAUTHORIZED.code,
      'Se requieren privilegios de Administrador para realizar esta operación',
      `Rol actual: ${req.user.rol_principal}`,
      403
    ));
  }

  next();
};

export default checkSuperAdmin;
