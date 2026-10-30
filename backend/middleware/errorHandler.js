import { DomainError } from '../utils/DomainError.js';
import { ERROR_CATALOG } from '../utils/errorCatalog.js';

/**
 * Middleware Global de Manejo de Errores ConexCoffee
 * Garantiza el formato uniforme:
 * {
 *   "status": "error",
 *   "data": null,
 *   "meta": null,
 *   "error": {
 *     "code": "CC-XXXX",
 *     "message": "...",
 *     "details": "..."
 *   }
 * }
 */
export const errorHandler = (err, req, res, next) => {
  // Valores por defecto
  let statusCode = 500;
  let code = ERROR_CATALOG.INTERNAL_ERROR.code;
  let message = 'Error interno del servidor';
  let details = null;

  // 1. Excepción de Dominio ConexCoffee
  if (err instanceof DomainError) {
    statusCode = err.statusCode || 400;
    code = err.code || 'CC-0000';
    message = err.message;
    details = err.details;
  }
  // 2. Excepciones disparadas por PostgreSQL / Triggers (ej: RAISE EXCEPTION 'CC-0F30: ...')
  else if (err.original && typeof err.original.message === 'string' && /CC-[0-9A-Z]{4}/.test(err.original.message)) {
    statusCode = 400;
    const match = err.original.message.match(/(CC-[0-9A-Z]{4}):\s*(.*)/);
    if (match) {
      code = match[1];
      message = match[2];
      details = err.original.detail || null;
    } else {
      code = 'CC-0005';
      message = err.original.message;
    }
  }
  // 3. Error de validación de Sequelize
  else if (err.name === 'SequelizeValidationError') {
    statusCode = 422;
    code = ERROR_CATALOG.VALIDATION_ERROR.code;
    message = 'Error de validación en los campos proporcionados';
    details = err.errors ? err.errors.map(e => ({ field: e.path, message: e.message })) : err.message;
  }
  // 4. Conflicto de unicidad de Sequelize
  else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    code = ERROR_CATALOG.DUPLICATE_RESOURCE.code;
    message = 'Registro duplicado. Uno de los valores únicos ya se encuentra registrado.';
    details = err.errors ? err.errors.map(e => ({ field: e.path, value: e.value })) : err.message;
  }
  // 5. Error de clave foránea de Sequelize
  else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    code = ERROR_CATALOG.VALIDATION_ERROR.code;
    message = 'La entidad referenciada no existe o no es válida';
    details = `Violación de relación en la tabla: ${err.table || 'desconocida'}`;
  }
  // 6. Error de sintaxis JSON en el body
  else if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    code = ERROR_CATALOG.VALIDATION_ERROR.code;
    message = 'El cuerpo de la solicitud no contiene un JSON válido';
    details = err.message;
  }
  // 7. Bloqueo por CORS
  else if (err.message && err.message.includes('Bloqueado por CORS')) {
    statusCode = 403;
    code = ERROR_CATALOG.CORS_FORBIDDEN.code;
    message = err.message;
  }
  // 8. Error genérico
  else {
    statusCode = err.status || err.statusCode || 500;
    if (err.code && /^CC-[0-9A-Z]{4}$/.test(err.code)) {
      code = err.code;
    }
    message = err.message || 'Error interno del servidor';
    if (process.env.NODE_ENV === 'development') {
      details = err.stack;
    }
  }

  // Registrar en consola los errores 500
  if (statusCode >= 500) {
    console.error(`[ERROR CRÍTICO ${code}]`, err);
  }

  return res.status(statusCode).json({
    status: 'error',
    data: null,
    meta: null,
    error: {
      code,
      message,
      details: details || null
    }
  });
};

export default errorHandler;
