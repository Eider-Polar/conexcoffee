import { Router } from 'express';
import PedidoInternacionalController from '../controller/PedidoInternacionalController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';
import { sensitiveLimiter } from '../../../middleware/rateLimiter.js';

const router = Router();
const controller = new PedidoInternacionalController();

router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.getById);
router.get('/comprador/:compradorId', checkAuth, controller.getByComprador);

// Creación de pedidos por compradores internacionales (con limitador sensible)
router.post('/', sensitiveLimiter, checkAuth, checkRoles('ADMINISTRADOR', 'COMPRADOR_INTERNACIONAL', 'BROKER'), controller.create);
router.patch('/:id/estado', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.cambiarEstado);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
