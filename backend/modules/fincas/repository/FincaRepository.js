import BaseRepository from '../../baseRepository.js';
import Finca from '../Finca.js';

class FincaRepository extends BaseRepository {
  constructor() {
    super(Finca);
  }

  async findByCaficultorId(caficultorId) {
    return await this.model.findAll({
      where: { caficultor_id: caficultorId }
    });
  }
}

export default FincaRepository;
