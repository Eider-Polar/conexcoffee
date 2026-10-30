import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// ==============================================================================
// CONFIGURACIÓN Y VARIABLES DE ENTORNO
// ==============================================================================
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';
const VPS_API_KEY = __ENV.VPS_API_KEY || 'lsmf,JKgñhhw3ht4qbq4.k5bq.k3t4'; // Para bypass de ddosShield en localhost
const TEST_EMAIL = __ENV.TEST_EMAIL || 'catador.ana@qgrader.com';
const TEST_PASSWORD = __ENV.TEST_PASSWORD || 'Password123!';

// ==============================================================================
// MÉTRICAS PERSONALIZADAS
// ==============================================================================
const healthDuration = new Trend('conex_health_duration_ms');
const dbQueryDuration = new Trend('conex_db_query_duration_ms');
const rateLimitHits = new Counter('conex_rate_limited_429');
const serverErrors = new Counter('conex_server_errors_5xx');
const successRate = new Rate('conex_success_rate');

// ==============================================================================
// ETAPAS DE SOBRECARGA ESCALONADA (BREAKPOINT / STRESS TEST)
// Incrementa progresivamente los usuarios activos (VUs) para detectar cuándo
// el backend comienza a degradarse (aumento de latencia) o a fallar (errores 500/502).
// ==============================================================================
export const options = {
  stages: [
    { duration: '30s', target: 20 },   // 1. Calentamiento suave (20 usuarios activos)
    { duration: '1m',  target: 50 },   // 2. Carga estándar esperada (50 usuarios)
    { duration: '1m',  target: 100 },  // 3. Sobrecarga moderada (100 usuarios)
    { duration: '1m30s', target: 200 },// 4. Sobrecarga alta (200 usuarios)
    { duration: '1m30s', target: 400 },// 5. Estrés crítico (400 usuarios)
    { duration: '1m30s', target: 600 },// 6. Límite de rotura (600 usuarios)
    { duration: '1m30s', target: 800 },// 7. Límite extremo (800 usuarios)
    { duration: '45s', target: 0 },    // 8. Enfriamiento y recuperación
  ],
  thresholds: {
    // La prueba considerará degradado el sistema si los errores superan el 5%
    // o si el percentil 95 de peticiones supera los 2 segundos (2000 ms)
    http_req_failed: ['rate<0.05'], 
    http_req_duration: ['p(95)<2000', 'p(99)<4000'],
  },
};

// ==============================================================================
// SETUP: Se ejecuta UNA SOLA VEZ al inicio del test
// Obtiene el token JWT del usuario para que las VUs simulen navegación autenticada
// ==============================================================================
export function setup() {
  console.log(`\n======================================================`);
  console.log(` Iniciando prueba de sobrecarga ConexCoffee Backend`);
  console.log(` Destino: ${BASE_URL}`);
  console.log(`======================================================\n`);

  // 1. Verificar si el backend está activo
  const healthCheck = http.get(`${BASE_URL}/api/health`, {
    headers: { 'x-api-key': VPS_API_KEY },
  });

  if (healthCheck.status !== 200) {
    console.error(`❌ ERROR CRÍTICO: El backend en ${BASE_URL} no respondió al health check (Status: ${healthCheck.status}).`);
    console.error(`Asegúrate de que el backend esté corriendo (npm run dev) antes de ejecutar k6.`);
    return { token: null, isReady: false };
  }

  console.log(`✅ Backend detectado en línea. Intentando autenticación de prueba...`);

  // 2. Obtener Token JWT para simular usuarios reales
  const loginPayload = JSON.stringify({
    correo_electronico: TEST_EMAIL,
    contrasena: TEST_PASSWORD,
  });

  const loginRes = http.post(`${BASE_URL}/api/usuarios-sistema/login`, loginPayload, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': VPS_API_KEY,
    },
  });

  let token = null;
  if (loginRes.status === 200) {
    try {
      const body = JSON.parse(loginRes.body);
      token = body.data?.token;
      console.log(`✅ Autenticación exitosa. Token JWT obtenido para las peticiones de las VUs.`);
    } catch (e) {
      console.warn(`⚠️ No se pudo parsear el token de respuesta.`);
    }
  } else {
    console.warn(`⚠️ Advertencia: Login respondió con status ${loginRes.status}. El test continuará sólo con endpoints públicos.`);
  }

  return { token, isReady: true };
}

// ==============================================================================
// FUNCIÓN PRINCIPAL DE CADA USUARIO VIRTUAL (VU)
// Simula el comportamiento realista de un usuario activo en el sistema ConexCoffee
// ==============================================================================
export default function (data) {
  const commonHeaders = {
    'Accept': 'application/json',
    'x-api-key': VPS_API_KEY, // Bypass para ddosShield en localhost
    'x-bypass-limit': 'true',
  };

  if (data.token) {
    commonHeaders['Authorization'] = `Bearer ${data.token}`;
  }

  // --- TRANSACCIÓN 1: Ping / Health Check (Mide tiempo de respuesta puro del servidor Node) ---
  const resHealth = http.get(`${BASE_URL}/api/health`, { headers: commonHeaders });
  healthDuration.add(resHealth.timings.duration);

  const isHealthOk = check(resHealth, {
    'Health Check devuelve 200': (r) => r.status === 200,
  });

  if (resHealth.status === 429) rateLimitHits.add(1);
  if (resHealth.status >= 500) serverErrors.add(1);
  successRate.add(isHealthOk);

  // Pausa corta de lectura (simula comportamiento humano)
  sleep(0.5);

  // --- TRANSACCIÓN 2: Consulta a Base de Datos (Mide el Pool de PostgreSQL y Sequelize) ---
  // Consultamos el listado de sesiones de catación
  const resSesiones = http.get(`${BASE_URL}/api/sesiones-catacion`, { headers: commonHeaders });
  dbQueryDuration.add(resSesiones.timings.duration);

  const isSesionesOk = check(resSesiones, {
    'Sesiones de Catación responde exitoso (200 o 401 si no hay token)': (r) => r.status === 200 || r.status === 401,
  });

  if (resSesiones.status === 429) rateLimitHits.add(1);
  if (resSesiones.status >= 500) serverErrors.add(1);
  successRate.add(isSesionesOk);

  // Pausa corta
  sleep(0.5);

  // --- TRANSACCIÓN 3: Consulta secundaria de catálogo/catadores ---
  const resCatadores = http.get(`${BASE_URL}/api/catadores`, { headers: commonHeaders });
  dbQueryDuration.add(resCatadores.timings.duration);

  const isCatadoresOk = check(resCatadores, {
    'Catadores responde exitoso (200 o 401)': (r) => r.status === 200 || r.status === 401,
  });

  if (resCatadores.status === 429) rateLimitHits.add(1);
  if (resCatadores.status >= 500) serverErrors.add(1);
  successRate.add(isCatadoresOk);

  // Tiempo de espera entre ciclos de usuario (Think Time: 1 a 2 segundos)
  sleep(Math.random() * 1 + 1);
}

// ==============================================================================
// REPORTE DE RESULTADOS Y DIAGNÓSTICO
// ==============================================================================
export function handleSummary(data) {
  const durationVals = data.metrics.http_req_duration ? data.metrics.http_req_duration.values : {};
  const p95 = durationVals['p(95)'] != null ? durationVals['p(95)'].toFixed(2) : 'N/A';
  const p90 = durationVals['p(90)'] != null ? durationVals['p(90)'].toFixed(2) : 'N/A';
  const avg = durationVals.avg != null ? durationVals.avg.toFixed(2) : 'N/A';
  const reqTotal = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const reqFailed = data.metrics.http_req_failed?.values?.rate != null ? (data.metrics.http_req_failed.values.rate * 100).toFixed(2) : '0';
  const rateLimitCount = data.metrics.conex_rate_limited_429 ? data.metrics.conex_rate_limited_429.values.count : 0;
  const server5xxCount = data.metrics.conex_server_errors_5xx ? data.metrics.conex_server_errors_5xx.values.count : 0;
  const maxVUs = data.metrics.vus_max ? data.metrics.vus_max.values.value : 0;

  const summaryText = `
================================================================================
              INFORME DE PRUEBA DE SOBRECARGA Y CAPACIDAD CONEXCOFFEE
================================================================================
  Usuarios Concurrentes Máximos Probados (VUs): ${maxVUs}
  Total de Solicitudes Procesadas:              ${reqTotal}
  Tiempo Promedio de Respuesta:                 ${avg} ms
  Tiempo Percentil 90 (p90):                    ${p90} ms
  Tiempo Percentil 95 (p95):                    ${p95} ms
  Tasa de Fallos Global:                        ${reqFailed}%
  Errores 5xx (Colapso del Servidor / DB Pool): ${server5xxCount}
  Bloqueos 429 (Rate Limiter / DDoS Shield):    ${rateLimitCount}
--------------------------------------------------------------------------------
  DIAGNÓSTICO DEL LÍMITE DE USUARIOS ACTIVOS:
${
  server5xxCount > 0
    ? `  ⚠️ ATENCIÓN: Se detectaron ${server5xxCount} errores de servidor (5xx). El backend alcanzó su límite físico de recursos (event loop saturado o pool de PostgreSQL agotado).`
    : p95 > 2000
    ? `  ⚠️ DEGRADACIÓN: La latencia p95 superó los 2 segundos (${p95} ms). El servidor no colapsó, pero la experiencia de usuario se tornó inaceptable.`
    : rateLimitCount > 0
    ? `  ℹ️ BLOQUEO POR SEGURIDAD: Hubo ${rateLimitCount} peticiones rechazadas con código 429. Los middlewares de Rate Limiting o DDoS Shield detuvieron la carga antes de saturar el hardware.`
    : `  ✅ EXCELENTE: El backend soportó hasta ${maxVUs} usuarios concurrentes activos sin errores ni degradación crítica de latencia.`
}
================================================================================
`;

  return {
    stdout: summaryText,
    'k6-report-summary.json': JSON.stringify(data, null, 2),
  };
}
