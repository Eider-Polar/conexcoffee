import BaseRepository from '../../baseRepository.js';
import Catador from '../Catador.js';

class CatadorRepository extends BaseRepository {
  constructor() {
    super(Catador);
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

  async findByCertificadoQGrader(codigoCertificado) {
    return await this.model.findOne({
      where: { codigo_certificado_q_grader: codigoCertificado }
    });
  }
}

export default CatadorRepository;
