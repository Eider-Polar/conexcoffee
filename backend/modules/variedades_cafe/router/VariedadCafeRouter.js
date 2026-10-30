import { Router } from 'express';
import VariedadCafeController from '../controller/VariedadCafeController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new VariedadCafeController();

// Catálogo botánico público
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Modificaciones solo por administradores
router.post('/', checkAuth, checkRoles('ADMINISTRADOR'), controller.create);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
