import BaseController from '../../baseController.js';
import SesionCatacionRepository from '../repository/SesionCatacionRepository.js';
import SesionCatacionService from '../services/SesionCatacionService.js';

class SesionCatacionController extends BaseController {
  constructor(service = new SesionCatacionService(new SesionCatacionRepository())) {
    super(service);
  }

  getWithDetails = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      return await this.service.getWithDetails(id);
    });

  getByCodigo = (req, res) =>
    this.execute(res, async () => {
      const { codigo } = req.params;
      const sesion = await this.service.repository.findByCodigo(codigo);
      if (!sesion) {
        return null;
      }
      return sesion;
    });
}

export default SesionCatacionController;
