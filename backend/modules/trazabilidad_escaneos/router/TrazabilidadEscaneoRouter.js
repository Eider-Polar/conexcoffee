import { Router } from 'express';
import TrazabilidadEscaneoController from '../controller/TrazabilidadEscaneoController.js';
import checkAuth from '../../../middleware/checkAuth.js';
import { sensitiveLimiter } from '../../../middleware/rateLimiter.js';

const router = Router();
const controller = new TrazabilidadEscaneoController();

// Escaneo público de código QR para el consumidor final en taza / cafetería
router.get('/publico/:tokenQrExterno', controller.obtenerTrazabilidadPublica);

// Escaneo técnico protegido para laboratorio, exportadora o comprador
router.get('/tecnico/:tokenQrExterno', sensitiveLimiter, checkAuth, controller.obtenerTrazabilidadTecnica);

// Bitácora de escaneos general
router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.getById);

export default router;
