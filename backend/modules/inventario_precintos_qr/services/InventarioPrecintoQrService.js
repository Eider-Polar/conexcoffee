import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';

class InventarioPrecintoQrService extends BaseService {
  /**
   * @param {import('../repository/InventarioPrecintoQrRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Precinto con Doble QR');
  }

  /**
   * Asignar lote de precintos a la custodia de un Asistente Técnico
   */
  async entregarATecnico(precintoId, asistenteTecnicoId) {
    const precinto = await this.getById(precintoId);

    if (precinto.estado === 'VINCULADO_A_SACO') {
      throw new DomainError(
        ERROR_CATALOG.QR_DUPLICATE_OR_CLAIMED.code,
        'No se puede reasignar un precinto que ya fue vinculado físicamente a un saco',
        `Serial: ${precinto.codigo_suncho_precinto}`,
        400
      );
    }

    return await precinto.update({
      asistente_tecnico_id: asistenteTecnicoId,
      estado: 'EN_CUSTODIA_TECNICO',
      fecha_entrega_tecnico: new Date()
    });
  }
}

export default InventarioPrecintoQrService;
