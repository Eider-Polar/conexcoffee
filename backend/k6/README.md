# Guía de Pruebas de Sobrecarga y Capacidad Máxima (k6) - ConexCoffee Backend

Esta suite de pruebas utiliza **k6** para ejecutar una prueba de tipo **Breakpoint / Stress Testing** (Prueba de Rotura y Límite de Capacidad). El objetivo es someter al backend a una carga creciente de usuarios activos concurrentes para identificar el punto exacto en el que el servidor se degrada o colapsa.

---

## ⚠️ Paso Previo Crítico: Configuración del Backend para la Prueba

Tu backend de ConexCoffee incluye middlewares de seguridad perimetral activos por defecto:
1. **`ddosShield`** (`middleware/ddosShield.js`): Bloquea cualquier IP que supere **40 peticiones en 10 segundos**.
2. **`generalLimiter`** (`middleware/rateLimiter.js`): Bloquea tras **100 peticiones en 15 minutos**.
3. **`Sequelize Logging`** (`config/database.js`): Imprime cada query SQL en terminal. A alta concurrencia, la salida de consola en Node.js bloquea el *Event Loop*.

> **IMPORTANTE:** Si ejecutas k6 con estos límites normales, las peticiones serán bloqueadas con error **`429 Too Many Requests`** a las pocas decenas de usuarios. Eso medirá la efectividad del firewall, pero **no** la capacidad real de tu hardware, base de datos y Node.js.

### Cómo preparar el backend para medir la capacidad real del servidor:

En tu archivo `.env` (o en tu terminal al arrancar el servidor en modo test):
```env
# Relajar o desactivar límites temporalmente para la prueba de estrés:
RATE_LIMIT_MAX_REQUESTS=500000
DDOS_MAX_REQUESTS_WINDOW=500000
NODE_ENV=production   # O apagar console.log de Sequelize para evitar saturar el Event Loop
```

---

## 🚀 Comandos de Ejecución

Asegúrate de que el backend esté corriendo en otra terminal (`npm run dev` o `npm start`).

### 1. Prueba rápida de verificación (20 VUs durante 20s):
```bash
npm run test:stress:quick
```
O directamente con k6:
```bash
k6 run --vus 20 --duration 20s k6/stress-test.js
```

### 2. Prueba completa de sobrecarga y punto de quiebre (hasta 800 usuarios concurrentes):
```bash
npm run test:stress
```

### 3. 🔥 Prueba de Estrés Multirrol End-to-End (200 Usuarios Reales Creando Datos):
Crea automáticamente 200 usuarios concurrentes, los registra, loguea con JWT y ejecuta flujos completos de cada rol (creando fincas, consultando variedades, sesiones, hojas CVA, precintos QR, auditoría, etc.):
```bash
npm run test:stress:e2e
```
*(O verificación rápida de 10 usuarios durante 15 segundos:)*
```bash
npm run test:stress:e2e:quick
```

### 4. Prueba personalizada con límite específico de usuarios (ej. 1500 VUs):
```bash
k6 run --stage 30s:50,1m:200,2m:500,2m:1000,2m:1500,1m:0 k6/stress-test.js
```

---

## 📊 ¿Cómo saber cuántos usuarios activos aguanta tu backend?

Al finalizar la prueba, k6 te mostrará un resumen detallado y guardará `k6-report-summary.json`. Revisa los siguientes indicadores clave:

### 1. El "Punto de Quiebre" (Breaking Point)
Observa en qué etapa los gráficos de k6 muestran:
- **Latencia `http_req_duration (p95)` supera los 1,500 ms – 2,000 ms**: El servidor sigue vivo, pero las peticiones tardan demasiado. Este es el **límite de confort de usuarios activos**.
- **`http_req_failed` supera el 5% o aparecen errores `500 / 502 / 504 / ECONNRESET`**: El servidor o PostgreSQL agotaron su memoria, CPU o conexiones disponibles. Los usuarios en ese momento indican la **capacidad máxima absoluta**.

### 2. Cuellos de Botella Habituales y Cómo Escalarlos:
| Síntoma en k6 | Causa Común | Solución en ConexCoffee |
| :--- | :--- | :--- |
| Errores `SequelizeConnectionAcquireTimeoutError` | Pool de PostgreSQL saturado | En `config/database.js`, aumentar `pool.max: 30` o `50` (según `max_connections` de Postgres). |
| Latencia muy alta con CPU baja | I/O de consola en terminal | Cambiar `NODE_ENV=production` para apagar logs SQL en tiempo real. |
| Errores `429 Too Many Requests` | Rate Limiter o DDoS Shield activos | Incrementar `RATE_LIMIT_MAX_REQUESTS` en `.env`. |
| CPU al 100% en Node.js | Single-thread de Node saturado | Levantar Node con clúster o PM2 (`pm2 start index.js -i max`) para usar todos los núcleos del CPU. |
