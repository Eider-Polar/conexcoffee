import BaseRepository from '../../baseRepository.js';
import ContenedorVirtual from '../ContenedorVirtual.js';

class ContenedorVirtualRepository extends BaseRepository {
  constructor() {
    super(ContenedorVirtual);
  }

  async findByCodigo(codigo) {
    return await this.model.findOne({
      where: { codigo_contenedor: codigo }
    });
  }

  async findDisponibles() {
    return await this.model.findAll({
      where: { estado: 'ABIERTO_RECOLECCION' }
    });
  }
}

export default ContenedorVirtualRepository;
