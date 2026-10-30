import { Router } from 'express';
import CatalogoErrorController from '../controller/CatalogoErrorController.js';

const router = Router();
const controller = new CatalogoErrorController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
