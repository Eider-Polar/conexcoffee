import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repository/UsuarioRepository.js';
import generarJWT from '../../../helpers/GenerarJWT.js';
import { ErrorControlado } from '../../../utils/ErrorControlado.js';
import { sendPushNotification } from '../../../helpers/WebPush.js';
import { EmailHelper } from '../../../helpers/EmailHelper.js';
import TenantUsuario from '../../tenant_usuarios/TenantUsuario.js';
import TenantCliente from '../../tenant_clientes/TenantCliente.js';

class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async createUser(userData, isSelfRegistration = false, options = {}) {
    const { nombre_completo, correo, password, telefono, tipo_usuario, estado, tenantId } = userData;

    if (!nombre_completo || !correo || !password) {
      throw new ErrorControlado("Faltan parámetros obligatorios (nombre_completo, correo, password)");
    }

    await this.validateUserCreationData(userData, isSelfRegistration);

    const hashedPassword = await this.hashPassword(password);

    const newUserData = {
      nombre_completo: nombre_completo.trim(),
      correo: correo.trim().toLowerCase(),
      password_hash: hashedPassword,
      telefono: telefono?.trim() || null,
      tipo_usuario: tipo_usuario || 'staff',
      estado: estado || 'pendiente'
    };

    const user = await this.usuarioRepository.create(newUserData, options);

    if (tenantId) {
      const parsedTenantId = parseInt(tenantId, 10);
      if (!isNaN(parsedTenantId)) {
        if (tipo_usuario === 'cliente_final') {
          await TenantCliente.create({
            fk_tenant: parsedTenantId,
            fk_usuario: user.id
          }, options);
        } else {
          await TenantUsuario.create({
            fk_tenant: parsedTenantId,
            fk_usuario: user.id,
            rol: 'admin'
          }, options);
        }
      }
    }

    let verificationToken = null;
    if (newUserData.estado === 'pendiente') {
      // Generar token JWT de verificación
      verificationToken = jwt.sign(
        { userId: user.id, purpose: 'email_verification' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      // Enviar correo de verificación de forma asíncrona sin bloquear la respuesta
      EmailHelper.sendVerificationEmail(user.correo, verificationToken, user.nombre_completo)
        .catch(err => console.error('Error al enviar correo de verificación:', err));
    }

    return {
      success: true,
      message: newUserData.estado === 'pendiente' 
        ? 'Usuario registrado exitosamente. Por favor verifica tu correo electrónico para activar tu cuenta.' 
        : 'Usuario creado exitosamente',
      data: this.usuarioRepository.sanitizeUser(user)
    };
  }

  async getUserById(id) {
    if (!id || isNaN(id)) {
      throw new ErrorControlado('ID de usuario inválido');
    }

    const user = await this.usuarioRepository.findById(id);

    if (!user) {
      throw new ErrorControlado('Usuario no encontrado');
    }

    return this.usuarioRepository.sanitizeUser(user);
  }

  async getAllUsers(limit = 50, offset = 0) {
    if (limit < 1 || limit > 100) {
      throw new ErrorControlado('El límite debe estar entre 1 y 100');
    }

    if (offset < 0) {
      throw new ErrorControlado('El offset no puede ser negativo');
    }

    const result = await this.usuarioRepository.findAll(limit, offset);

    return {
      success: true,
      data: result.rows.map(user => this.usuarioRepository.sanitizeUser(user)),
      pagination: {
        total: result.total,
        limit: result.limit,
        offset: result.offset,
        hasMore: result.offset + result.limit < result.total
      }
    };
  }

  async updateUser(id, userData, requestingUserId = null) {
    if (!id || isNaN(id)) {
      throw new ErrorControlado('ID de usuario inválido');
    }

    const existingUser = await this.usuarioRepository.findById(id);
    if (!existingUser) {
      throw new ErrorControlado('Usuario no encontrado');
    }

    if (requestingUserId && parseInt(requestingUserId) !== parseInt(id)) {
      throw new ErrorControlado('No tienes permiso para modificar este usuario', 403);
    }

    await this.validateUserUpdateData(userData, id);

    const updateData = {};

    if (userData.nombre_completo) {
      updateData.nombre_completo = userData.nombre_completo.trim();
    }

    if (userData.correo) {
      updateData.correo = userData.correo.trim().toLowerCase();
    }

    if (userData.password) {
      updateData.password_hash = await this.hashPassword(userData.password);
    }

    if (userData.telefono !== undefined) {
      updateData.telefono = userData.telefono ? userData.telefono.trim() : null;
    }

    if (userData.tipo_usuario && !requestingUserId) { // Solo si no es self-update
      updateData.tipo_usuario = userData.tipo_usuario;
    }

    if (userData.estado && !requestingUserId) {
      updateData.estado = userData.estado;
    }

    const updatedUser = await this.usuarioRepository.update(id, updateData);

    return {
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: this.usuarioRepository.sanitizeUser(updatedUser)
    };
  }

  async updateWebPushSubscription(id, subscriptionData) {
    if (!id || isNaN(id)) {
      throw new ErrorControlado('ID de usuario inválido');
    }

    const existingUser = await this.usuarioRepository.findById(id);
    if (!existingUser) {
      throw new ErrorControlado('Usuario no encontrado');
    }

    const { endpoint, keys } = subscriptionData || {};
    
    const updateData = {
      webpush_endpoint: endpoint || null,
      webpush_p256dh: keys?.p256dh || null,
      webpush_auth: keys?.auth || null
    };

    const updatedUser = await this.usuarioRepository.update(id, updateData);

    return {
      success: true,
      message: 'Suscripción WebPush actualizada exitosamente',
      data: this.usuarioRepository.sanitizeUser(updatedUser)
    };
  }

  async deleteUser(id, requestingUserId = null) {
    if (!id || isNaN(id)) {
      throw new ErrorControlado('ID de usuario inválido');
    }

    const existingUser = await this.usuarioRepository.findById(id);
    if (!existingUser) {
      throw new ErrorControlado('Usuario no encontrado');
    }

    if (requestingUserId && parseInt(requestingUserId) === parseInt(id)) {
      throw new ErrorControlado('No puedes eliminar tu propio usuario');
    }

    const deleted = await this.usuarioRepository.delete(id);

    if (!deleted) {
      throw new ErrorControlado('No se pudo eliminar el usuario');
    }

    return {
      success: true,
      message: 'Usuario eliminado exitosamente'
    };
  }

  async authenticateUser(correo, password, contextOptions = {}) {
    const { tipo_negocio, tenant_id, slug_subdominio } = contextOptions;

    if (!correo || !password) {
      throw new ErrorControlado('Correo y contraseña son requeridos');
    }

    const rawUser = await this.usuarioRepository.findUserRawWithTenantsByCorreo(correo);

    if (!rawUser) {
      throw new ErrorControlado('El usuario no existe', 404);
    }

    if (rawUser.estado !== 'activo') {
      throw new ErrorControlado('El usuario no está activo', 403);
    }

    const isPasswordValid = await bcrypt.compare(password, rawUser.password_hash);

    if (!isPasswordValid) {
      throw new ErrorControlado('Credenciales inválidas', 401);
    }

    const allUserTenants = [
      ...(rawUser.tenants_staff || []),
      ...(rawUser.tenants_cliente || [])
    ];

    if (allUserTenants.length > 0) {
      if (!tipo_negocio && !tenant_id && !slug_subdominio) {
        throw new ErrorControlado(
          'Es necesario especificar el tipo de negocio (tipo_negocio) o tenant para iniciar sesión en esta aplicación',
          400
        );
      }

      if (tipo_negocio) {
        const normalizedTarget = String(tipo_negocio).trim().toLowerCase();
        const matchesTipoNegocio = allUserTenants.some(tenant => {
          if (!tenant || tenant.estado !== 'activo') return false;
          const tn = tenant.tipo_negocio;
          if (!tn) return false;
          return (
            String(tn.id) === normalizedTarget ||
            (tn.codigo && String(tn.codigo).trim().toLowerCase() === normalizedTarget) ||
            (tn.identificador_sistema && String(tn.identificador_sistema).trim().toLowerCase() === normalizedTarget) ||
            (tn.nombre && String(tn.nombre).trim().toLowerCase() === normalizedTarget)
          );
        });

        if (!matchesTipoNegocio) {
          throw new ErrorControlado(
            'Acceso no permitido: El usuario no pertenece a un negocio registrado para este tipo de aplicación',
            403
          );
        }
      }

      if (tenant_id) {
        const matchesTenantId = allUserTenants.some(
          tenant => tenant && String(tenant.id) === String(tenant_id) && tenant.estado === 'activo'
        );
        if (!matchesTenantId) {
          throw new ErrorControlado('Acceso no permitido: El usuario no pertenece a este negocio', 403);
        }
      }

      if (slug_subdominio) {
        const normalizedSlug = String(slug_subdominio).trim().toLowerCase();
        const matchesSlug = allUserTenants.some(
          tenant => tenant && String(tenant.slug_subdominio).toLowerCase() === normalizedSlug && tenant.estado === 'activo'
        );
        if (!matchesSlug) {
          throw new ErrorControlado('Acceso no permitido: El usuario no pertenece al negocio del subdominio especificado', 403);
        }
      }
    }

    return {
      token: generarJWT(rawUser.id),
      usuario: this.usuarioRepository.sanitizeUser(rawUser),
      rol: rawUser.tipo_usuario
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    if (!userId || !currentPassword || !newPassword) {
      throw new ErrorControlado('Todos los campos son requeridos');
    }

    const rawUser = await this.usuarioRepository.findById(userId);

    if (!rawUser) {
      throw new ErrorControlado('Usuario no encontrado', 404);
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, rawUser.password_hash);

    if (!isCurrentPasswordValid) {
      throw new ErrorControlado('Contraseña actual incorrecta', 401);
    }

    if (currentPassword === newPassword) {
      throw new ErrorControlado('La nueva contraseña debe ser diferente a la actual');
    }

    await this.validatePassword(newPassword);

    const hashedNewPassword = await this.hashPassword(newPassword);

    await this.usuarioRepository.update(userId, { password_hash: hashedNewPassword });

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente'
    };
  }

  async validateUserCreationData(userData, isSelfRegistration = false) {
    const { nombre_completo, correo, password, tipo_usuario } = userData;

    if (!nombre_completo || nombre_completo.length < 2 || nombre_completo.length > 155) {
      throw new ErrorControlado('El nombre debe tener entre 2 y 155 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !emailRegex.test(correo)) {
      throw new ErrorControlado('El correo electrónico no es válido');
    }

    await this.validatePassword(password);

    if (tipo_usuario && !['superadmin', 'staff', 'cliente_final'].includes(tipo_usuario)) {
      throw new ErrorControlado('Tipo de usuario inválido');
    }

    const emailExists = await this.usuarioRepository.findByCorreo(correo);
    if (emailExists) {
      throw new ErrorControlado('El correo electrónico ya está registrado');
    }
  }

  async validateUserUpdateData(userData, userId) {
    const { correo, password } = userData;

    if (correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        throw new ErrorControlado('El correo electrónico no es válido');
      }

      const existingUser = await this.usuarioRepository.findByCorreo(correo);
      if (existingUser && existingUser.id !== userId) {
        throw new ErrorControlado('El correo electrónico ya está registrado por otro usuario');
      }
    }

    if (password) {
      await this.validatePassword(password);
    }
  }

  async validatePassword(password) {
    if (!password || password.length < 6) {
      throw new ErrorControlado('La contraseña debe tener al menos 6 caracteres');
    }

    if (password.length > 255) {
      throw new ErrorControlado('La contraseña no puede exceder 255 caracteres');
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      throw new ErrorControlado('La contraseña debe contener al menos una mayúscula, una minúscula y un número');
    }
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async sendPushNotificationToUser(userId, payload) {
    if (!userId || isNaN(userId)) {
      throw new ErrorControlado('ID de usuario inválido');
    }

    const user = await this.usuarioRepository.findById(userId);
    if (!user) {
      throw new ErrorControlado('Usuario no encontrado');
    }

    if (!user.webpush_endpoint || !user.webpush_p256dh || !user.webpush_auth) {
      return { success: false, message: 'El usuario no tiene una suscripción activa de WebPush' };
    }

    const subscription = {
      endpoint: user.webpush_endpoint,
      keys: {
        p256dh: user.webpush_p256dh,
        auth: user.webpush_auth
      }
    };

    const pushResult = await sendPushNotification(subscription, payload);

    if (pushResult.success === false && pushResult.expired === true) {
      // Si la suscripción expiró o ya no es válida, la removemos de la base de datos
      await this.usuarioRepository.update(userId, {
        webpush_endpoint: null,
        webpush_p256dh: null,
        webpush_auth: null
      });
      console.log(`Suscripción WebPush expirada removida para el usuario ${userId}`);
    }

    return pushResult;
  }

  async sendTestPushNotification(userId, title, body) {
    const payload = {
      notification: {
        title: title || 'Prueba de Web Push',
        body: body || '¡Hola! Esta es una notificación de prueba.',
        icon: '/assets/icon.png',
        badge: '/assets/badge.png',
        data: {
          url: '/'
        }
      }
    };

    return await this.sendPushNotificationToUser(userId, payload);
  }

  async verifyEmail(token) {
    if (!token) {
      throw new ErrorControlado('Token de verificación no proporcionado', 400);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.purpose !== 'email_verification') {
        throw new ErrorControlado('Token inválido para verificación de correo', 400);
      }

      const user = await this.usuarioRepository.findById(decoded.userId);
      if (!user) {
        throw new ErrorControlado('Usuario no encontrado', 404);
      }

      if (user.estado === 'activo') {
        return { success: true, message: 'La cuenta ya está activa' };
      }

      await this.usuarioRepository.update(user.id, { estado: 'activo' });

      return {
        success: true,
        message: 'Cuenta verificada y activada exitosamente. Ya puedes iniciar sesión.'
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ErrorControlado('El enlace de verificación ha expirado. Por favor, solicita uno nuevo.', 400);
      }
      if (error instanceof ErrorControlado) throw error;
      throw new ErrorControlado('Token de verificación inválido o dañado', 400);
    }
  }

  async requestPasswordReset(correo) {
    if (!correo) {
      throw new ErrorControlado('El correo electrónico es obligatorio', 400);
    }

    const user = await this.usuarioRepository.findUserRawByCorreo(correo);
    if (!user) {
      // Por seguridad, retornamos mensaje genérico
      return {
        success: true,
        message: 'Si el correo está registrado, recibirás un mensaje de recuperación en unos minutos.'
      };
    }

    if (user.estado !== 'activo') {
      throw new ErrorControlado('La cuenta no está activa o está suspendida.', 403);
    }

    const token = jwt.sign(
      { userId: user.id, purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    EmailHelper.sendPasswordResetEmail(user.correo, token, user.nombre_completo, false)
      .catch(err => console.error('Error al enviar correo de recuperación:', err));

    return {
      success: true,
      message: 'Si el correo está registrado, recibirás un mensaje de recuperación en unos minutos.'
    };
  }

  async resetPassword(token, newPassword) {
    if (!token || !newPassword) {
      throw new ErrorControlado('Token y nueva contraseña son obligatorios', 400);
    }

    await this.validatePassword(newPassword);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.purpose !== 'password_reset') {
        throw new ErrorControlado('Token inválido para restablecimiento de contraseña', 400);
      }

      const user = await this.usuarioRepository.findById(decoded.userId);
      if (!user) {
        throw new ErrorControlado('Usuario no encontrado', 404);
      }

      const hashedPassword = await this.hashPassword(newPassword);
      await this.usuarioRepository.update(user.id, { password_hash: hashedPassword });

      return {
        success: true,
        message: 'Contraseña restablecida exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.'
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ErrorControlado('El enlace de recuperación ha expirado. Por favor, solicita uno nuevo.', 400);
      }
      if (error instanceof ErrorControlado) throw error;
      throw new ErrorControlado('Token de recuperación inválido o dañado', 400);
    }
  }
}

export default UsuarioService;
