import BaseRepository from '../../baseRepository.js';
import LoteCultivo from '../LoteCultivo.js';

class LoteCultivoRepository extends BaseRepository {
  constructor() {
    super(LoteCultivo);
  }

  async findByFincaId(fincaId) {
    return await this.model.findAll({
      where: { finca_id: fincaId }
    });
  }
}

export default LoteCultivoRepository;
