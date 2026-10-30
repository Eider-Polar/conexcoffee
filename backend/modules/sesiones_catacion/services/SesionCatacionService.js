import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';

class SesionCatacionService extends BaseService {
  /**
   * @param {import('../repository/SesionCatacionRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Sesión de Catación Sensorial');
  }

  async create(data, options = {}) {
    if (!data.codigo_sesion) {
      throw new DomainError(
        ERROR_CATALOG.VALIDATION_ERROR.code,
        'El código de la sesión de catación es obligatorio',
        'Campo requerido: codigo_sesion (ej. EVAL-P01)',
        400
      );
    }

    if (!data.evaluacion_fisica_id) {
      throw new DomainError(
        ERROR_CATALOG.VALIDATION_ERROR.code,
        'La evaluación física asociada es obligatoria para abrir una sesión de catación',
        'Campo requerido: evaluacion_fisica_id',
        400
      );
    }

    const existing = await this.repository.findByCodigo(data.codigo_sesion);
    if (existing) {
      throw new DomainError(
        ERROR_CATALOG.DUPLICATE_ENTRY.code,
        'Ya existe una sesión de catación con este código',
        `Código de sesión: ${data.codigo_sesion}`,
        409
      );
    }

    return await super.create(data, options);
  }

  async getWithDetails(id) {
    const sesion = await this.repository.findWithDetails(id);
    if (!sesion) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'No se encontró la sesión de catación solicitada',
        `Sesión ID: ${id}`,
        404
      );
    }
    return sesion;
  }
}

export default SesionCatacionService;
