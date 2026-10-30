/**
 * ConexCoffee - Clase de Excepción de Dominio
 * Implementa la nomenclatura de errores institucionales CC-XXXX y códigos HTTP asociados.
 */
export class DomainError extends Error {
  /**
   * @param {string} code - Código institucional (ej: CC-0001, CC-0E15, CC-0F30)
   * @param {string} message - Descripción amigable del error para el usuario
   * @param {any} [details=null] - Información técnica o contextual complementaria
   * @param {number} [statusCode=400] - Código HTTP correspondiente
   */
  constructor(code = 'CC-0000', message = 'Error de dominio no especificado', details = null, statusCode = 400) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default DomainError;
