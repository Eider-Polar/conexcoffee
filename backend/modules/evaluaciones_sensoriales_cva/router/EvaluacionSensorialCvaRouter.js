import { Router } from 'express';
import SesionCatacionController from '../../sesiones_catacion/controller/SesionCatacionController.js';
import HojaCatacionCvaController from '../../hojas_catacion_cva/controller/HojaCatacionCvaController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const sesionController = new SesionCatacionController();
const hojaController = new HojaCatacionCvaController();

// Compatibilidad hacia atrás: /api/evaluaciones-sensoriales-cva redirige a la nueva arquitectura relacional
router.get('/', checkAuth, sesionController.getAll);
router.get('/:id', checkAuth, sesionController.getById);
router.get('/:id/detalles', checkAuth, sesionController.getWithDetails);

// Exportación CVA
router.get('/:id/exportar-cva-json', checkAuth, hojaController.exportarJson);
router.get('/:id/exportar-json', checkAuth, hojaController.exportarJson);

router.post('/', checkAuth, checkRoles('ADMINISTRADOR', 'CATADOR', 'LABORATORIO', 'EMPRESA_EXPORTADORA'), sesionController.create);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR', 'CATADOR', 'LABORATORIO'), sesionController.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), sesionController.delete);

export default router;
