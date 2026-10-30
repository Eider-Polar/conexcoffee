import BaseController from '../../baseController.js';
import ContenedorVirtualRepository from '../repository/ContenedorVirtualRepository.js';
import ContenedorVirtualService from '../services/ContenedorVirtualService.js';

class ContenedorVirtualController extends BaseController {
  constructor(service = new ContenedorVirtualService(new ContenedorVirtualRepository())) {
    super(service);
  }

  autorizarZarpe = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const { numero_bl_maritimo } = req.body;
      return await this.service.autorizarZarpe(id, numero_bl_maritimo);
    });

  getDisponibles = (req, res) =>
    this.execute(res, async () => {
      return await this.service.getDisponibles();
    });
}

export default ContenedorVirtualController;
