import BaseRepository from '../../baseRepository.js';
import CatalogoError from '../CatalogoError.js';

class CatalogoErrorRepository extends BaseRepository {
  constructor() {
    super(CatalogoError);
  }

  async findByCodigo(codigo) {
    return await this.model.findByPk(codigo);
  }
}

export default CatalogoErrorRepository;
