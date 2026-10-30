import { Router } from "express";
import UsuarioController from "../controller/UsuarioController.js";
import UsuarioService from "../services/UsuarioService.js";
import UsuarioRepository from "../repository/UsuarioRepository.js";
import checkAuth from "../../../middleware/checkAuth.js";
import checkSuperAdmin from "../../../middleware/checkSuperAdmin.js";

const router = Router();

const usuarioRepo = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepo);
const usuarioController = new UsuarioController(usuarioService);

router.post("/register", checkSuperAdmin, usuarioController.registerUser);
router.post("/", checkSuperAdmin, usuarioController.createUser);
router.post("/login", usuarioController.authenticateUser);
router.get("/verify-email", usuarioController.verifyEmail);
router.post("/forgot-password", usuarioController.forgotPassword);
router.post("/reset-password", usuarioController.resetPassword);

router.get("/profile", checkAuth, usuarioController.getProfile);
router.get("/", usuarioController.getAllUsers);
router.get("/:id", usuarioController.getUserById);

router.put("/profile", checkAuth, usuarioController.updateProfile);
router.put("/webpush", checkAuth, usuarioController.updateWebPush);
router.post("/send-push", checkAuth, usuarioController.sendTestPush);
router.put("/:id", checkAuth, usuarioController.updateUser);

router.put("/:userId/change-password", checkAuth, usuarioController.changePassword);

router.delete("/:id", checkAuth, usuarioController.deleteUser);

export default router;
