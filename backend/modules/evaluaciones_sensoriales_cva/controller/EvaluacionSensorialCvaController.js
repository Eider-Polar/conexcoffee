import BaseController from '../../baseController.js';
import EvaluacionSensorialCvaRepository from '../repository/EvaluacionSensorialCvaRepository.js';
import EvaluacionSensorialCvaService from '../services/EvaluacionSensorialCvaService.js';

class EvaluacionSensorialCvaController extends BaseController {
  constructor(service = new EvaluacionSensorialCvaService(new EvaluacionSensorialCvaRepository())) {
    super(service);
  }

  exportarCva = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      return await this.service.exportarCva(id);
    });
}

export default EvaluacionSensorialCvaController;
