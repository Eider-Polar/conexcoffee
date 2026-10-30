import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ErrorControlado } from '../utils/ErrorControlado.js';
import SuperAdminRepository from '../modules/super_admins/repository/SuperAdminRepository.js';

const superAdminRepo = new SuperAdminRepository();

export default async function checkVpsApiKey(req, res, next) {
  try {
    const apiKey = req.headers['x-api-key'];
    const systemApiKey = process.env.VPS_API_KEY;

    // 1. Validar si la petición viene del script de la VPS con la API Key correcta
    if (systemApiKey && apiKey === systemApiKey) {
      return next();
    }

    // 2. Fallback: Permitir también si es un SuperAdmin autenticado con JWT (ej: desde el panel web)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded && decoded.role === 'superadmin') {
        const admin = await superAdminRepo.findById(decoded.id);
        if (admin) {
          req.admin = admin;
          return next();
        }
      }
    }

    throw new ErrorControlado('Acceso denegado: API Key de VPS inválida o token no autorizado', 401);
  } catch (error) {
    next(error);
  }
}
