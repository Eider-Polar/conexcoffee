import { Router } from 'express';
import InspeccionFincaController from '../controller/InspeccionFincaController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new InspeccionFincaController();

router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.getById);
router.get('/preoferta/:preofertaId', checkAuth, controller.getByPreoferta);

// Crear inspección (Asistente Técnico, Exportadora o Admin)
router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA', 'ASISTENTE_TECNICO'), controller.create);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'EMPRESA_EXPORTADORA', 'ASISTENTE_TECNICO'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
