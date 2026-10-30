import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';

class SacoCafeService extends BaseService {
  /**
   * @param {import('../repository/SacoCafeRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Saco de Café Sellado');
  }

  async getSacosByPreoferta(preofertaId) {
    return await this.repository.findByPreofertaId(preofertaId);
  }

  /**
   * Quemar QR interno en destino comercial (un solo uso, antifraude)
   */
  async canjearQrInterno(tokenQrInterno, usuarioId, direccionIp, latitud, longitud) {
    const resultado = await this.repository.verificarYQuemarQrInterno(
      tokenQrInterno,
      usuarioId,
      direccionIp,
      latitud,
      longitud
    );

    if (!resultado || resultado.valido === false) {
      throw new DomainError(
        resultado?.codigo_error || ERROR_CATALOG.QR_DUPLICATE_OR_CLAIMED.code,
        resultado?.mensaje || 'Error al canjear el código QR interno',
        'Verificación de seguridad en cadena de custodia fallida',
        400
      );
    }

    return resultado;
  }
}

export default SacoCafeService;
