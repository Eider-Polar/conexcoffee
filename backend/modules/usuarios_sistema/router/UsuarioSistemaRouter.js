import { Router } from 'express';
import UsuarioSistemaController from '../controller/UsuarioSistemaController.js';
import { sensitiveLimiter } from '../../../middleware/rateLimiter.js';
import checkAuth from '../../../middleware/checkAuth.js';
import checkRoles from '../../../middleware/checkRoles.js';

const router = Router();
const controller = new UsuarioSistemaController();

// Rutas públicas con Rate Limiting Sensible
router.post('/login', sensitiveLimiter, controller.login);
router.post('/register', sensitiveLimiter, controller.register);
router.post('/registro', sensitiveLimiter, controller.register);
router.post('/logout', controller.logout);

// Rutas protegidas para el usuario autenticado
router.get('/perfil', checkAuth, controller.getProfile);
router.get('/me', checkAuth, controller.getProfile);
router.put('/cambiar-password', checkAuth, controller.changePassword);

// Rutas de administración (Solo Administrador)
router.get('/', checkAuth, checkRoles('ADMINISTRADOR'), controller.getAll);
router.post('/', checkAuth, checkRoles('ADMINISTRADOR'), controller.create);
router.post('/admin', checkAuth, checkRoles('ADMINISTRADOR'), controller.create);
router.get('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.getById);
router.put('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.update);
router.patch('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.update);
router.delete('/:id', checkAuth, checkRoles('ADMINISTRADOR'), controller.delete);

export default router;
