import 'dotenv/config';
import readline from 'readline';
import { connectDB, sequelize } from '../config/database.js';
import SuperAdminRepository from '../modules/super_admins/repository/SuperAdminRepository.js';
import SuperAdminService from '../modules/super_admins/services/SuperAdminService.js';
import { EmailHelper } from '../helpers/EmailHelper.js';

function askQuestion(query, isPassword = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    if (!isPassword) {
      rl.question(query, (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    } else {
      process.stdout.write(query);
      
      // Set raw mode to capture keypresses individually
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');

      let password = '';
      const onKeypress = (key) => {
        // CTRL+C (Exit program)
        if (key === '\u0003') {
          process.stdout.write('\n');
          process.exit();
        }
        
        // Enter / Return
        if (key === '\r' || key === '\n') {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener('data', onKeypress);
          process.stdout.write('\n');
          rl.close();
          resolve(password);
          return;
        }

        // Backspace
        if (key === '\u0008' || key === '\x7f') {
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b'); // backspace, space, backspace
          }
          return;
        }

        // Add character
        password += key;
        process.stdout.write('*');
      };

      process.stdin.on('data', onKeypress);
    }
  });
}

async function run() {
  console.log('=== Registro de SuperAdmin por Consola ===\n');

  try {
    // 1. Conectar a la Base de Datos
    await connectDB();

    // 2. Pedir credenciales por consola
    const correo = await askQuestion('Introduce el correo electrónico: ');
    if (!correo) {
      console.error('\nError: El correo electrónico es requerido.');
      process.exit(1);
    }

    const password = await askQuestion('Introduce la contraseña: ', true);
    if (!password) {
      console.error('Error: La contraseña es requerida.');
      process.exit(1);
    }

    const confirmPassword = await askQuestion('Confirma la contraseña: ', true);
    if (password !== confirmPassword) {
      console.error('Error: Las contraseñas no coinciden.');
      process.exit(1);
    }

    // Destinatario del código de autorización (CORREO_PIN del .env o fallback al correo ingresado)
    const destinatarioPin = process.env.CORREO_PIN || correo;

    // Generar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`\nEnviando código de verificación a: ${destinatarioPin} (para autorizar el registro de ${correo})...`);

    // Enviar correo
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #4F46E5; margin-top: 0;">🔒 Código de Autorización de SuperAdmin</h2>
        <p>Se ha iniciado una solicitud de registro de un nuevo <strong>SuperAdmin</strong> desde la consola de comandos.</p>
        <p><strong>Correo del nuevo SuperAdmin a registrar:</strong> <code>${correo}</code></p>
        <p><strong>Enviado para autorización a:</strong> <code>${destinatarioPin}</code></p>
        <p>Para autorizar esta acción, introduce el siguiente código de verificación en la terminal:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="background-color: #F3F4F6; color: #1F2937; padding: 12px 24px; border-radius: 5px; font-weight: bold; font-size: 24px; letter-spacing: 4px; border: 1px solid #D1D5DB; display: inline-block;">${code}</span>
        </div>
        <p>Si tú no iniciaste esta solicitud, puedes ignorar este correo de forma segura.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #EF4444; font-weight: bold;">ADVERTENCIA: No compartas este código con nadie. Da acceso administrativo completo al sistema.</p>
      </div>
    `;

    const emailResult = await EmailHelper.sendEmail({
      to: destinatarioPin,
      subject: '🔒 Código de Autorización - Creación de SuperAdmin',
      html: emailHtml
    });

    if (!emailResult.success) {
      console.error(`\nError al enviar el correo de verificación: ${emailResult.error}`);
      process.exit(1);
    }

    if (emailResult.simulated) {
      console.error('\nError: Para registrar un SuperAdmin se requiere que configures la clave de API de Resend real en tu archivo .env.');
      process.exit(1);
    }

    // Pedir código de verificación por consola
    const inputCode = await askQuestion(`Introduce el código de verificación enviado a ${destinatarioPin}: `);
    if (inputCode !== code) {
      console.error('\nError: El código de verificación es incorrecto. Registro cancelado.');
      process.exit(1);
    }

    console.log('\nCódigo verificado con éxito.');

    console.log('\nRegistrando SuperAdmin en la base de datos...');

    // 3. Inicializar repositorio y servicio
    const superAdminRepo = new SuperAdminRepository();
    const superAdminService = new SuperAdminService(superAdminRepo);

    // 4. Crear SuperAdmin
    const result = await superAdminService.createSuperAdmin({ correo, password });

    console.log(`\n¡Éxito! ${result.message}`);
    console.log('Datos del SuperAdmin creado:');
    console.log(`- ID: ${result.data.id}`);
    console.log(`- Correo: ${result.data.correo}`);
    console.log(`- UUID: ${result.data.uuid}`);
    console.log(`- Token de Sesión JWT:\n${result.token}`);

  } catch (error) {
    console.error('\nError al crear el SuperAdmin:');
    if (error.name === 'ErrorControlado' || error.message) {
      console.error(`- ${error.message}`);
    } else {
      console.error(error);
    }
  } finally {
    // 5. Cerrar la conexión de Sequelize limpia y salir
    try {
      await sequelize.close();
      console.log('\nConexión a la base de datos cerrada.');
    } catch (dbCloseError) {
      console.error('Error al cerrar la conexión a la base de datos:', dbCloseError);
    }
    process.exit(0);
  }
}

run();
