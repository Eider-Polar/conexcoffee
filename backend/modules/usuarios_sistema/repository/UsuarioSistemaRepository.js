import BaseRepository from '../../baseRepository.js';
import UsuarioSistema from '../UsuarioSistema.js';

class UsuarioSistemaRepository extends BaseRepository {
  constructor() {
    super(UsuarioSistema);
  }

  async findByEmail(email) {
    return await this.model.findOne({
      where: { correo_electronico: email.toLowerCase().trim() }
    });
  }
}

export default UsuarioSistemaRepository;
