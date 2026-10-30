import BaseController from '../../baseController.js';
import CatadorRepository from '../repository/CatadorRepository.js';
import CatadorService from '../services/CatadorService.js';

class CatadorController extends BaseController {
  constructor(service = new CatadorService(new CatadorRepository())) {
    super(service);
  }

  getByUsuarioId = (req, res) =>
    this.execute(res, async () => {
      const { usuarioId } = req.params;
      return await this.service.getByUsuarioId(usuarioId);
    });

  getMiPerfil = (req, res) =>
    this.execute(res, async () => {
      return await this.service.getByUsuarioId(req.user.id);
    });
}

export default CatadorController;
