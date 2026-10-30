import { Router } from 'express';
import QrController from '../controller/QrController.js';

const router = Router();

// GET /api/qr/generate - Vista directa de SVG o JSON
router.get('/generate', (req, res, next) => QrController.generateGet(req, res, next));

// POST /api/qr/generate - Generación individual avanzada
router.post('/generate', (req, res, next) => QrController.generatePost(req, res, next));

// POST /api/qr/batch - Generación masiva (n códigos x empresa / contenedor / lote)
router.post('/batch', (req, res, next) => QrController.generateBatch(req, res, next));

export default router;
