import { Router } from 'express';
import FincaController from '../controller/FincaController.js';
import checkAuth from '../../../middleware/checkAuth.js';

const router = Router();
const controller = new FincaController();

// Rutas públicas / informativas de trazabilidad
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/caficultor/:caficultorId', controller.getByCaficultor);

// Rutas de administración y edición de finca
router.post('/', checkAuth, controller.create);
router.put('/:id', checkAuth, controller.update);
router.delete('/:id', checkAuth, controller.delete);

export default router;
