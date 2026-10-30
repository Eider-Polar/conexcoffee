import BaseController from '../../baseController.js';
import SacoCafeRepository from '../repository/SacoCafeRepository.js';
import SacoCafeService from '../services/SacoCafeService.js';

class SacoCafeController extends BaseController {
  constructor(service = new SacoCafeService(new SacoCafeRepository())) {
    super(service);
  }

  getByPreoferta = (req, res) =>
    this.execute(res, async () => {
      const { preofertaId } = req.params;
      return await this.service.getSacosByPreoferta(preofertaId);
    });

  canjearQrInterno = (req, res) =>
    this.execute(res, async () => {
      const { token_qr_interno, latitud, longitud } = req.body;
      const usuarioId = req.user?.id || null;
      const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

      return await this.service.canjearQrInterno(
        token_qr_interno,
        usuarioId,
        clientIp,
        latitud,
        longitud
      );
    });
}

export default SacoCafeController;
