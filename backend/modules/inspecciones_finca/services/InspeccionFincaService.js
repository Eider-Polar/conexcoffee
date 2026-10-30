import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';

class InspeccionFincaService extends BaseService {
  /**
   * @param {import('../repository/InspeccionFincaRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Inspección Técnica en Finca');
  }

  async create(data, options = {}) {
    const humedad = parseFloat(data.humedad_pergamino_porcentaje);

    // Validación técnica: El pergamino debe tener entre 10% y 12% para ser conforme
    if (data.resultado_inspeccion === 'CONFORME' && (humedad < 10.0 || humedad > 12.0)) {
      throw new DomainError(
        ERROR_CATALOG.HUMIDITY_OUT_OF_RANGE.code,
        ERROR_CATALOG.HUMIDITY_OUT_OF_RANGE.message,
        `Humedad registrada: ${humedad}%. El rango óptimo exigido para café especial es 10.0% a 12.0%. Acondicionar secado antes de autorizar.`,
        422
      );
    }

    return await super.create(data, options);
  }

  async getByPreoferta(preofertaId) {
    return await this.repository.findByPreofertaId(preofertaId);
  }
}

export default InspeccionFincaService;
