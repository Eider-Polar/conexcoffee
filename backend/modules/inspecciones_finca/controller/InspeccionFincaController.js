import BaseController from '../../baseController.js';
import InspeccionFincaRepository from '../repository/InspeccionFincaRepository.js';
import InspeccionFincaService from '../services/InspeccionFincaService.js';

class InspeccionFincaController extends BaseController {
  constructor(service = new InspeccionFincaService(new InspeccionFincaRepository())) {
    super(service);
  }

  getByPreoferta = (req, res) =>
    this.execute(res, async () => {
      const { preofertaId } = req.params;
      return await this.service.getByPreoferta(preofertaId);
    });
}

export default InspeccionFincaController;
