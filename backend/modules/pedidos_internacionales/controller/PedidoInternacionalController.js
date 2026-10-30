import BaseController from '../../baseController.js';
import PedidoInternacionalRepository from '../repository/PedidoInternacionalRepository.js';
import PedidoInternacionalService from '../services/PedidoInternacionalService.js';

class PedidoInternacionalController extends BaseController {
  constructor(service = new PedidoInternacionalService(new PedidoInternacionalRepository())) {
    super(service);
  }

  cambiarEstado = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const { estado } = req.body;
      return await this.service.cambiarEstado(id, estado);
    });

  getByComprador = (req, res) =>
    this.execute(res, async () => {
      const { compradorId } = req.params;
      return await this.service.getByComprador(compradorId);
    });
}

export default PedidoInternacionalController;
