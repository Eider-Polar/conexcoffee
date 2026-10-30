import BaseRepository from '../../baseRepository.js';
import Preoferta from '../Preoferta.js';

class PreofertaRepository extends BaseRepository {
  constructor() {
    super(Preoferta);
  }

  async findByCodigo(codigo) {
    return await this.model.findOne({
      where: { codigo_preoferta: codigo }
    });
  }

  async findByCaficultorId(caficultorId) {
    return await this.model.findAll({
      where: { caficultor_id: caficultorId }
    });
  }
}

export default PreofertaRepository;
