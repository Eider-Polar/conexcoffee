import BaseRepository from '../../baseRepository.js';
import InventarioPrecintoQr from '../InventarioPrecintoQr.js';

class InventarioPrecintoQrRepository extends BaseRepository {
  constructor() {
    super(InventarioPrecintoQr);
  }

  async findByCodigoSuncho(codigoSuncho) {
    return await this.model.findOne({
      where: { codigo_suncho_precinto: codigoSuncho }
    });
  }

  async findByTokenQrExterno(tokenQrExterno) {
    return await this.model.findOne({
      where: { token_qr_externo: tokenQrExterno }
    });
  }

  async findByAsistenteTecnico(asistenteTecnicoId) {
    return await this.model.findAll({
      where: { asistente_tecnico_id: asistenteTecnicoId }
    });
  }
}

export default InventarioPrecintoQrRepository;
