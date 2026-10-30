import BaseRepository from '../../baseRepository.js';
import InspeccionFinca from '../InspeccionFinca.js';

class InspeccionFincaRepository extends BaseRepository {
  constructor() {
    super(InspeccionFinca);
  }

  async findByPreofertaId(preofertaId) {
    return await this.model.findAll({
      where: { preoferta_id: preofertaId }
    });
  }
}

export default InspeccionFincaRepository;
