import BaseController from '../../baseController.js';
import InventarioPrecintoQrRepository from '../repository/InventarioPrecintoQrRepository.js';
import InventarioPrecintoQrService from '../services/InventarioPrecintoQrService.js';

class InventarioPrecintoQrController extends BaseController {
  constructor(service = new InventarioPrecintoQrService(new InventarioPrecintoQrRepository())) {
    super(service);
  }

  entregarATecnico = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const { asistente_tecnico_id } = req.body;
      return await this.service.entregarATecnico(id, asistente_tecnico_id);
    });
}

export default InventarioPrecintoQrController;
