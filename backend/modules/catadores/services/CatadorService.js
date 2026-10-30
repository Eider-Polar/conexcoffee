import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';
import { ensureUsuarioSistema } from '../../../utils/ensureUsuarioSistema.js';

class CatadorService extends BaseService {
  /**
   * @param {import('../repository/CatadorRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Catador Q-Grader');
  }

  normalizePayload(data = {}, isCreate = false) {
    const nombres =
      data.nombres ||
      [data.primer_nombre || data.primerNombre, data.segundo_nombre || data.segundoNombre]
        .filter(Boolean)
        .join(' ')
        .trim();
    const apellidos =
      data.apellidos ||
      [data.primer_apellido || data.primerApellido, data.segundo_apellido || data.segundoApellido]
        .filter(Boolean)
        .join(' ')
        .trim();
    const numero_documento =
      data.numero_documento ||
      data.identificacion ||
      data.numero_identificacion ||
      data.numeroIdentificacion ||
      (isCreate ? `CC-${Date.now()}` : undefined);
    const codigo_certificado_q_grader =
      data.codigo_certificado_q_grader ||
      data.certificadoQ ||
      data.certificacion ||
      (isCreate ? `Q-GRADER-${Date.now()}` : undefined);
    const fecha_vencimiento_q_grader =
      data.fecha_vencimiento_q_grader || (isCreate ? '2028-12-31' : undefined);
    const telefono_movil = data.telefono_movil || data.telefono || undefined;

    const normalized = { ...data };
    if (nombres) normalized.nombres = nombres;
    if (apellidos) normalized.apellidos = apellidos;
    if (numero_documento) normalized.numero_documento = String(numero_documento);
    if (codigo_certificado_q_grader) normalized.codigo_certificado_q_grader = codigo_certificado_q_grader;
    if (fecha_vencimiento_q_grader) normalized.fecha_vencimiento_q_grader = fecha_vencimiento_q_grader;
    if (telefono_movil) normalized.telefono_movil = String(telefono_movil);
    delete normalized.id;
    return normalized;
  }

  async create(data, options = {}) {
    const usuario_id = await ensureUsuarioSistema(data, 'CATADOR');
    const payload = this.normalizePayload({ ...data, usuario_id }, true);
    const existing = await this.repository.findByCertificadoQGrader(payload.codigo_certificado_q_grader);
    if (existing) {
      throw new DomainError(
        ERROR_CATALOG.DUPLICATE_RESOURCE?.code || 'CC-0006',
        'El certificado Q-Grader ya se encuentra registrado en el sistema',
        `Código de Certificado: ${payload.codigo_certificado_q_grader}`,
        409
      );
    }
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalizePayload(data, false);
    return await super.update(id, payload, options);
  }

  async getByUsuarioId(usuarioId) {
    const catador = await this.repository.findByUsuarioId(usuarioId);
    if (!catador) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'No se encontró el perfil de catador para el usuario especificado',
        `Usuario ID: ${usuarioId}`,
        404
      );
    }
    return catador;
  }
}

export default CatadorService;
