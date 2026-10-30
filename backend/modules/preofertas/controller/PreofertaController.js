import BaseController from '../../baseController.js';
import PreofertaRepository from '../repository/PreofertaRepository.js';
import PreofertaService from '../services/PreofertaService.js';

class PreofertaController extends BaseController {
  constructor(service = new PreofertaService(new PreofertaRepository())) {
    super(service);
  }

  cambiarEstado = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const { estado } = req.body;
      return await this.service.cambiarEstado(id, estado);
    });
}

export default PreofertaController;
