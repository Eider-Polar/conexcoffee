import BaseController from '../../baseController.js';
import LoteCultivoRepository from '../repository/LoteCultivoRepository.js';
import LoteCultivoService from '../services/LoteCultivoService.js';

class LoteCultivoController extends BaseController {
  constructor(service = new LoteCultivoService(new LoteCultivoRepository())) {
    super(service);
  }

  getByFinca = (req, res) =>
    this.execute(res, async () => {
      const { fincaId } = req.params;
      return await this.service.getLotesByFinca(fincaId);
    });
}

export default LoteCultivoController;
