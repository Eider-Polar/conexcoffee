import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';
import { ensureUsuarioSistema } from '../../../utils/ensureUsuarioSistema.js';

class CaficultorService extends BaseService {
  /**
   * @param {import('../repository/CaficultorRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Caficultor');
  }

  normalizePayload(data = {}, isCreate = false) {
    const nombres =
      data.nombres ||
      [data.primerNombre || data.primer_nombre, data.segundoNombre || data.segundo_nombre]
        .filter(Boolean)
        .join(' ')
        .trim();
    const apellidos =
      data.apellidos ||
      [data.primerApellido || data.primer_apellido, data.segundoApellido || data.segundo_apellido]
        .filter(Boolean)
        .join(' ')
        .trim();
    const numero_documento =
      data.numero_documento ||
      data.numeroIdentificacion ||
      data.numero_identificacion ||
      (isCreate ? `CC-${Date.now()}` : undefined);
    const telefono_movil =
      data.telefono_movil || data.telefono || (isCreate ? '3000000000' : undefined);
    const departamento = data.departamento || (isCreate ? 'Cauca' : undefined);
    const municipio = data.municipio || (isCreate ? 'Popayán' : undefined);
    const tipo_documento = data.tipo_documento || (isCreate ? 'CC' : undefined);
    const observaciones_verificacion =
      data.observaciones_verificacion ?? data.empresa ?? data.historia ?? undefined;

    const normalized = { ...data };
    if (nombres) normalized.nombres = nombres;
    if (apellidos) normalized.apellidos = apellidos;
    if (numero_documento) normalized.numero_documento = String(numero_documento);
    if (telefono_movil) normalized.telefono_movil = String(telefono_movil);
    if (departamento) normalized.departamento = departamento;
    if (municipio) normalized.municipio = municipio;
    if (tipo_documento) normalized.tipo_documento = tipo_documento;
    if (observaciones_verificacion !== undefined) {
      normalized.observaciones_verificacion = observaciones_verificacion;
    }
    delete normalized.id;
    return normalized;
  }

  async create(data, options = {}) {
    const usuario_id = await ensureUsuarioSistema(data, 'CAFICULTOR');
    const payload = this.normalizePayload({ ...data, usuario_id }, true);
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalizePayload(data, false);
    return await super.update(id, payload, options);
  }

  async getByUsuarioId(usuarioId) {
    const caficultor = await this.repository.findByUsuarioId(usuarioId);
    if (!caficultor) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        'Perfil de caficultor no encontrado para este usuario',
        `Usuario ID: ${usuarioId}`,
        404
      );
    }
    return caficultor;
  }

  async updateEstadoVerificacion(id, estadoVerificacion, observaciones = null) {
    const validos = ['PENDIENTE_DOCUMENTOS', 'EN_REVISION', 'APROBADO', 'RECHAZADO'];
    if (!validos.includes(estadoVerificacion)) {
      throw new DomainError(
        ERROR_CATALOG.VALIDATION_ERROR.code,
        `Estado de verificación inválido. Debe ser uno de: ${validos.join(', ')}`,
        null,
        422
      );
    }

    return await this.update(id, {
      estado_verificacion: estadoVerificacion,
      observaciones_verificacion: observaciones
    });
  }
}

export default CaficultorService;
