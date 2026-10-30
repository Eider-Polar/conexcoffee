import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';

class EvaluacionSensorialCvaService extends BaseService {
  /**
   * @param {import('../repository/EvaluacionSensorialCvaRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Evaluación Sensorial SCA CVA');
  }

  async create(data, options = {}) {
    const scaScore = data.puntuacion_sca_global ? parseFloat(data.puntuacion_sca_global) : null;

    // Regla de negocio ConexCoffee: Solo cafés con SCA >= 80 son café especial para exportación
    if (data.aprobado_para_exportacion === true && scaScore !== null && scaScore < 80.00) {
      throw new DomainError(
        ERROR_CATALOG.SCA_SCORE_INSUFFICIENT.code,
        ERROR_CATALOG.SCA_SCORE_INSUFFICIENT.message,
        `Puntaje registrado: ${scaScore}. El estándar ConexCoffee requiere mínimo 80.00 puntos para aprobación de exportación.`,
        422
      );
    }

    return await super.create(data, options);
  }

  async exportarCva(evaluacionId) {
    await this.getById(evaluacionId); // Valida que exista
    const cvaJson = await this.repository.exportarCvaJson(evaluacionId);
    if (!cvaJson) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'No se pudieron compilar las fases CVA para esta evaluación',
        `Evaluación ID: ${evaluacionId}`,
        404
      );
    }
    return cvaJson;
  }
}

export default EvaluacionSensorialCvaService;
