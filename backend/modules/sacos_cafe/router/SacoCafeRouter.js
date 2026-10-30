import { Router } from 'express';
import SacoCafeController from '../controller/SacoCafeController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';
import { sensitiveLimiter } from '../../../middleware/rateLimiter.js';

const router = Router();
const controller = new SacoCafeController();

router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.getById);
router.get('/preoferta/:preofertaId', checkAuth, controller.getByPreoferta);

// Vinculación física de saco en finca (Asistente Técnico)
router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA', 'ASISTENTE_TECNICO'), controller.create);

// Operación crítica: Quema de QR interno en destino (Protegido con sensitiveLimiter y checkAuth)
router.post('/canjear-qr-interno', sensitiveLimiter, checkAuth, controller.canjearQrInterno);

router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
