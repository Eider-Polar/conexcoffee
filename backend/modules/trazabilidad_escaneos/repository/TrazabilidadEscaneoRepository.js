import BaseRepository from '../../baseRepository.js';
import TrazabilidadEscaneo from '../TrazabilidadEscaneo.js';
import { sequelize } from '../../../config/database.js';

class TrazabilidadEscaneoRepository extends BaseRepository {
  constructor() {
    super(TrazabilidadEscaneo);
  }

  async consultarVistaPublica(tokenQrExterno) {
    const [results] = await sequelize.query(
      'SELECT * FROM logistica.vista_trazabilidad_publica WHERE token_qr_externo = :token LIMIT 1',
      {
        replacements: { token: tokenQrExterno }
      }
    );
    return results?.[0] || null;
  }

  async consultarVistaTecnica(tokenQrExterno) {
    const [results] = await sequelize.query(
      'SELECT * FROM logistica.vista_trazabilidad_tecnica WHERE token_qr_externo = :token LIMIT 1',
      {
        replacements: { token: tokenQrExterno }
      }
    );
    return results?.[0] || null;
  }

  async findSacoByTokenQrExterno(tokenQrExterno) {
    const [results] = await sequelize.query(
      `SELECT s.id 
       FROM logistica.sacos_cafe s
       JOIN logistica.inventario_precintos_qr p ON s.precinto_id = p.id
       WHERE p.token_qr_externo = :token LIMIT 1`,
      {
        replacements: { token: tokenQrExterno }
      }
    );
    return results?.[0]?.id || null;
  }
}

export default TrazabilidadEscaneoRepository;
