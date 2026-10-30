import { Router } from 'express';
import EvaluacionFisicaController from '../controller/EvaluacionFisicaController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new EvaluacionFisicaController();

router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.getById);
router.get('/preoferta/:preofertaId', checkAuth, controller.getByPreoferta);

router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'LABORATORIO', 'EMPRESA_EXPORTADORA'), controller.create);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'LABORATORIO', 'EMPRESA_EXPORTADORA'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
