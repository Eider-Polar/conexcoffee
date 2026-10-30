import { Router } from 'express';
import CatadorController from '../controller/CatadorController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new CatadorController();

router.get('/', checkAuth, controller.getAll);
router.get('/mi-perfil', checkAuth, controller.getMiPerfil);
router.get('/usuario/:usuarioId', checkAuth, controller.getByUsuarioId);
router.get('/:id', checkAuth, controller.getById);

router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'LABORATORIO'), controller.create);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'CATADOR', 'LABORATORIO'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
