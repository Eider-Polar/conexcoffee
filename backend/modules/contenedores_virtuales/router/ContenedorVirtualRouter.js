import { Router } from 'express';
import ContenedorVirtualController from '../controller/ContenedorVirtualController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';
import { sensitiveLimiter } from '../../../middleware/rateLimiter.js';

const router = Router();
const controller = new ContenedorVirtualController();

// Rutas públicas y de consulta
router.get('/', controller.getAll);
router.get('/disponibles', controller.getDisponibles);
router.get('/:id', controller.getById);

// Gestión logística
router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.create);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.update);

// Operación crítica: Autorizar zarpe marítimo (Protegido con sensitiveLimiter y roles de exportación)
router.post('/:id/autorizar-zarpe', sensitiveLimiter, checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.autorizarZarpe);

router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
