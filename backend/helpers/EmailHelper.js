import { Resend } from 'resend';
import 'dotenv/config';

const resendApiKey = process.env.RESEND;
let resend;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.warn('Advertencia: La API Key de Resend no está configurada en las variables de entorno.');
}

export class EmailHelper {
  /**
   * Envía un correo electrónico genérico.
   * @param {Object} options - Opciones de envío
   * @param {string} options.to - Destinatario
   * @param {string} options.subject - Asunto del correo
   * @param {string} options.html - Plantilla HTML del correo
   */
  static async sendEmail({ to, subject, html, from }) {
    if (!resend) {
      console.warn(`[SIMULACIÓN CORREO] Para: ${to} | Asunto: ${subject}`);
      return { success: true, simulated: true };
    }

    const sender = from || process.env.EMAIL_FROM || 'onboarding@resend.dev';

    try {
      const data = await resend.emails.send({
        from: sender,
        to,
        subject,
        html
      });
      return { success: true, data };
    } catch (error) {
      console.error('Error al enviar correo vía Resend:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Envía correo de bienvenida / confirmación de registro con enlace directo al login.
   * @param {string} email - Correo del usuario registrado
   * @param {string} nombre - Nombre del usuario
   * @param {string} [customLoginUrl] - URL personalizada de inicio de sesión opcional
   */
  static async sendWelcomeEmail(email, nombre = 'Usuario', customLoginUrl = null) {
    const frontendUrl = process.env.FRONTEND_URL ;
    const loginUrl = customLoginUrl || `${frontendUrl}/login`;

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Gracias por registrarte!</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td align="center" style="padding: 40px 15px;">
              
              <!-- Container Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
                
                <!-- Top Brand Accent Bar -->
                <tr>
                  <td style="height: 6px; background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%);"></td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td style="padding: 36px 32px; text-align: center;">
                    
                    <!-- Icon / Brand Badge -->
                    <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background: linear-gradient(135deg, #06b6d4, #6366f1); border-radius: 14px; margin-bottom: 24px; text-align: center; color: #020617; font-size: 28px; font-weight: 900;">
                      ✓
                    </div>

                    <!-- Main Title -->
                    <h1 style="margin: 0 0 12px 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                      ¡Gracias por registrarte!
                    </h1>

                    <!-- Personalized Greeting -->
                    <p style="margin: 0 0 16px 0; color: #38bdf8; font-size: 16px; font-weight: 600;">
                      Hola, ${nombre}
                    </p>

                    <!-- Body Description -->
                    <p style="margin: 0 0 28px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                      Tu cuenta ha sido creada exitosamente en nuestra plataforma SaaS. Ya puedes acceder al panel de control para comenzar a configurar y administrar tus recursos.
                    </p>

                    <!-- Call To Action Button -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                      <tr>
                        <td align="center">
                          <a href="${loginUrl}" target="_blank" style="display: inline-block; background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%); color: #020617; text-decoration: none; padding: 14px 32px; font-size: 15px; font-weight: 800; border-radius: 12px; box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.35);">
                            Ir al Inicio de Sesión →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Fallback Link -->
                    <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 10px; padding: 14px; margin-bottom: 24px; text-align: left;">
                      <p style="margin: 0 0 6px 0; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        ¿No puedes hacer clic en el botón? Copia este enlace:
                      </p>
                      <a href="${loginUrl}" target="_blank" style="color: #38bdf8; font-size: 12px; word-break: break-all; text-decoration: none;">
                        ${loginUrl}
                      </a>
                    </div>

                    <!-- Footer Note -->
                    <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
                    <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                      Si no realizaste este registro, por favor ponte en contacto con nuestro equipo de soporte.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Bottom Tag -->
              <p style="margin-top: 20px; font-size: 11px; color: #475569; text-align: center;">
                © ${new Date().getFullYear()} SaaS Centralizado. Todos los derechos reservados.
              </p>

            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: '🎉 ¡Bienvenido! Gracias por registrarte',
      html
    });
  }

  /**
   * Envía correo de verificación de email para usuarios.
   */
  static async sendVerificationEmail(email, token, nombre = 'Usuario') {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    // Link directo a la vista pública de verificación en el frontend
    const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifica tu correo electrónico</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td align="center" style="padding: 40px 15px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
                <tr>
                  <td style="height: 6px; background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%);"></td>
                </tr>
                <tr>
                  <td style="padding: 36px 32px; text-align: center;">
                    <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background: linear-gradient(135deg, #06b6d4, #6366f1); border-radius: 14px; margin-bottom: 24px; text-align: center; color: #020617; font-size: 26px; font-weight: 900;">
                      ✉
                    </div>
                    <h1 style="margin: 0 0 12px 0; color: #ffffff; font-size: 24px; font-weight: 800;">
                      ¡Hola, ${nombre}!
                    </h1>
                    <p style="margin: 0 0 28px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                      Gracias por registrarte. Para completar tu registro y activar tu cuenta en la plataforma, por favor confirma tu dirección de correo electrónico:
                    </p>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                      <tr>
                        <td align="center">
                          <a href="${verificationUrl}" target="_blank" style="display: inline-block; background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%); color: #020617; text-decoration: none; padding: 14px 32px; font-size: 15px; font-weight: 800; border-radius: 12px; box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.35);">
                            Verificar Correo y Activar Cuenta →
                          </a>
                        </td>
                      </tr>
                    </table>
                    <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 10px; padding: 14px; margin-bottom: 24px; text-align: left;">
                      <p style="margin: 0 0 6px 0; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                        O copia el siguiente enlace en tu navegador:
                      </p>
                      <a href="${verificationUrl}" target="_blank" style="color: #38bdf8; font-size: 12px; word-break: break-all; text-decoration: none;">
                        ${verificationUrl}
                      </a>
                    </div>
                    <p style="margin: 0 0 16px 0; font-size: 12px; color: #f59e0b;">
                      ⏳ Este enlace expirará en 24 horas.
                    </p>
                    <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
                    <p style="margin: 0; font-size: 12px; color: #64748b;">
                      Si no creaste esta cuenta, puedes ignorar este mensaje de forma segura.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
    return this.sendEmail({ to: email, subject: 'Verifica tu correo electrónico', html });
  }

  /**
   * Envía correo de recuperación de contraseña para usuarios y SuperAdmins.
   */
  static async sendPasswordResetEmail(email, token, nombre = 'Usuario', isSuperAdmin = false) {
    const frontendUrl = process.env.FRONTEND_URL;
    // Link que redirige al frontend con el token de recuperación
    const resetUrl = `${frontendUrl}/reset-password?token=${token}&role=${isSuperAdmin ? 'superadmin' : 'usuario'}`;
     
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #EF4444;">Restablecer Contraseña ${isSuperAdmin ? '(SuperAdmin)' : ''}</h2>
        <p>Hola ${nombre},</p>
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
        <p>Haz click en el botón de abajo para cambiar tu contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #EF4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Restablecer Contraseña</a>
        </div>
        <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
        <p style="word-break: break-all; color: #EF4444;"><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Este enlace de recuperación es válido por 1 hora.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #777;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
      </div>
    `;
    return this.sendEmail({ to: email, subject: 'Restablecer contraseña', html });
  }

  /**
   * Envía correo de notificación de creación de SuperAdmin.
   */
  static async sendSuperAdminCreatedEmail(email, token) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #10B981; margin-top: 0;">👑 Nuevo SuperAdmin Creado</h2>
        <p>Se ha registrado un usuario de tipo <strong>SuperAdmin</strong> desde la consola de comandos.</p>
        <p><strong>Correo electrónico:</strong> <code>${email}</code></p>
        <p><strong>Token de Sesión JWT:</strong></p>
        <textarea readonly style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: monospace; font-size: 11px; resize: none; background: #fafafa; box-sizing: border-box;">${token}</textarea>
        <p style="margin-top: 15px;">Puedes usar este token directamente para autenticarte o iniciar sesión con tu contraseña.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #EF4444; font-weight: bold;">IMPORTANTE: Si no autorizaste la creación de este superusuario, por favor contacta al administrador del servidor de inmediato.</p>
      </div>
    `;
    return this.sendEmail({ to: email, subject: '👑 Creación de Cuenta SuperAdmin', html });
  }
}
