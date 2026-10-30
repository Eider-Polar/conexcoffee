import BaseController from '../../baseController.js';
import EvaluacionFisicaRepository from '../repository/EvaluacionFisicaRepository.js';
import EvaluacionFisicaService from '../services/EvaluacionFisicaService.js';

class EvaluacionFisicaController extends BaseController {
  constructor(service = new EvaluacionFisicaService(new EvaluacionFisicaRepository())) {
    super(service);
  }

  getByPreoferta = (req, res) =>
    this.execute(res, async () => {
      const { preofertaId } = req.params;
      return await this.service.getByPreoferta(preofertaId);
    });
}

export default EvaluacionFisicaController;
