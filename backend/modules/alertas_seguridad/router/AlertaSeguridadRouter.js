import { Router } from 'express';
import AlertaSeguridadController from '../controller/AlertaSeguridadController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new AlertaSeguridadController();

router.get('/', checkAuth, checkRoles('ADMINISTRADOR'), controller.getAll);
router.get('/pendientes', checkAuth, checkRoles('ADMINISTRADOR'), controller.getPendientes);
router.get('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.getById);

router.post('/', checkAuth, checkRoles('ADMINISTRADOR'), controller.create);
router.patch('/:id/resolver', checkAuth, checkRoles('ADMINISTRADOR'), controller.resolverAlerta);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
