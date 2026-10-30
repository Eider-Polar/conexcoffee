import { Router } from 'express';
import LoteCultivoController from '../controller/LoteCultivoController.js';
import checkAuth from '../../../middleware/checkAuth.js';

const router = Router();
const controller = new LoteCultivoController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/finca/:fincaId', controller.getByFinca);
router.post('/', checkAuth, controller.create);
router.put('/:id', checkAuth, controller.update);
router.delete('/:id', checkAuth, controller.delete);

export default router;
