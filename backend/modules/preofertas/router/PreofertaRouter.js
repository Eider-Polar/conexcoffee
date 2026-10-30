import { Router } from 'express';
import PreofertaController from '../controller/PreofertaController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new PreofertaController();

// Rutas de consulta
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Gestión de preofertas
router.post('/', checkAuth, controller.create);
router.put('/:id', checkAuth, controller.update);
router.patch('/:id/estado', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA', 'ASISTENTE_TECNICO'), controller.cambiarEstado);
router.delete('/:id', checkAuth, controller.delete);

export default router;
