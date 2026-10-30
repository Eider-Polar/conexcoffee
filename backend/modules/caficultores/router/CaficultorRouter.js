import { Router } from 'express';
import CaficultorController from '../controller/CaficultorController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new CaficultorController();

// Rutas autenticadas
router.get('/mi-perfil', checkAuth, controller.getByUsuarioId);
router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.getById);
router.post('/', checkAuth, controller.create);
router.put('/:id', checkAuth, controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

// Endpoint especializado para actualización de verificación (Empresas aliadas y Admin)
router.patch('/:id/verificacion', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA'), controller.updateEstadoVerificacion);

export default router;
