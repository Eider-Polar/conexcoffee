import BaseController from '../../baseController.js';
import FincaRepository from '../repository/FincaRepository.js';
import FincaService from '../services/FincaService.js';

class FincaController extends BaseController {
  constructor(service = new FincaService(new FincaRepository())) {
    super(service);
  }

  getByCaficultor = (req, res) =>
    this.execute(res, async () => {
      const { caficultorId } = req.params;
      return await this.service.getFincasByCaficultor(caficultorId);
    });
}

export default FincaController;
