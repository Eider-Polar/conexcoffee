import webpush from 'web-push';
import 'dotenv/config';

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;
const vapidEmail = process.env.VAPID_EMAIL || 'mailto:soporte@tuapp.com';

if (publicVapidKey && privateVapidKey) {
  try {
    webpush.setVapidDetails(
      vapidEmail,
      publicVapidKey,
      privateVapidKey
    );
  } catch (error) {
    console.warn('Advertencia: Error al configurar las llaves VAPID:', error.message);
  }
} else {
  console.warn('Advertencia: Las llaves VAPID no están configuradas en las variables de entorno.');
}

/**
 * Envía una notificación push a una suscripción específica.
 * @param {Object} subscription - Suscripción del usuario { endpoint, keys: { p256dh, auth } }
 * @param {Object|String} payload - Datos de la notificación
 * @returns {Promise<Object>} Resultado del envío
 */
export const sendPushNotification = async (subscription, payload) => {
  try {
    const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const result = await webpush.sendNotification(subscription, payloadString);
    return { success: true, result };
  } catch (error) {
    console.error('Error al enviar notificación push:', error);
    // Si la suscripción ya no es válida (código 410 o 404), ha expirado
    if (error.statusCode === 410 || error.statusCode === 404) {
      return { success: false, expired: true, error: error.message };
    }
    return { success: false, expired: false, error: error.message };
  }
};

export default webpush;
