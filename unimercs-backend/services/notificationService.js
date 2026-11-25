const Notification = require('../models/notification');
const User = require('../models/user');

/**
 * Servicio de notificaciones y despacho de correos (HU-05 / HU-17)
 */
async function sendNotification({ userId, title, message, type = 'system' }) {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    // Determinar destinatarios según preferencia del usuario (HU-05)
    const emails = [];
    const pref = user.notificationPreference || 'institucional';
    
    if (pref === 'institucional' || pref === 'ambos') {
      emails.push(user.email);
    }
    if ((pref === 'personal' || pref === 'ambos') && user.personalEmail) {
      emails.push(user.personalEmail);
    }
    if (emails.length === 0) {
      emails.push(user.email);
    }

    const emailSentTo = emails.join(', ');

    // Crear registro en la base de datos
    const notif = await Notification.create({
      userId,
      title,
      message,
      type,
      emailSentTo
    });

    console.log(`📧 [Notificación Correo] Para: [${emailSentTo}] | Asunto: ${title} | Mensaje: ${message}`);

    return notif;
  } catch (err) {
    console.error('Error al emitir notificación:', err.message);
    return null;
  }
}

module.exports = { sendNotification };
