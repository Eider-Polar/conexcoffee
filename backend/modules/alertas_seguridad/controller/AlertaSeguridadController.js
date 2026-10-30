import BaseController from '../../baseController.js';
import AlertaSeguridadRepository from '../repository/AlertaSeguridadRepository.js';
import AlertaSeguridadService from '../services/AlertaSeguridadService.js';

class AlertaSeguridadController extends BaseController {
  constructor(service = new AlertaSeguridadService(new AlertaSeguridadRepository())) {
    super(service);
  }

  resolverAlerta = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const { resolucion_nota } = req.body;
      return await this.service.resolverAlerta(id, resolucion_nota);
    });

  getPendientes = (req, res) =>
    this.execute(res, async () => {
      return await this.service.getPendientes();
    });
}

export default AlertaSeguridadController;
