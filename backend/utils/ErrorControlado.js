import { DomainError } from './DomainError.js';

/**
 * Adaptador de compatibilidad para ErrorControlado
 * Ahora extiende DomainError con soporte del código CC-XXXX
 */
export class ErrorControlado extends DomainError {
  constructor(mensaje, codigo = 400, detalles = null, codigoError = 'CC-0005') {
    super(codigoError, mensaje, detalles, codigo);
    this.status = codigo;
  }
}

export default ErrorControlado;