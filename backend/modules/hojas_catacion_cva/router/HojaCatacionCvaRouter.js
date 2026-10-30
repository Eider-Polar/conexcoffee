import { Router } from 'express';
import HojaCatacionCvaController from '../controller/HojaCatacionCvaController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';
import { sensitiveLimiter } from '../../../middleware/rateLimiter.js';

const router = Router();
const controller = new HojaCatacionCvaController();

router.get('/', checkAuth, controller.getAll);
router.get('/sesion/:sesionId', checkAuth, controller.getBySesionId);
router.get('/:id', checkAuth, controller.getById);
router.get('/:id/fases', checkAuth, controller.getWithAllPhases);

// Endpoint especializado para exportar el JSON compilado exacto de las fases CVA
router.get('/:id/exportar-json', checkAuth, controller.exportarJson);

// Ingesta transaccional ACID desde JSON del frontend del catador
router.post(
  '/ingestar-json',
  sensitiveLimiter,
  checkAuth,
  checkRoles('ADMINISTRADOR', 'CATADOR', 'LABORATORIO'),
  controller.ingestarJson
);

router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'CATADOR', 'LABORATORIO'), controller.create);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'CATADOR'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
