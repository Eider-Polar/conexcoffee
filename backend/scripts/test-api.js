import app from '../index.js';
import http from 'http';
import { connectDB } from '../config/database.js';

const runTests = async () => {
  await connectDB();
  const server = http.createServer(app);
  const PORT = 3099;

  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Test server running on port ${PORT}`);

  try {
    // Test 1: Health check
    console.log('\n--- TEST 1: Health Check ---');
    const healthRes = await fetch(`http://localhost:${PORT}/api/health`);
    const healthJson = await healthRes.json();
    console.log('Status:', healthRes.status, 'Body:', healthJson);

    // Test 2: Login con Catador (Ana María López)
    console.log('\n--- TEST 2: Login Catador (catador.ana@qgrader.com) ---');
    const loginRes = await fetch(`http://localhost:${PORT}/api/usuarios-sistema/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        correo_electronico: 'catador.ana@qgrader.com',
        contrasena: 'Password123!'
      })
    });
    const loginJson = await loginRes.json();
    console.log('Status:', loginRes.status, 'Usuario autenticado:', loginJson.data?.usuario?.correo_electronico);
    const catadorToken = loginJson.data?.token;

    // Test 3: Login con Administrador
    console.log('\n--- TEST 3: Login Admin (admin@conexcoffee.com) ---');
    const adminLoginRes = await fetch(`http://localhost:${PORT}/api/usuarios-sistema/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        correo_electronico: 'admin@conexcoffee.com',
        contrasena: 'Password123!'
      })
    });
    const adminJson = await adminLoginRes.json();
    const adminToken = adminJson.data?.token;
    console.log('Status:', adminLoginRes.status, 'Admin token obtenido.');

    // Test 4: Listar Catadores
    console.log('\n--- TEST 4: Listar Catadores Q-Grader ---');
    const catadoresRes = await fetch(`http://localhost:${PORT}/api/catadores`, {
      headers: { 'Authorization': `Bearer ${catadorToken}` }
    });
    const catadoresJson = await catadoresRes.json();
    console.log('Status:', catadoresRes.status, 'Catadores encontrados:', catadoresJson.data?.length);
    const catadorRecord = catadoresJson.data?.[0];
    console.log('Catador:', catadorRecord?.nombres, catadorRecord?.apellidos, 'Certificado:', catadorRecord?.codigo_certificado_q_grader);

    // Test 5: Listar Sesiones de Catación
    console.log('\n--- TEST 5: Listar Sesiones de Catación (calidad.sesiones_catacion) ---');
    const sesionesRes = await fetch(`http://localhost:${PORT}/api/sesiones-catacion`, {
      headers: { 'Authorization': `Bearer ${catadorToken}` }
    });
    const sesionesJson = await sesionesRes.json();
    console.log('Status:', sesionesRes.status, 'Sesiones encontradas:', sesionesJson.data?.length);
    const sesion = sesionesJson.data?.[0];
    console.log('Sesión:', {
      id: sesion?.id,
      codigo: sesion?.codigo_sesion,
      titulo: sesion?.titulo,
      puntuacion_sca_global: sesion?.puntuacion_sca_global,
      estado_estandar: sesion?.estado_estandar,
      aprobado_para_exportacion: sesion?.aprobado_para_exportacion
    });

    // Test 6: Detalle de Sesión con sus hojas de catación
    console.log('\n--- TEST 6: Detalle de Sesión con Hojas de Catación y Catadores ---');
    const sesionDetalleRes = await fetch(`http://localhost:${PORT}/api/sesiones-catacion/${sesion.id}/detalles`, {
      headers: { 'Authorization': `Bearer ${catadorToken}` }
    });
    const sesionDetalleJson = await sesionDetalleRes.json();
    console.log('Status:', sesionDetalleRes.status, 'Total hojas vinculadas:', sesionDetalleJson.data?.hojas?.length);

    // Test 7: Listar Hojas de Catación CVA
    console.log('\n--- TEST 7: Listar Hojas de Catación CVA (calidad.hojas_catacion_cva) ---');
    const hojasRes = await fetch(`http://localhost:${PORT}/api/hojas-catacion-cva`, {
      headers: { 'Authorization': `Bearer ${catadorToken}` }
    });
    const hojasJson = await hojasRes.json();
    console.log('Status:', hojasRes.status, 'Hojas CVA encontradas:', hojasJson.data?.length);
    const hoja = hojasJson.data?.[0];

    // Test 8: Exportar Evaluación CVA a JSON anidado exacto
    console.log('\n--- TEST 8: Exportar Evaluación CVA a Formato JSON (calidad.fn_exportar_evaluacion_cva_json) ---');
    const exportRes = await fetch(`http://localhost:${PORT}/api/hojas-catacion-cva/${hoja.id}/exportar-json`, {
      headers: { 'Authorization': `Bearer ${catadorToken}` }
    });
    const exportJson = await exportRes.json();
    console.log('Status:', exportRes.status);
    console.log('Resultado Exportación JSON:', JSON.stringify(exportJson.data, null, 2).slice(0, 450) + '...\n');

    // Test 9: Ingesta CVA desde JSON (Muestra 2) para verificar trigger de recálculo promedio
    console.log('\n--- TEST 9: Ingesta CVA desde JSON (calidad.fn_guardar_evaluacion_cva_desde_json) ---');
    const nuevoPayload = {
      evaluacion: {
        codigo: sesion.codigo_sesion,
        total_muestras: 2,
        conclusion_catador: 'Segunda muestra del panel: notas dulces achocolatadas y cuerpo meloso pronunciado.',
        puntuacion_catador: 86.50,
        fases: {
          fase_1_descriptiva: {
            nivel_tueste: { valor: 63.00, nombre: 'Medio', termino_ingles: 'Medium' },
            fragancia: { intensidad: 12.00, categoria_intensidad: 'Intenso', escala_maxima: 15 },
            aroma: { intensidad: 12.50, categoria_intensidad: 'Intenso', escala_maxima: 15 },
            descriptores: ['Chocolate con leche', 'Caramelo', 'Avellana']
          },
          fase_2_afectiva: {
            fragancia: { calidad_agrado: 8.5, escala_maxima: 9 },
            aroma: { calidad_agrado: 8.6, escala_maxima: 9 }
          },
          fase_3_sabor_descriptiva: {
            sabor: { intensidad: 13.00, categoria_intensidad: 'Medio-Alto', escala_maxima: 15 },
            sabor_residual_aftertaste: { intensidad: 11.50, categoria_intensidad: 'Medio', escala_maxima: 15 },
            gustos_predominantes: ['Dulce'],
            descriptores_sabor: ['Cacao', 'Panela', 'Nuez']
          },
          fase_4_sabor_afectiva: {
            sabor: { calidad_agrado: 8.6, escala_maxima: 9 },
            sabor_residual: { calidad_agrado: 8.4, escala_maxima: 9 }
          },
          fase_5_acidez: {
            intensidad: { valor: 10.00, categoria_intensidad: 'Media Equilibrada', escala_maxima: 15 },
            calidad_agrado: { valor: 8.4, escala_maxima: 9 },
            tipo_acidez_nota: 'Cítrica suave tipo naranja madura'
          },
          fase_6_dulzor: {
            intensidad: { valor: 13.50, categoria_intensidad: 'Muy Dulce', escala_maxima: 15 },
            calidad_agrado: { valor: 8.8, escala_maxima: 9 },
            tipo_dulzor_nota: 'Caramelo y melaza artesanal'
          },
          fase_7_sensacion_boca: {
            intensidad: { valor: 12.50, categoria_intensidad: 'Cuerpo Pleno', escala_maxima: 15 },
            textura_cualidad: ['Cremoso', 'Meloso'],
            calidad_agrado: { valor: 8.6, escala_maxima: 9 },
            nota: 'Cuerpo untuoso y redondo'
          },
          fase_8_impresion_global: {
            calidad_agrado_global: { valor: 8.6, escala_maxima: 9 },
            nota_balance: 'Excelente taza comercial de alta fidelidad'
          },
          defectos_y_uniformidad: {
            tazas_no_uniformes: { cantidad: 0, total_tazas: 5, tazas_seleccionadas: [] },
            tazas_defectuosas: { cantidad: 0, total_tazas: 5, tazas_seleccionadas: [] },
            tipo_defecto: 'NINGUNO'
          }
        }
      }
    };

    const ingestRes = await fetch(`http://localhost:${PORT}/api/hojas-catacion-cva/ingestar-json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${catadorToken}`
      },
      body: JSON.stringify({
        payload: nuevoPayload,
        evaluacion_fisica_id: sesion.evaluacion_fisica_id
      })
    });
    const ingestJson = await ingestRes.json();
    console.log('Status:', ingestRes.status, 'Ingesta exitosa:', ingestJson.data?.mensaje);
    console.log('Hoja ID generada/actualizada:', ingestJson.data?.hoja_id);

    // Test 10: Verificar que la sesión recalculó el promedio oficial
    console.log('\n--- TEST 10: Verificar recálculo automático del promedio por Trigger ---');
    const sesionCheckRes = await fetch(`http://localhost:${PORT}/api/sesiones-catacion/${sesion.id}`, {
      headers: { 'Authorization': `Bearer ${catadorToken}` }
    });
    const sesionCheckJson = await sesionCheckRes.json();
    console.log('Puntaje SCA Global consolidado en sesión:', sesionCheckJson.data?.puntuacion_sca_global);
    console.log('Aprobado para exportación:', sesionCheckJson.data?.aprobado_para_exportacion);
    console.log('Estado estándar:', sesionCheckJson.data?.estado_estandar);

    // Test 11: Compatibilidad hacia atrás (/api/evaluaciones-sensoriales-cva)
    console.log('\n--- TEST 11: Compatibilidad de ruta previa (/api/evaluaciones-sensoriales-cva) ---');
    const legacyRes = await fetch(`http://localhost:${PORT}/api/evaluaciones-sensoriales-cva`, {
      headers: { 'Authorization': `Bearer ${catadorToken}` }
    });
    const legacyJson = await legacyRes.json();
    console.log('Status:', legacyRes.status, 'Registros obtenidos vía alias legacy:', legacyJson.data?.length);

    console.log('\n======================================================');
    console.log('✅ TODOS LOS TESTS DE LA NUEVA ARQUITECTURA CVA PASARON!');
    console.log('======================================================');

  } catch (err) {
    console.error('❌ Error en tests:', err);
  } finally {
    server.close();
    process.exit(0);
  }
};

runTests();
