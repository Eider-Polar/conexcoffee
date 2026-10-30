import BaseService from '../../baseService.js';
import { DomainError } from '../../../utils/DomainError.js';
import { ERROR_CATALOG } from '../../../utils/errorCatalog.js';
import { sequelize } from '../../../config/database.js';

const IS_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class EvaluacionFisicaService extends BaseService {
  /**
   * @param {import('../repository/EvaluacionFisicaRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Evaluación Física de Laboratorio');
  }

  async resolveReferences(data = {}) {
    let laboratorio_id =
      data.laboratorio_id && IS_UUID.test(String(data.laboratorio_id)) ? data.laboratorio_id : null;
    if (!laboratorio_id && data.laboratorio) {
      const [lRows] = await sequelize.query(
        `SELECT id FROM personas.laboratorios WHERE nombre_laboratorio ILIKE :q LIMIT 1`,
        { replacements: { q: `%${data.laboratorio}%` } }
      );
      if (lRows?.[0]?.id) laboratorio_id = lRows[0].id;
    }
    if (!laboratorio_id) {
      const [lRows] = await sequelize.query(`SELECT id FROM personas.laboratorios LIMIT 1`);
      laboratorio_id = lRows?.[0]?.id || null;
    }

    let preoferta_id =
      data.preoferta_id && IS_UUID.test(String(data.preoferta_id)) ? data.preoferta_id : null;
    const preCode = data.codigoPreoferta || data.lote_origen || data.codigoLote;
    if (!preoferta_id && preCode) {
      const [pRows] = await sequelize.query(
        `SELECT id FROM cosechas.preofertas WHERE codigo_preoferta ILIKE :q LIMIT 1`,
        { replacements: { q: `%${preCode}%` } }
      );
      if (pRows?.[0]?.id) preoferta_id = pRows[0].id;
    }
    if (!preoferta_id) {
      const [pRows] = await sequelize.query(`SELECT id FROM cosechas.preofertas LIMIT 1`);
      preoferta_id = pRows?.[0]?.id || null;
    }

    return { laboratorio_id, preoferta_id };
  }

  normalize(data = {}, isCreate = false) {
    const parseNum = (val, fallback) => {
      if (val === undefined || val === null || val === '') return fallback;
      const cleaned = parseFloat(String(val).replace(/[^0-9.]/g, ''));
      return isNaN(cleaned) ? fallback : cleaned;
    };

    const codigo_analisis =
      data.codigo_analisis || data.codigo || (isCreate ? `ANALISIS-FIS-${Date.now()}` : undefined);
    const etapa = data.etapa || (isCreate ? 'FASE_1_FINCA_MUESTRA' : undefined);
    const analista_nombre =
      data.analista_nombre ||
      data.responsable ||
      data.catadorAsignado ||
      data.laboratorio ||
      (isCreate ? 'Analista de Laboratorio' : undefined);
    const fecha_analisis = data.fecha_analisis || data.fecha || data.fechaRegistro || (isCreate ? new Date() : undefined);
    const peso_muestra_analizada_gramos = parseNum(
      data.peso_muestra_analizada_gramos ?? data.peso ?? data.peso_g ?? data.pesoMuestra,
      isCreate ? 350 : undefined
    );
    const humedad_porcentaje = parseNum(
      data.humedad_porcentaje ?? data.humedad,
      isCreate ? 11.0 : undefined
    );
    const densidad_g_l = parseNum(data.densidad_g_l ?? data.densidad, isCreate ? 705 : undefined);
    const actividad_agua_aw = parseNum(data.actividad_agua_aw ?? data.aw, isCreate ? 0.62 : undefined);
    const factor_rendimiento = parseNum(
      data.factor_rendimiento ?? data.factorRendimiento,
      isCreate ? 89.0 : undefined
    );
    const defectos_primer_grupo =
      data.defectos_primer_grupo ?? data.defectosPrimerGrupo ?? (isCreate ? 0 : undefined);
    const defectos_segundo_grupo =
      data.defectos_segundo_grupo ?? data.defectosSegundoGrupo ?? (isCreate ? 2 : undefined);
    const es_conforme =
      data.es_conforme !== undefined
        ? Boolean(data.es_conforme)
        : data.estado === 'Aprobada' || data.estado === 'Completado' || isCreate
          ? true
          : undefined;

    const payload = { ...data };
    if (codigo_analisis) payload.codigo_analisis = codigo_analisis;
    if (etapa) payload.etapa = etapa;
    if (analista_nombre) payload.analista_nombre = analista_nombre;
    if (fecha_analisis) payload.fecha_analisis = fecha_analisis;
    if (peso_muestra_analizada_gramos !== undefined) {
      payload.peso_muestra_analizada_gramos = peso_muestra_analizada_gramos;
    }
    if (humedad_porcentaje !== undefined) payload.humedad_porcentaje = humedad_porcentaje;
    if (densidad_g_l !== undefined) payload.densidad_g_l = densidad_g_l;
    if (actividad_agua_aw !== undefined) payload.actividad_agua_aw = actividad_agua_aw;
    if (factor_rendimiento !== undefined) payload.factor_rendimiento = factor_rendimiento;
    if (defectos_primer_grupo !== undefined) payload.defectos_primer_grupo = Number(defectos_primer_grupo) || 0;
    if (defectos_segundo_grupo !== undefined) payload.defectos_segundo_grupo = Number(defectos_segundo_grupo) || 0;
    if (es_conforme !== undefined) payload.es_conforme = es_conforme;
    delete payload.id;
    return payload;
  }

  async create(data, options = {}) {
    const refs = await this.resolveReferences(data);
    const payload = this.normalize({ ...data, ...refs }, true);
    const humedad = parseFloat(payload.humedad_porcentaje);

    if (payload.etapa === 'FASE_2_TRILLADORA_DESTINO' && humedad > 12.5) {
      throw new DomainError(
        ERROR_CATALOG.TRILLA_CRITICAL_DEFECT.code,
        'Detección de defecto crítico de sobrehumedad (> 12.5%) en Evaluación 2 de Trilladora',
        `Humedad detectada: ${humedad}%. Lote marcado como NO_CONFORME_TRILLA. Disparar Protocolo de Sustitución.`,
        422
      );
    }

    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    if (data.laboratorio) {
      const refs = await this.resolveReferences(data);
      if (refs.laboratorio_id) payload.laboratorio_id = refs.laboratorio_id;
    }
    return await super.update(id, payload, options);
  }

  async getByPreoferta(preofertaId) {
    return await this.repository.findByPreofertaId(preofertaId);
  }
}

export default EvaluacionFisicaService;
