import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

/**
 * Garantiza que exista un registro en `acceso.usuarios_sistema` para un actor de `personas.*`.
 * Si `data.usuario_id` ya viene informado, lo devuelve directamente.
 * Si no viene, busca o crea el usuario por correo electrónico (o genera uno único).
 */
export async function ensureUsuarioSistema(data, defaultRole = 'CAFICULTOR') {
  if (data.usuario_id) return data.usuario_id;

  const rawEmail =
    data.correo ||
    data.correo_electronico ||
    data.email ||
    `actor.${Date.now()}.${Math.floor(Math.random() * 1000)}@conexcoffee.com`;
  const email = String(rawEmail).toLowerCase().trim();
  const rawPassword = data.password || data.contrasena || 'Password123!';

  const [existing] = await sequelize.query(
    `SELECT id FROM acceso.usuarios_sistema WHERE correo_electronico = :email LIMIT 1`,
    { replacements: { email } }
  );

  // Verificar que ese usuario_id no esté ya vinculado si la tabla tiene restricción UNIQUE(usuario_id)
  if (existing && existing[0]) {
    const [used] = await sequelize.query(
      `SELECT usuario_id FROM personas.caficultores WHERE usuario_id = :uid
       UNION ALL SELECT usuario_id FROM personas.empresas_exportadoras WHERE usuario_id = :uid
       UNION ALL SELECT usuario_id FROM personas.asistentes_tecnicos WHERE usuario_id = :uid
       UNION ALL SELECT usuario_id FROM personas.laboratorios WHERE usuario_id = :uid
       UNION ALL SELECT usuario_id FROM personas.catadores WHERE usuario_id = :uid
       UNION ALL SELECT usuario_id FROM personas.brokers WHERE usuario_id = :uid
       UNION ALL SELECT usuario_id FROM personas.compradores_internacionales WHERE usuario_id = :uid`,
      { replacements: { uid: existing[0].id } }
    );
    if (!used || used.length === 0) {
      return existing[0].id;
    }
  }

  const finalEmail =
    existing && existing[0]
      ? `${email.split('@')[0]}.${Date.now()}@${email.split('@')[1] || 'conexcoffee.com'}`
      : email;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(rawPassword, salt);

  const [created] = await sequelize.query(
    `INSERT INTO acceso.usuarios_sistema
      (correo_electronico, hash_contrasena, rol_principal, esta_activo, correo_verificado)
     VALUES (:email, :hash, :rol, true, true)
     RETURNING id`,
    {
      replacements: {
        email: finalEmail,
        hash,
        rol: defaultRole,
      },
    }
  );

  return created[0].id;
}
