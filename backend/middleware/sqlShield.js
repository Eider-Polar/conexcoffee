import { ErrorControlado } from "../utils/ErrorControlado.js";

// Patrones de inyección SQL muy específicos para evitar falsos positivos en texto común
const SQL_INJECTION_PATTERNS = [
  /(\bUNION\s+(ALL\s+)?SELECT\b)/i,
  /(\bSELECT\s+.*\s+FROM\b)/i,
  /(\bINSERT\s+INTO\s+.*\s+VALUES\b)/i,
  /(\bUPDATE\s+.*\s+SET\b)/i,
  /(\bDELETE\s+FROM\s+.*\s+WHERE\b)/i,
  /(\bDROP\s+(TABLE|DATABASE|INDEX|VIEW)\b)/i,
  /(\bTRUNCATE\s+TABLE\b)/i,
  /(\bALTER\s+TABLE\b)/i,
  /(--)/,                        // Comentarios de línea SQL
  /(\/\*|\*\/)/,                 // Comentarios de bloque SQL
  /(\b(OR|AND)\b\s+['"]?([^'"]+)['"]?\s*=\s*['"]?(\3)['"]?)/i, // OR 1=1, OR 'a'='a'
  /('|"|;)\s*(OR|AND)\s+['"]?([^'"]+)['"]?\s*=\s*['"]?(\3)['"]?/i, // ' OR '1'='1
  /(\bEXEC\s+char\b)/i,
  /(\bCAST\s*\(.*AS\s+VARCHAR\b)/i
];

const checkValue = (value) => {
  if (typeof value === 'string') {
    for (const pattern of SQL_INJECTION_PATTERNS) {
      if (pattern.test(value)) {
        return true;
      }
    }
  } else if (typeof value === 'object' && value !== null) {
    for (const key of Object.keys(value)) {
      if (checkValue(value[key])) {
        return true;
      }
    }
  }
  return false;
};

const sqlShield = (req, res, next) => {
  try {
    // Comprobar parámetros de ruta, query y cuerpo
    if (checkValue(req.body) || checkValue(req.query) || checkValue(req.params)) {
      throw new ErrorControlado("Entrada maliciosa detectada (SQL Injection Blocked)", 400);
    }
    next();
  } catch (error) {
    if (error instanceof ErrorControlado) {
      return res.status(error.status).json({ success: false, msg: error.message });
    }
    next(error);
  }
};

export default sqlShield;
