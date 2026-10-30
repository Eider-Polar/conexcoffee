import AlertaSeguridad from '../modules/alertas_seguridad/AlertaSeguridad.js';

/**
 * Registra una alerta de seguridad y notifica a los administradores de ConexCoffee.
 * @param {string} title - Título de la notificación / alerta
 * @param {string} body - Cuerpo del mensaje
 * @param {string} [url] - URL opcional
 */
export const notifySuperAdmins = async (title, body, url = '/') => {
  try {
    await AlertaSeguridad.create({
      tipo_alerta: 'DDOS_O_TRAFICO_SOSPECHOSO',
      severidad: 'ALTA',
      descripcion: `${title}: ${body}`
    });
    console.warn(`[ALERTA SEGURIDAD CONEXCOFFEE] ${title}: ${body}`);
  } catch (err) {
    console.error('Error al registrar alerta de seguridad:', err.message);
  }
};

export default notifySuperAdmins;
