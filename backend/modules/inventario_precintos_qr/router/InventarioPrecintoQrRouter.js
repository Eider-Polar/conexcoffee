import { Router } from 'express';
import InventarioPrecintoQrController from '../controller/InventarioPrecintoQrController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new InventarioPrecintoQrController();

router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.getById);

router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.create);
router.patch('/:id/entrega-tecnico', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.entregarATecnico);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
