import BaseService from '../../baseService.js';
import { sequelize } from '../../../config/database.js';

const IS_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const MAP_PROCESO = {
  LAVADO: 'LAVADO',
  NATURAL: 'NATURAL',
  HONEY: 'HONEY',
  ANAEROBICO: 'ANAEROBICO',
  'ANAERÓBICO': 'ANAEROBICO',
  DOBLE_FERMENTACION: 'DOBLE_FERMENTACION',
  'DOBLE FERMENTACIÓN': 'DOBLE_FERMENTACION',
};

const MAP_SECADO = {
  SOL_MARQUESINA: 'SOL_MARQUESINA',
  'SECADO AL SOL': 'SOL_MARQUESINA',
  SOL_PATIO: 'SOL_PATIO',
  SILO_MECANICO: 'SILO_MECANICO',
  'SECADO MECÁNICO': 'SILO_MECANICO',
  CAMA_AFRICANA: 'CAMA_AFRICANA',
  'CAMAS AFRICANAS': 'CAMA_AFRICANA',
};

const MAP_ESTADO = {
  OFERTA_DIRECTA_ASIGNADA: 'OFERTA_DIRECTA_ASIGNADA',
  EN_INSPECCION_CAMPO: 'EN_INSPECCION_CAMPO',
  PENDIENTE_EVALUACION_LAB: 'PENDIENTE_EVALUACION_LAB',
  OFERTA_LIBRE: 'OFERTA_LIBRE',
  EN_NEGOCIACION: 'EN_NEGOCIACION',
  CONTRATADA: 'CONTRATADA',
  RECHAZADA_CALIDAD: 'RECHAZADA_CALIDAD',
  EXPIRADA: 'EXPIRADA',
  CANCELADA: 'CANCELADA',
  Pendiente: 'OFERTA_DIRECTA_ASIGNADA',
  'En Evaluación': 'PENDIENTE_EVALUACION_LAB',
  Asignada: 'EN_INSPECCION_CAMPO',
  Aprobada: 'CONTRATADA',
  Aceptada: 'CONTRATADA',
  Publicada: 'CONTRATADA',
  Rechazada: 'RECHAZADA_CALIDAD',
  Disponible: 'OFERTA_LIBRE',
  Reservada: 'EN_NEGOCIACION',
};

class PreofertaService extends BaseService {
  /**
   * @param {import('../repository/PreofertaRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Preoferta de Cosecha');
  }

  async resolveIds(data = {}) {
    let finca_id = data.finca_id && IS_UUID.test(String(data.finca_id)) ? data.finca_id : null;
    let caficultor_id =
      data.caficultor_id && IS_UUID.test(String(data.caficultor_id)) ? data.caficultor_id : null;

    if (!finca_id && data.loteId && IS_UUID.test(String(data.loteId))) {
      const [loteRows] = await sequelize.query(
        `SELECT finca_id FROM agronomia.lotes_cultivo WHERE id = :id LIMIT 1`,
        { replacements: { id: data.loteId } }
      );
      if (loteRows?.[0]?.finca_id) finca_id = loteRows[0].finca_id;
    }

    if (!finca_id) {
      const [fRows] = await sequelize.query(`SELECT id, caficultor_id FROM agronomia.fincas LIMIT 1`);
      if (fRows?.[0]) {
        finca_id = fRows[0].id;
        if (!caficultor_id) caficultor_id = fRows[0].caficultor_id;
      }
    }

    if (!caficultor_id && finca_id) {
      const [fRows] = await sequelize.query(
        `SELECT caficultor_id FROM agronomia.fincas WHERE id = :id LIMIT 1`,
        { replacements: { id: finca_id } }
      );
      if (fRows?.[0]?.caficultor_id) caficultor_id = fRows[0].caficultor_id;
    }

    if (!caficultor_id) {
      const [cRows] = await sequelize.query(`SELECT id FROM personas.caficultores LIMIT 1`);
      if (cRows?.[0]?.id) caficultor_id = cRows[0].id;
    }

    let variedad_id = data.variedad_id && !isNaN(Number(data.variedad_id)) ? Number(data.variedad_id) : null;
    if (!variedad_id && data.variedad) {
      const [vRows] = await sequelize.query(
        `SELECT id FROM agronomia.variedades_cafe WHERE nombre ILIKE :q LIMIT 1`,
        { replacements: { q: `%${data.variedad}%` } }
      );
      if (vRows?.[0]?.id) variedad_id = vRows[0].id;
    }
    if (!variedad_id) {
      const [vRows] = await sequelize.query(`SELECT id FROM agronomia.variedades_cafe LIMIT 1`);
      variedad_id = vRows?.[0]?.id || 1;
    }

    return { finca_id, caficultor_id, variedad_id };
  }

  normalize(data = {}, isCreate = false) {
    const rawProceso = String(
      data.proceso || data.procesoCosecha || data.proceso_postcosecha || ''
    )
      .toUpperCase()
      .trim();
    const proceso =
      MAP_PROCESO[rawProceso] ||
      (rawProceso.includes('NATURAL')
        ? 'NATURAL'
        : rawProceso.includes('HONEY')
          ? 'HONEY'
          : rawProceso.includes('ANAER')
            ? 'ANAEROBICO'
            : rawProceso.includes('DOBLE')
              ? 'DOBLE_FERMENTACION'
              : isCreate
                ? 'LAVADO'
                : undefined);

    const rawSecado = String(data.secado || data.tipoSecado || '').toUpperCase().trim();
    const secado =
      MAP_SECADO[rawSecado] ||
      (rawSecado.includes('CAMA')
        ? 'CAMA_AFRICANA'
        : rawSecado.includes('PATIO')
          ? 'SOL_PATIO'
          : rawSecado.includes('SILO') || rawSecado.includes('MECAN')
            ? 'SILO_MECANICO'
            : isCreate
              ? 'SOL_MARQUESINA'
              : undefined);

    const estado = data.estado ? MAP_ESTADO[data.estado] || 'OFERTA_DIRECTA_ASIGNADA' : undefined;
    const rawKg = data.cantidad_kg ?? data.cantidadKg ?? data.cantidad;
    const cantidad_kg = rawKg !== undefined ? parseFloat(rawKg) || 500 : isCreate ? 500 : undefined;
    const rawPrecio = data.precio_esperado_cop ?? data.precioEstimadoCop ?? data.precio_estimado_cop;
    const precio_esperado_cop =
      rawPrecio !== undefined ? parseFloat(rawPrecio) || 2500000 : isCreate ? 2500000 : undefined;
    const today = new Date().toISOString().slice(0, 10);
    const fecha_recoleccion =
      data.fecha_recoleccion || data.fechaProduccion || data.fecha_produccion || (isCreate ? today : undefined);
    const fecha_almacenamiento_pos_secado =
      data.fecha_almacenamiento_pos_secado ||
      data.fechaProduccion ||
      data.fecha_produccion ||
      (isCreate ? today : undefined);

    const payload = { ...data };
    if (proceso) payload.proceso = proceso;
    if (secado) payload.secado = secado;
    if (estado) payload.estado = estado;
    if (cantidad_kg !== undefined) {
      payload.cantidad_kg = cantidad_kg;
      payload.cantidad_cargas = parseFloat((cantidad_kg / 125).toFixed(2));
    }
    if (precio_esperado_cop !== undefined) payload.precio_esperado_cop = precio_esperado_cop;
    if (fecha_recoleccion) payload.fecha_recoleccion = fecha_recoleccion;
    if (fecha_almacenamiento_pos_secado) {
      payload.fecha_almacenamiento_pos_secado = fecha_almacenamiento_pos_secado;
    }
    delete payload.id;
    return payload;
  }

  /**
   * Crear preoferta con cálculo automático de kilos/cargas y código consecutivo
   */
  async create(data, options = {}) {
    const year = new Date().getFullYear();
    const count = await this.repository.count();
    const codigo_preoferta =
      data.codigo_preoferta ||
      data.codigo ||
      `PRE-${year}-${String(count + 1 + Math.floor(Math.random() * 900)).padStart(4, '0')}`;

    const ids = await this.resolveIds(data);
    const payload = this.normalize({ ...data, ...ids, codigo_preoferta }, true);

    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    return await super.update(id, payload, options);
  }

  async cambiarEstado(id, nuevoEstado) {
    const preoferta = await this.getById(id);
    const mapped = MAP_ESTADO[nuevoEstado] || nuevoEstado;
    return await preoferta.update({ estado: mapped });
  }
}

export default PreofertaService;
