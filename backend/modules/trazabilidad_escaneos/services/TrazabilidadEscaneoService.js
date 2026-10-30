import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';

class TrazabilidadEscaneoService extends BaseService {
  /**
   * @param {import('../repository/TrazabilidadEscaneoRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Escaneo de Trazabilidad QR');
  }

  /**
   * Consulta pública de trazabilidad por consumidor final (sin login)
   */
  async obtenerTrazabilidadPublica(tokenQrExterno, metaInfo = {}) {
    const data = await this.repository.consultarVistaPublica(tokenQrExterno);
    if (!data) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'Código QR de café no encontrado o no registrado',
        `Token: ${tokenQrExterno}`,
        404
      );
    }

    // Registrar el escaneo anónimo en la bitácora inmutable
    const sacoId = await this.repository.findSacoByTokenQrExterno(tokenQrExterno);
    if (sacoId) {
      await this.repository.create({
        saco_id: sacoId,
        tipo_qr: 'QR_EXTERNO',
        usuario_id: null,
        rol_detectado: 'PUBLICO_EXTERNO',
        direccion_ip: metaInfo.ip || null,
        agente_usuario: metaInfo.userAgent || null,
        latitud: metaInfo.latitud || null,
        longitud: metaInfo.longitud || null,
        es_escaneo_valido: true,
        observaciones: 'Escaneo público anónimo desde cafetería / consumidor'
      });
    }

    return data;
  }

  /**
   * Consulta técnica detallada por empresa exportadora, catador o comprador autenticado
   */
  async obtenerTrazabilidadTecnica(tokenQrExterno, usuario, metaInfo = {}) {
    const data = await this.repository.consultarVistaTecnica(tokenQrExterno);
    if (!data) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'Ficha técnica de trazabilidad no disponible para este lote',
        `Token: ${tokenQrExterno}`,
        404
      );
    }

    // Registrar el escaneo técnico autenticado
    const sacoId = await this.repository.findSacoByTokenQrExterno(tokenQrExterno);
    if (sacoId) {
      await this.repository.create({
        saco_id: sacoId,
        tipo_qr: 'QR_EXTERNO',
        usuario_id: usuario.id,
        rol_detectado: usuario.rol_principal,
        direccion_ip: metaInfo.ip || null,
        agente_usuario: metaInfo.userAgent || null,
        latitud: metaInfo.latitud || null,
        longitud: metaInfo.longitud || null,
        es_escaneo_valido: true,
        observaciones: `Escaneo técnico por actor autorizado: ${usuario.rol_principal}`
      });
    }

    return data;
  }
}

export default TrazabilidadEscaneoService;
