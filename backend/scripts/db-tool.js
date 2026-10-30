import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB, sequelize } from '../config/database.js';
import SuperAdmin from '../modules/super_admins/SuperAdmin.js';
import Usuario from '../modules/usuarios/Usuario.js';

async function run() {
  try {
    await connectDB();
    console.log("Verificando SuperAdmins y Usuarios existentes...");

    const superAdmins = await SuperAdmin.findAll();
    console.log(`Se encontraron ${superAdmins.length} SuperAdmins:`);
    superAdmins.forEach(s => console.log(`- ${s.correo}`));

    const users = await Usuario.findAll();
    console.log(`Se encontraron ${users.length} Usuarios:`);
    users.forEach(u => console.log(`- ${u.correo} (${u.tipo_usuario})`));

    // Si no hay superadmins, crear el de por defecto
    if (superAdmins.length === 0) {
      console.log("Creando SuperAdmin por defecto: esamyrd@gmail.com / admin123");
      const password_hash = await bcrypt.hash("admin123", 10);
      await SuperAdmin.create({
        correo: "esamyrd@gmail.com",
        password_hash: password_hash
      });
      console.log("¡SuperAdmin creado!");
    }

    // Si no hay usuarios normales, crear uno
    if (users.length === 0) {
      console.log("Creando usuario normal por defecto: user@example.com / user123");
      const password_hash = await bcrypt.hash("user123", 10);
      await Usuario.create({
        nombre_completo: "Usuario Demo",
        correo: "user@example.com",
        password_hash: password_hash,
        tipo_usuario: "staff",
        estado: "activo"
      });
      console.log("¡Usuario creado!");
    }
  } catch (error) {
    console.error("Error al ejecutar el script:", error);
  } finally {
    await sequelize.close();
    console.log("Conexión a la base de datos cerrada.");
  }
}

run().catch(console.error);
