import BaseRepository from '../../baseRepository.js';
import Caficultor from '../Caficultor.js';

class CaficultorRepository extends BaseRepository {
  constructor() {
    super(Caficultor);
  }

  async findByUsuarioId(usuarioId) {
    return await this.model.findOne({
      where: { usuario_id: usuarioId }
    });
  }

  async findByNumeroDocumento(numeroDocumento) {
    return await this.model.findOne({
      where: { numero_documento: numeroDocumento }
    });
  }
}

export default CaficultorRepository;
