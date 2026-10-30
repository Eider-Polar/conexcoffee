import BaseRepository from '../../baseRepository.js';
import EvaluacionFisica from '../EvaluacionFisica.js';

class EvaluacionFisicaRepository extends BaseRepository {
  constructor() {
    super(EvaluacionFisica);
  }

  async findByPreofertaId(preofertaId) {
    return await this.model.findAll({
      where: { preoferta_id: preofertaId }
    });
  }
}

export default EvaluacionFisicaRepository;
