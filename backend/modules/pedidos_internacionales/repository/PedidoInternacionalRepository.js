import BaseRepository from '../../baseRepository.js';
import PedidoInternacional from '../PedidoInternacional.js';

class PedidoInternacionalRepository extends BaseRepository {
  constructor() {
    super(PedidoInternacional);
  }

  async findByCodigo(codigo) {
    return await this.model.findOne({
      where: { codigo_pedido: codigo }
    });
  }

  async findByCompradorId(compradorId) {
    return await this.model.findAll({
      where: { comprador_id: compradorId }
    });
  }

  async findByContenedorId(contenedorId) {
    return await this.model.findAll({
      where: { contenedor_id: contenedorId }
    });
  }
}

export default PedidoInternacionalRepository;
