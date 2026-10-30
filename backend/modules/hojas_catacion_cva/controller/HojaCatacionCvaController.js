import BaseController from '../../baseController.js';
import HojaCatacionCvaRepository from '../repository/HojaCatacionCvaRepository.js';
import HojaCatacionCvaService from '../services/HojaCatacionCvaService.js';
import Catador from '../../catadores/Catador.js';

class HojaCatacionCvaController extends BaseController {
  constructor(service = new HojaCatacionCvaService(new HojaCatacionCvaRepository())) {
    super(service);
  }

  ingestarJson = (req, res) =>
    this.execute(res, async () => {
      let catadorId = req.body.catador_id;

      // Si no viene en el body, resolver automáticamente si el usuario autenticado es un catador
      if (!catadorId && req.user?.id) {
        const catadorPerfil = await Catador.findOne({ where: { usuario_id: req.user.id } });
        if (catadorPerfil) {
          catadorId = catadorPerfil.id;
        }
      }

      // El payload puede enviarse directamente como raíz o dentro de { payload: { ... } }
      const payload = req.body.payload || req.body;
      const evaluacionFisicaId = req.body.evaluacion_fisica_id || payload?.evaluacion?.evaluacion_fisica_id;
      const puntuacionCatador = req.body.puntuacion_catador !== undefined 
        ? req.body.puntuacion_catador 
        : payload?.evaluacion?.puntuacion_catador;

      return await this.service.ingestarDesdeJson({
        payload,
        catadorId,
        evaluacionFisicaId,
        puntuacionCatador
      });
    }, 201);

  exportarJson = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      return await this.service.exportarCva(id);
    });

  getBySesionId = (req, res) =>
    this.execute(res, async () => {
      const { sesionId } = req.params;
      return await this.service.getBySesionId(sesionId);
    });

  getWithAllPhases = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      return await this.service.getWithAllPhases(id);
    });
}

export default HojaCatacionCvaController;
