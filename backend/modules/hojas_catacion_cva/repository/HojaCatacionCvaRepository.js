import BaseRepository from '../../baseRepository.js';
import HojaCatacionCva from '../HojaCatacionCva.js';
import { sequelize } from '../../../config/database.js';

class HojaCatacionCvaRepository extends BaseRepository {
  constructor() {
    super(HojaCatacionCva);
  }

  async findBySesionId(sesionId) {
    return await this.model.findAll({
      where: { sesion_id: sesionId },
      include: [{ association: 'catador' }]
    });
  }

  async findByCatadorId(catadorId) {
    return await this.model.findAll({
      where: { catador_id: catadorId },
      include: [{ association: 'sesion' }]
    });
  }

  async findWithAllPhases(id) {
    return await this.model.findByPk(id, {
      include: [
        { association: 'sesion' },
        { association: 'catador' },
        { association: 'fase_1_descriptiva' },
        { association: 'fase_2_afectiva' },
        { association: 'fase_3_sabor_descriptiva' },
        { association: 'fase_4_sabor_afectiva' },
        { association: 'fase_5_acidez' },
        { association: 'fase_6_dulzor' },
        { association: 'fase_7_sensacion_boca' },
        { association: 'fase_8_impresion_global' },
        { association: 'defectos_uniformidad' }
      ]
    });
  }

  /**
   * Ejecuta la función almacenada calidad.fn_guardar_evaluacion_cva_desde_json
   * que procesa en una sola transacción ACID la sesión, la hoja y las 8 fases CVA + defectos,
   * y activa automáticamente el trigger trg_recalcular_promedio_sesion_cva.
   */
  async guardarDesdeJson({ payload, catadorId, evaluacionFisicaId = null, puntuacionCatador = null }) {
    const [results] = await sequelize.query(
      `SELECT calidad.fn_guardar_evaluacion_cva_desde_json(
        :payload::jsonb, 
        :catadorId::uuid, 
        :evaluacionFisicaId::uuid, 
        :puntuacionCatador::numeric
      ) AS hoja_id`,
      {
        replacements: {
          payload: typeof payload === 'string' ? payload : JSON.stringify(payload),
          catadorId,
          evaluacionFisicaId: evaluacionFisicaId || null,
          puntuacionCatador: puntuacionCatador !== null && puntuacionCatador !== undefined ? Number(puntuacionCatador) : null
        }
      }
    );

    return results?.[0]?.hoja_id || null;
  }

  /**
   * Invoca la función almacenada PostgreSQL calidad.fn_exportar_evaluacion_cva_json
   * para obtener el documento JSON anidado exacto con todas las 8 fases y metadatos de sesión.
   */
  async exportarCvaJson(hojaId) {
    const [results] = await sequelize.query(
      'SELECT calidad.fn_exportar_evaluacion_cva_json(:id::uuid) AS cva_json',
      {
        replacements: { id: hojaId }
      }
    );

    return results?.[0]?.cva_json || null;
  }
}

export default HojaCatacionCvaRepository;
