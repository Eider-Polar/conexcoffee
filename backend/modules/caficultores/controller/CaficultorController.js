import BaseController from '../../baseController.js';
import CaficultorRepository from '../repository/CaficultorRepository.js';
import CaficultorService from '../services/CaficultorService.js';

class CaficultorController extends BaseController {
  constructor(service = new CaficultorService(new CaficultorRepository())) {
    super(service);
  }

  getByUsuarioId = (req, res) =>
    this.execute(res, async () => {
      const usuarioId = req.params.usuarioId || req.user.id;
      return await this.service.getByUsuarioId(usuarioId);
    });

  updateEstadoVerificacion = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const { estado_verificacion, observaciones_verificacion } = req.body;
      return await this.service.updateEstadoVerificacion(id, estado_verificacion, observaciones_verificacion);
    });
}

export default CaficultorController;
