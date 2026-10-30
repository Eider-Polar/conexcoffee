import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseRepository from '../baseRepository.js';
import BaseService from '../baseService.js';
import BaseController from '../baseController.js';
import { Router } from 'express';
import checkAuth from '../../middleware/checkAuth.js';
import { ensureUsuarioSistema } from '../../utils/ensureUsuarioSistema.js';

class Laboratorio extends Model {}

Laboratorio.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    usuario_id: { type: DataTypes.UUID, allowNull: false, unique: true },
    empresa_id: { type: DataTypes.UUID, allowNull: false },
    nit: { type: DataTypes.STRING(30), allowNull: false },
    nombre_laboratorio: { type: DataTypes.STRING(150), allowNull: false },
    direccion: { type: DataTypes.TEXT, allowNull: true },
    departamento: { type: DataTypes.STRING(50), defaultValue: 'Cauca' },
    municipio: { type: DataTypes.STRING(50), defaultValue: 'Popayán' },
    certificaciones: { type: DataTypes.JSONB, allowNull: true },
    responsable_tecnico: { type: DataTypes.STRING(120), allowNull: true },
    telefono_contacto: { type: DataTypes.STRING(30), allowNull: true },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'Laboratorio',
    tableName: 'laboratorios',
    schema: 'personas',
    timestamps: false,
  }
);

class LaboratorioRepository extends BaseRepository {
  constructor() {
    super(Laboratorio);
  }
}

class LaboratorioService extends BaseService {
  constructor(repo = new LaboratorioRepository()) {
    super(repo, 'Laboratorio de Calidad');
  }

  async resolveEmpresaId(empresa_id) {
    if (empresa_id) return empresa_id;
    const [rows] = await sequelize.query(`SELECT id FROM personas.empresas_exportadoras LIMIT 1`);
    return rows?.[0]?.id || null;
  }

  normalize(data = {}, isCreate = false) {
    const nombre_laboratorio = data.nombre_laboratorio || data.nombre || (isCreate ? 'Laboratorio de Calidad' : undefined);
    const nit = data.nit || (isCreate ? `NIT-LAB-${Date.now()}` : undefined);
    const telefono_contacto = data.telefono_contacto || data.telefono || undefined;
    const responsable_tecnico = data.responsable_tecnico || data.responsable || data.correo || 'Director de Calidad';
    let certificaciones = data.certificaciones;
    if (typeof certificaciones === 'string') {
      certificaciones = { iso: certificaciones, descripcion: certificaciones };
    }

    const payload = { ...data };
    if (nombre_laboratorio) payload.nombre_laboratorio = nombre_laboratorio;
    if (nit) payload.nit = String(nit);
    if (telefono_contacto) payload.telefono_contacto = String(telefono_contacto);
    if (responsable_tecnico) payload.responsable_tecnico = responsable_tecnico;
    if (certificaciones !== undefined) payload.certificaciones = certificaciones;
    delete payload.id;
    return payload;
  }

  async create(data, options = {}) {
    const usuario_id = await ensureUsuarioSistema(data, 'LABORATORIO');
    const empresa_id = await this.resolveEmpresaId(data.empresa_id);
    const payload = this.normalize({ ...data, usuario_id, empresa_id }, true);
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    return await super.update(id, payload, options);
  }
}

class LaboratorioController extends BaseController {
  constructor(service = new LaboratorioService()) {
    super(service);
  }
}

export const LaboratorioRouter = Router();
const controller = new LaboratorioController();
LaboratorioRouter.get('/', checkAuth, controller.getAll);
LaboratorioRouter.get('/:id', checkAuth, controller.getById);
LaboratorioRouter.post('/', checkAuth, controller.create);
LaboratorioRouter.put('/:id', checkAuth, controller.update);
LaboratorioRouter.delete('/:id', checkAuth, controller.delete);

export default Laboratorio;
