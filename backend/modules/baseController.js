import { DomainError } from '../utils/DomainError.js';
import { ERROR_CATALOG } from '../utils/errorCatalog.js';

/**
 * BaseController - ConexCoffee
 * Controlador base POO que unifica los estándares de diseño REST,
 * respuestas uniformes y control de errores bajo nomenclatura CC-XXXX.
 */
class BaseController {
  /**
   * @param {import('./baseService.js').default} [service]
   */
  constructor(service = null) {
    this.service = service;
  }

  /**
   * Formato Uniforme de Respuesta Exitosa:
   * {
   *   "status": "success",
   *   "data": { ... },
   *   "meta": { "page": 1, "limit": 20, "totalRecords": 100 },
   *   "error": null
   * }
   */
  sendSuccess(res, data, meta = null, statusCode = 200) {
    return res.status(statusCode).json({
      status: 'success',
      data,
      meta,
      error: null
    });
  }

  /**
   * Estructura Uniforme de Errores y Códigos de Dominio:
   * {
   *   "status": "error",
   *   "data": null,
   *   "meta": null,
   *   "error": {
   *     "code": "CC-0E15",
   *     "message": "...",
   *     "details": "..."
   *   }
   * }
   */
  sendError(res, error, defaultStatusCode = 500) {
    let statusCode = defaultStatusCode;
    let code = ERROR_CATALOG.INTERNAL_ERROR.code;
    let message = 'Error interno del servidor';
    let details = null;

    if (error instanceof DomainError) {
      statusCode = error.statusCode || 400;
      code = error.code || 'CC-0000';
      message = error.message;
      details = error.details;
    } else if (error.original && typeof error.original.message === 'string' && /CC-[0-9A-Z]{4}/.test(error.original.message)) {
      statusCode = 400;
      const match = error.original.message.match(/(CC-[0-9A-Z]{4}):\s*(.*)/);
      if (match) {
        code = match[1];
        message = match[2];
        details = error.original.detail || null;
      } else {
        code = 'CC-0005';
        message = error.original.message;
      }
    } else if (error.name === 'SequelizeValidationError') {
      statusCode = 422;
      code = ERROR_CATALOG.VALIDATION_ERROR.code;
      message = 'Error de validación en los campos proporcionados';
      details = error.errors ? error.errors.map(e => ({ field: e.path, message: e.message })) : error.message;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 409;
      code = ERROR_CATALOG.DUPLICATE_RESOURCE.code;
      message = 'El registro ya existe o viola una restricción única';
      details = error.errors ? error.errors.map(e => ({ field: e.path, value: e.value })) : error.message;
    } else {
      statusCode = error.status || error.statusCode || defaultStatusCode;
      code = error.code || ERROR_CATALOG.INTERNAL_ERROR.code;
      message = error.message || 'Error interno del servidor';
      if (process.env.NODE_ENV === 'development') {
        details = error.stack;
      }
    }

    if (statusCode >= 500) {
      console.error(`[CONTROLADOR ERROR ${code}]`, error);
    }

    return res.status(statusCode).json({
      status: 'error',
      data: null,
      meta: null,
      error: {
        code,
        message,
        details
      }
    });
  }

  /**
   * Ejecutor seguro de acciones de controlador
   * Desempaqueta automáticamente data y meta si provienen de BaseService
   */
  async execute(res, action, successStatusCode = 200) {
    try {
      const result = await action();
      if (result && typeof result === 'object' && 'data' in result && 'meta' in result) {
        return this.sendSuccess(res, result.data, result.meta, successStatusCode);
      }
      return this.sendSuccess(res, result, null, successStatusCode);
    } catch (error) {
      return this.sendError(res, error);
    }
  }

  /**
   * Endpoint estándar: Listar con paginación
   */
  getAll = (req, res) =>
    this.execute(res, async () => {
      return await this.service.getAll(req.query);
    });

  /**
   * Endpoint estándar: Obtener por ID
   */
  getById = (req, res) =>
    this.execute(res, async () => {
      return await this.service.getById(req.params.id);
    });

  /**
   * Endpoint estándar: Crear registro
   */
  create = (req, res) =>
    this.execute(res, async () => {
      return await this.service.create(req.body);
    }, 201);

  /**
   * Endpoint estándar: Actualizar registro
   */
  update = (req, res) =>
    this.execute(res, async () => {
      return await this.service.update(req.params.id, req.body);
    });

  /**
   * Endpoint estándar: Eliminar registro
   */
  delete = (req, res) =>
    this.execute(res, async () => {
      return await this.service.delete(req.params.id);
    });
}

export default BaseController;