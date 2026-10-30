import UsuarioService from '../services/UsuarioService.js';
import BaseController from "../../baseController.js";

class UsuarioController extends BaseController {
  constructor(usuarioService) {
    super();
    this.usuarioService = usuarioService;
  }

  createUser = (req, res) =>
    this.execute(res, async () => {
      const { nombre_completo, correo, password, telefono, tipo_usuario, estado, tenantId } = req.body;
      const isSelfRegistration = req.path.includes('register');
      return await this.usuarioService.createUser(
        { nombre_completo, correo, password, telefono, tipo_usuario, estado, tenantId },
        isSelfRegistration
      );
    });

  registerUser = (req, res) =>
    this.execute(res, async () => {
      const { nombre_completo, correo, password, telefono } = req.body;
      return await this.usuarioService.createUser(
        { nombre_completo, correo, password, telefono },
        true
      );
    });

  getUserById = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      return await this.usuarioService.getUserById(parseInt(id));
    });

  getAllUsers = (req, res) =>
    this.execute(res, async () => {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      return await this.usuarioService.getAllUsers(limit, offset);
    });

  updateUser = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const requestingUserId = req.isSuperAdmin ? null : req.user?.id;
      const { nombre_completo, correo, password, telefono, tipo_usuario, estado } = req.body;
      return await this.usuarioService.updateUser(
        parseInt(id),
        { nombre_completo, correo, password, telefono, tipo_usuario, estado },
        requestingUserId
      );
    });

  deleteUser = (req, res) =>
    this.execute(res, async () => {
      const { id } = req.params;
      const requestingUserId = req.isSuperAdmin ? null : req.user?.id;
      return await this.usuarioService.deleteUser(parseInt(id), requestingUserId);
    });

  authenticateUser = (req, res) =>
    this.execute(res, async () => {
      const { correo, password, tipo_negocio, tenant_id, slug_subdominio } = req.body;
      const headerTipoNegocio = req.headers['x-tipo-negocio'];
      const headerTenantId = req.headers['x-tenant-id'];
      const headerSlug = req.headers['x-tenant-slug'];

      return await this.usuarioService.authenticateUser(correo, password, {
        tipo_negocio: tipo_negocio || headerTipoNegocio,
        tenant_id: tenant_id || headerTenantId,
        slug_subdominio: slug_subdominio || headerSlug
      });
    });

  changePassword = (req, res) =>
    this.execute(res, async () => {
      const { userId } = req.params;
      const { currentPassword, newPassword } = req.body;
      return await this.usuarioService.changePassword(
        parseInt(userId),
        currentPassword,
        newPassword
      );
    });

  getProfile = (req, res) =>
    this.execute(res, async () => {
      const userId = req.user?.id;
      return await this.usuarioService.getUserById(userId);
    });

  updateProfile = (req, res) =>
    this.execute(res, async () => {
      const userId = req.user?.id;
      const { nombre_completo, correo, password, telefono } = req.body;
      return await this.usuarioService.updateUser(
        userId,
        { nombre_completo, correo, password, telefono },
        userId
      );
    });

  updateWebPush = (req, res) =>
    this.execute(res, async () => {
      const userId = req.user?.id || req.body.userId;
      const { subscription } = req.body;
      return await this.usuarioService.updateWebPushSubscription(parseInt(userId), subscription);
    });

  sendTestPush = (req, res) =>
    this.execute(res, async () => {
      const userId = req.user?.id || req.body.userId;
      const { title, body } = req.body;
      return await this.usuarioService.sendTestPushNotification(parseInt(userId), title, body);
    });

  verifyEmail = (req, res) =>
    this.execute(res, async () => {
      const { token } = req.query;
      return await this.usuarioService.verifyEmail(token);
    });

  forgotPassword = (req, res) =>
    this.execute(res, async () => {
      const { correo } = req.body;
      return await this.usuarioService.requestPasswordReset(correo);
    });

  resetPassword = (req, res) =>
    this.execute(res, async () => {
      const { token, password } = req.body;
      return await this.usuarioService.resetPassword(token, password);
    });
}

export default UsuarioController;
