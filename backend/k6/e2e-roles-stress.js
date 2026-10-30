import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';

// ==============================================================================
// CONFIGURACIÓN DE CONEXIÓN
// ==============================================================================
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';
const VPS_API_KEY = __ENV.VPS_API_KEY || 'lsmf,JKgñhhw3ht4qbq4.k5bq.k3t4';

// ==============================================================================
// MÉTRICAS PERSONALIZADAS POR ROL Y OPERACIÓN
// ==============================================================================
const registerDuration = new Trend('conex_register_duration_ms');
const loginDuration = new Trend('conex_login_duration_ms');
const caficultorActionDuration = new Trend('conex_caficultor_actions_ms');
const catadorActionDuration = new Trend('conex_catador_actions_ms');
const adminActionDuration = new Trend('conex_admin_actions_ms');
const exportadoraActionDuration = new Trend('conex_exportadora_actions_ms');

const createdFincasCount = new Counter('conex_fincas_creadas_total');
const createdUsersCount = new Counter('conex_usuarios_registrados_total');
const e2eSuccessRate = new Rate('conex_e2e_success_rate');

// ==============================================================================
// CONFIGURACIÓN DE ESCENARIOS: 200 USUARIOS ACTIVOS CONCURRENTES
// ==============================================================================
export const options = {
  stages: [
    { duration: '30s', target: 50 },   // Fase 1: 50 usuarios ingresan y se registran
    { duration: '1m',  target: 100 },  // Fase 2: Escala a 100 usuarios activos
    { duration: '1m30s', target: 200 },// Fase 3: Escala a los 200 usuarios solicitados
    { duration: '2m',  target: 200 },  // Fase 4: 200 usuarios operando y creando datos simultáneamente
    { duration: '30s', target: 0 },    // Fase 5: Cierre ordenado y enfriamiento
  ],
  thresholds: {
    // 95% de las peticiones deben responder en menos de 2.5 segundos
    http_req_duration: ['p(95)<2500'],
    // Tasa de fallos menor al 5%
    http_req_failed: ['rate<0.05'],
  },
};

// ==============================================================================
// SETUP INICIAL
// ==============================================================================
export function setup() {
  const runId = Date.now().toString().slice(-6);
  console.log(`\n======================================================`);
  console.log(` ☕ INICIANDO PRUEBA DE ESTRÉS MULTIRROL (200 USUARIOS E2E)`);
  console.log(` 🎯 Servidor: ${BASE_URL}`);
  console.log(` 🔑 Lote ID de prueba: run_${runId}`);
  console.log(`======================================================\n`);

  const resHealth = http.get(`${BASE_URL}/api/health`, {
    headers: { 'x-api-key': VPS_API_KEY },
  });

  if (resHealth.status !== 200) {
    throw new Error(`El servidor en ${BASE_URL} no respondió adecuadamente (Status: ${resHealth.status})`);
  }

  return { runId };
}

// ==============================================================================
// ESTADO LOCAL DE CADA USUARIO VIRTUAL (VU)
// Cada VU mantiene su sesión en memoria durante el ciclo de vida del test
// ==============================================================================
const userSessions = {};

const MUNICIPIOS_CAUCA = ['Popayán', 'Piendamó', 'Timbío', 'Morales', 'Cajibío', 'Santander de Quilichao', 'Silvia'];
const VEREDAS = ['El Carmen', 'La Esperanza', 'San Isidro', 'Los Robles', 'La Florida', 'El Mirador', 'Bella Vista'];

export default function (data) {
  const vuId = __VU;
  const runId = data.runId;

  // Encabezados base con bypass de firewall local
  const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': VPS_API_KEY,
    'x-bypass-limit': 'true',
  };

  // ----------------------------------------------------------------------------
  // PASO 1: REGISTRO Y LOGIN DEL USUARIO (Solo en la primera iteración de cada VU)
  // ----------------------------------------------------------------------------
  if (!userSessions[vuId]) {
    // Distribución equilibrada de los 4 roles principales
    const roles = ['CAFICULTOR', 'CATADOR', 'ADMINISTRADOR', 'EMPRESA_EXPORTADORA'];
    const assignedRole = roles[vuId % roles.length];
    const userEmail = `stress_u${vuId}_${runId}@conexcoffee.com`;
    const password = 'Password123!';

    // A. Registro de cuenta
    const registerPayload = JSON.stringify({
      correo_electronico: userEmail,
      contrasena: password,
      rol_principal: assignedRole,
    });

    const regStart = Date.now();
    const regRes = http.post(`${BASE_URL}/api/usuarios-sistema/register`, registerPayload, { headers: baseHeaders });
    registerDuration.add(Date.now() - regStart);

    const isRegOk = check(regRes, {
      'Registro exitoso (201 o 409 si ya existe)': (r) => r.status === 201 || r.status === 409,
    });
    e2eSuccessRate.add(isRegOk);

    if (regRes.status === 201) {
      createdUsersCount.add(1);
    }

    sleep(0.3);

    // B. Login para obtener Token JWT
    const loginPayload = JSON.stringify({
      correo_electronico: userEmail,
      contrasena: password,
    });

    const logStart = Date.now();
    const loginRes = http.post(`${BASE_URL}/api/usuarios-sistema/login`, loginPayload, { headers: baseHeaders });
    loginDuration.add(Date.now() - logStart);

    let token = null;
    let userId = null;

    if (loginRes.status === 200) {
      try {
        const body = JSON.parse(loginRes.body);
        token = body.data?.token;
        userId = body.data?.usuario?.id;
      } catch (e) {}
    }

    const isLoginOk = check(loginRes, {
      'Login exitoso con JWT (200)': (r) => r.status === 200 && token !== null,
    });
    e2eSuccessRate.add(isLoginOk);

    // Guardar sesión en memoria del VU
    userSessions[vuId] = {
      role: assignedRole,
      token: token,
      userId: userId,
      caficultorId: null,
      fincaCreada: false,
    };

    // Si es CAFICULTOR, inicializar su ficha de negocio
    if (assignedRole === 'CAFICULTOR' && token && userId) {
      const authHeaders = { ...baseHeaders, 'Authorization': `Bearer ${token}` };
      const uniqueDoc = `109${vuId}${runId}`.slice(0, 10);
      const uniqueTel = `310${vuId}${runId}`.slice(0, 10);

      const caficultorPayload = JSON.stringify({
        usuario_id: userId,
        tipo_documento: 'CC',
        numero_documento: uniqueDoc,
        nombres: `Caficultor VU${vuId}`,
        apellidos: 'Cauca Tester',
        telefono_movil: uniqueTel,
        departamento: 'Cauca',
        municipio: MUNICIPIOS_CAUCA[vuId % MUNICIPIOS_CAUCA.length],
      });

      const cafRes = http.post(`${BASE_URL}/api/caficultores`, caficultorPayload, { headers: authHeaders });
      if (cafRes.status === 201) {
        try {
          const cafBody = JSON.parse(cafRes.body);
          userSessions[vuId].caficultorId = cafBody.data?.id;
        } catch (e) {}
      }
    }

    // Pequeño tiempo de pensar tras registrarse
    sleep(1);
    return;
  }

  // ----------------------------------------------------------------------------
  // PASO 2: OPERACIONES REALES SEGÚN EL ROL DE CADA USUARIO
  // ----------------------------------------------------------------------------
  const session = userSessions[vuId];
  if (!session || !session.token) {
    sleep(1);
    return;
  }

  const authHeaders = {
    ...baseHeaders,
    'Authorization': `Bearer ${session.token}`,
  };

  const startAction = Date.now();

  switch (session.role) {
    // --------------------------------------------------------------------------
    // ROL 1: CAFICULTOR (Crea fincas, consulta sus fincas y variedades)
    // --------------------------------------------------------------------------
    case 'CAFICULTOR': {
      // 1. Crear Finca si tiene caficultor_id y aún no la ha creado o crea lotes
      if (session.caficultorId && (!session.fincaCreada || Math.random() < 0.2)) {
        const fincaPayload = JSON.stringify({
          caficultor_id: session.caficultorId,
          nombre_finca: `Finca El Esfuerzo VU${vuId}-${Math.floor(Math.random() * 1000)}`,
          departamento: 'Cauca',
          municipio: MUNICIPIOS_CAUCA[vuId % MUNICIPIOS_CAUCA.length],
          vereda: VEREDAS[Math.floor(Math.random() * VEREDAS.length)],
          altitud_msnm: Math.floor(Math.random() * (2100 - 1400) + 1400),
          area_total_hectareas: (Math.random() * 10 + 1).toFixed(2),
          area_protegida_hectareas: '1.00',
          tipo_manejo: Math.random() > 0.5 ? 'ORGANICO' : 'CONVENCIONAL',
        });

        const resFinca = http.post(`${BASE_URL}/api/fincas`, fincaPayload, { headers: authHeaders });
        const fincaOk = check(resFinca, {
          'Caficultor crea Finca (201)': (r) => r.status === 201,
        });
        e2eSuccessRate.add(fincaOk);
        if (resFinca.status === 201) {
          createdFincasCount.add(1);
          session.fincaCreada = true;
        }
      }

      // 2. Consultar sus fincas
      const resFincas = http.get(`${BASE_URL}/api/fincas`, { headers: authHeaders });
      check(resFincas, { 'Caficultor lista Fincas (200)': (r) => r.status === 200 });

      // 3. Consultar catálogo de variedades de café
      const resVariedades = http.get(`${BASE_URL}/api/variedades-cafe`, { headers: authHeaders });
      check(resVariedades, { 'Caficultor consulta Variedades (200)': (r) => r.status === 200 });

      caficultorActionDuration.add(Date.now() - startAction);
      break;
    }

    // --------------------------------------------------------------------------
    // ROL 2: CATADOR (Consulta sesiones de catación, hojas CVA y evaluaciones)
    // --------------------------------------------------------------------------
    case 'CATADOR': {
      // 1. Consultar sesiones de catación asignadas
      const resSesiones = http.get(`${BASE_URL}/api/sesiones-catacion`, { headers: authHeaders });
      const sesionOk = check(resSesiones, { 'Catador lista Sesiones (200)': (r) => r.status === 200 });
      e2eSuccessRate.add(sesionOk);

      // 2. Consultar evaluaciones físicas de café
      const resEvaluaciones = http.get(`${BASE_URL}/api/evaluaciones-fisicas`, { headers: authHeaders });
      check(resEvaluaciones, { 'Catador lista Evaluaciones Físicas (200)': (r) => r.status === 200 });

      // 3. Consultar hojas CVA
      const resHojas = http.get(`${BASE_URL}/api/hojas-catacion-cva`, { headers: authHeaders });
      check(resHojas, { 'Catador consulta Hojas CVA (200)': (r) => r.status === 200 });

      catadorActionDuration.add(Date.now() - startAction);
      break;
    }

    // --------------------------------------------------------------------------
    // ROL 3: ADMINISTRADOR (Supervisa usuarios, auditoría de errores y alertas)
    // --------------------------------------------------------------------------
    case 'ADMINISTRADOR': {
      // 1. Supervisar usuarios registrados en el sistema
      const resUsers = http.get(`${BASE_URL}/api/usuarios-sistema`, { headers: authHeaders });
      const usersOk = check(resUsers, { 'Admin consulta Usuarios (200)': (r) => r.status === 200 });
      e2eSuccessRate.add(usersOk);

      // 2. Consultar catálogo de errores del sistema
      const resErrores = http.get(`${BASE_URL}/api/catalogo-errores`, { headers: authHeaders });
      check(resErrores, { 'Admin consulta Catálogo Errores (200)': (r) => r.status === 200 });

      // 3. Consultar alertas de seguridad
      const resAlertas = http.get(`${BASE_URL}/api/alertas-seguridad`, { headers: authHeaders });
      check(resAlertas, { 'Admin consulta Alertas Seguridad (200)': (r) => r.status === 200 });

      adminActionDuration.add(Date.now() - startAction);
      break;
    }

    // --------------------------------------------------------------------------
    // ROL 4: EMPRESA EXPORTADORA / BROKER (Revisa preofertas, trazabilidad y precintos)
    // --------------------------------------------------------------------------
    case 'EMPRESA_EXPORTADORA': {
      // 1. Consultar preofertas de café de los caficultores
      const resPreofertas = http.get(`${BASE_URL}/api/preofertas`, { headers: authHeaders });
      const preofertasOk = check(resPreofertas, { 'Exportadora lista Preofertas (200)': (r) => r.status === 200 });
      e2eSuccessRate.add(preofertasOk);

      // 2. Consultar inventario de precintos QR
      const resPrecintos = http.get(`${BASE_URL}/api/inventario-precintos-qr`, { headers: authHeaders });
      check(resPrecintos, { 'Exportadora consulta Precintos QR (200)': (r) => r.status === 200 });

      // 3. Consultar contenedores virtuales de exportación
      const resContenedores = http.get(`${BASE_URL}/api/contenedores-virtuales`, { headers: authHeaders });
      check(resContenedores, { 'Exportadora lista Contenedores (200)': (r) => r.status === 200 });

      exportadoraActionDuration.add(Date.now() - startAction);
      break;
    }
  }

  // Tiempo de pensamiento humano entre acciones (1 a 2 segundos)
  sleep(Math.random() * 1 + 1);
}

// ==============================================================================
// REPORTE DE RESULTADOS Y DIAGNÓSTICO E2E
// ==============================================================================
export function handleSummary(data) {
  const durationVals = data.metrics.http_req_duration ? data.metrics.http_req_duration.values : {};
  const p95 = durationVals['p(95)'] != null ? durationVals['p(95)'].toFixed(2) : 'N/A';
  const p90 = durationVals['p(90)'] != null ? durationVals['p(90)'].toFixed(2) : 'N/A';
  const avg = durationVals.avg != null ? durationVals.avg.toFixed(2) : 'N/A';
  const reqTotal = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const reqFailedRate = data.metrics.http_req_failed?.values?.rate != null ? (data.metrics.http_req_failed.values.rate * 100).toFixed(2) : '0';
  const maxVUs = data.metrics.vus_max ? data.metrics.vus_max.values.value : 0;

  const usersCreated = data.metrics.conex_usuarios_registrados_total ? data.metrics.conex_usuarios_registrados_total.values.count : 0;
  const fincasCreated = data.metrics.conex_fincas_creadas_total ? data.metrics.conex_fincas_creadas_total.values.count : 0;

  const summary = `
================================================================================
          INFORME DE ESTRÉS MULTIRROL END-TO-END (200 USUARIOS REALES)
================================================================================
  Usuarios Concurrentes Máximos (VUs):        ${maxVUs}
  Nuevos Usuarios Creados y Registrados:      ${usersCreated}
  Nuevas Fincas Creadas en BD (POST /fincas): ${fincasCreated}
  Total de Peticiones E2E Procesadas:         ${reqTotal}
  Tiempo Promedio de Respuesta:               ${avg} ms
  Tiempo Percentil 90 (p90):                  ${p90} ms
  Tiempo Percentil 95 (p95):                  ${p95} ms
  Tasa de Fallos HTTP:                        ${reqFailedRate}%
--------------------------------------------------------------------------------
  DIAGNÓSTICO DEL SISTEMA CON CARGA REAL DE NEGOCIO:
  ${
    reqFailedRate > 5
      ? `⚠️ ALERTA: Hubo una tasa de fallo de ${reqFailedRate}%. Revisa el pool de PostgreSQL o la memoria de Node.`
      : p95 > 2500
      ? `⚠️ DEGRADACIÓN: El p95 superó los 2.5s (${p95} ms) con ${maxVUs} usuarios concurrentes creando datos.`
      : `✅ ÉXITO TOTAL: El backend ConexCoffee procesó fluidamente a los ${maxVUs} usuarios creando y consultando datos con p95 de ${p95} ms.`
  }
================================================================================
`;

  return {
    stdout: summary,
    'k6-e2e-summary.json': JSON.stringify(data, null, 2),
  };
}
