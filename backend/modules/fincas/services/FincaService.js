import BaseService from '../../baseService.js';
import { sequelize } from '../../../config/database.js';

const IS_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class FincaService extends BaseService {
  /**
   * @param {import('../repository/FincaRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Finca Cafetera');
  }

  async resolveCaficultorId(data = {}) {
    if (data.caficultor_id && IS_UUID.test(data.caficultor_id)) return data.caficultor_id;
    if (data.caficultor) {
      const [byName] = await sequelize.query(
        `SELECT id FROM personas.caficultores WHERE (nombres || ' ' || apellidos) ILIKE :q LIMIT 1`,
        { replacements: { q: `%${data.caficultor}%` } }
      );
      if (byName?.[0]?.id) return byName[0].id;
    }
    const [first] = await sequelize.query(`SELECT id FROM personas.caficultores LIMIT 1`);
    return first?.[0]?.id || null;
  }

  normalize(data = {}, isCreate = false) {
    const nombre_finca = data.nombre_finca || data.nombre || (isCreate ? 'Finca Cafetera' : undefined);
    const departamento = data.departamento || (isCreate ? 'Cauca' : undefined);
    const municipio = data.municipio || (isCreate ? 'Popayán' : undefined);
    const vereda = data.vereda || (isCreate ? 'Vereda Central' : undefined);
    const rawAltitud = data.altitud_msnm ?? data.altura;
    const altitud_msnm =
      rawAltitud !== undefined
        ? Math.min(2800, Math.max(800, parseInt(rawAltitud, 10) || 1750))
        : isCreate
          ? 1750
          : undefined;
    const rawArea = data.area_total_hectareas ?? data.areaTotal ?? data.areaCafe;
    const area_total_hectareas =
      rawArea !== undefined ? parseFloat(rawArea) || 3.5 : isCreate ? 3.5 : undefined;
    const rawConservacion = data.area_protegida_hectareas ?? data.areaConservacion;
    const area_protegida_hectareas =
      rawConservacion !== undefined ? parseFloat(rawConservacion) || 0 : undefined;

    const validManejos = ['ORGANICO', 'CONVENCIONAL', 'EN_TRANSICION'];
    const tipo_manejo = validManejos.includes(data.tipo_manejo)
      ? data.tipo_manejo
      : isCreate
        ? 'CONVENCIONAL'
        : undefined;
    const historia_familiar = data.historia_familiar ?? data.asociacion ?? undefined;

    const payload = { ...data };
    if (nombre_finca) payload.nombre_finca = nombre_finca;
    if (departamento) payload.departamento = departamento;
    if (municipio) payload.municipio = municipio;
    if (vereda) payload.vereda = vereda;
    if (altitud_msnm !== undefined) payload.altitud_msnm = altitud_msnm;
    if (area_total_hectareas !== undefined) payload.area_total_hectareas = area_total_hectareas;
    if (area_protegida_hectareas !== undefined) payload.area_protegida_hectareas = area_protegida_hectareas;
    if (tipo_manejo) payload.tipo_manejo = tipo_manejo;
    if (historia_familiar !== undefined) payload.historia_familiar = historia_familiar;
    delete payload.id;
    return payload;
  }

  async create(data, options = {}) {
    const caficultor_id = await this.resolveCaficultorId(data);
    const payload = this.normalize({ ...data, caficultor_id }, true);
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    return await super.update(id, payload, options);
  }

  async getFincasByCaficultor(caficultorId) {
    return await this.repository.findByCaficultorId(caficultorId);
  }
}

export default FincaService;
