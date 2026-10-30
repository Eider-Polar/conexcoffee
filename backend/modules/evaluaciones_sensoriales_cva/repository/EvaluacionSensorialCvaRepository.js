import BaseRepository from '../../baseRepository.js';
import EvaluacionSensorialCva from '../EvaluacionSensorialCva.js';
import { sequelize } from '../../../config/database.js';

class EvaluacionSensorialCvaRepository extends BaseRepository {
  constructor() {
    super(EvaluacionSensorialCva);
  }

  async findByPreofertaId(preofertaId) {
    return await this.model.findAll({
      where: { preoferta_id: preofertaId }
    });
  }

  /**
   * Invoca la función almacenada PostgreSQL fn_exportar_evaluacion_cva_json
   * para obtener la evaluación completa CVA con las 8 fases en formato JSON.
   */
  async exportarCvaJson(evaluacionId) {
    const [results] = await sequelize.query(
      'SELECT calidad.fn_exportar_evaluacion_cva_json(:id) AS cva_json',
      {
        replacements: { id: evaluacionId }
      }
    );

    return results?.[0]?.cva_json || null;
  }
}

export default EvaluacionSensorialCvaRepository;
