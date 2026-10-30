import BaseRepository from '../../baseRepository.js';
import SacoCafe from '../SacoCafe.js';
import { sequelize } from '../../../config/database.js';

class SacoCafeRepository extends BaseRepository {
  constructor() {
    super(SacoCafe);
  }

  async findByPreofertaId(preofertaId) {
    return await this.model.findAll({
      where: { preoferta_id: preofertaId },
      order: [['numero_saco_consecutivo', 'ASC']]
    });
  }

  async findByPrecintoId(precintoId) {
    return await this.model.findOne({
      where: { precinto_id: precintoId }
    });
  }

  /**
   * Invoca la función PL/pgSQL logistica.verificar_y_quemar_qr_interno
   */
  async verificarYQuemarQrInterno(tokenQrInterno, usuarioId, direccionIp, latitud = null, longitud = null) {
    const [results] = await sequelize.query(
      `SELECT logistica.verificar_y_quemar_qr_interno(
        :tokenQrInterno::UUID,
        :usuarioId::UUID,
        :direccionIp::INET,
        :latitud::NUMERIC,
        :longitud::NUMERIC
      ) AS resultado`,
      {
        replacements: {
          tokenQrInterno,
          usuarioId: usuarioId || null,
          direccionIp: direccionIp || '127.0.0.1',
          latitud: latitud || null,
          longitud: longitud || null
        }
      }
    );

    return results?.[0]?.resultado;
  }
}

export default SacoCafeRepository;
