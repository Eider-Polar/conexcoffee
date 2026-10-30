import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseRepository from '../baseRepository.js';
import BaseService from '../baseService.js';
import BaseController from '../baseController.js';
import { Router } from 'express';
import checkAuth from '../../middleware/checkAuth.js';
import { ensureUsuarioSistema } from '../../utils/ensureUsuarioSistema.js';

class EmpresaExportadora extends Model {}

EmpresaExportadora.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    usuario_id: { type: DataTypes.UUID, allowNull: false, unique: true },
    nit: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    razon_social: { type: DataTypes.STRING(150), allowNull: false },
    nombre_comercial: { type: DataTypes.STRING(150), allowNull: true },
    representante_legal: { type: DataTypes.STRING(120), allowNull: false },
    direccion: { type: DataTypes.TEXT, allowNull: true },
    telefono_contacto: { type: DataTypes.STRING(30), allowNull: false },
    codigo_exportador_dian: { type: DataTypes.STRING(50), allowNull: true },
    cuenta_bancaria_info: { type: DataTypes.JSONB, allowNull: true },
    porcentaje_comision_defecto: { type: DataTypes.DECIMAL(5, 2), defaultValue: 5.0 },
    estado_aprobacion: { type: DataTypes.STRING(25), defaultValue: 'APROBADA' },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'EmpresaExportadora',
    tableName: 'empresas_exportadoras',
    schema: 'personas',
    timestamps: false,
  }
);

class EmpresaExportadoraRepository extends BaseRepository {
  constructor() {
    super(EmpresaExportadora);
  }
}

class EmpresaExportadoraService extends BaseService {
  constructor(repo = new EmpresaExportadoraRepository()) {
    super(repo, 'Empresa Exportadora');
  }

  normalize(data = {}, isCreate = false) {
    const nombre_comercial = data.nombre_comercial || data.nombre || data.razon_social;
    const razon_social = data.razon_social || data.nombre || data.nombre_comercial || 'Empresa Exportadora S.A.S.';
    const nit = data.nit || (isCreate ? `NIT-${Date.now()}` : undefined);
    const representante_legal = data.representante_legal || data.representante || data.descripcion || 'Representante Legal';
    const telefono_contacto = data.telefono_contacto || data.telefono || (isCreate ? '3100000000' : undefined);
    const direccion =
      data.direccion ||
      [data.municipio, data.departamento].filter(Boolean).join(', ') ||
      undefined;

    const payload = { ...data };
    if (nombre_comercial) payload.nombre_comercial = nombre_comercial;
    if (razon_social) payload.razon_social = razon_social;
    if (nit) payload.nit = String(nit);
    if (representante_legal) payload.representante_legal = representante_legal;
    if (telefono_contacto) payload.telefono_contacto = String(telefono_contacto);
    if (direccion !== undefined) payload.direccion = direccion;
    delete payload.id;
    return payload;
  }

  async create(data, options = {}) {
    const usuario_id = await ensureUsuarioSistema(data, 'EMPRESA_EXPORTADORA');
    const payload = this.normalize({ ...data, usuario_id }, true);
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    return await super.update(id, payload, options);
  }
}

class EmpresaExportadoraController extends BaseController {
  constructor(service = new EmpresaExportadoraService()) {
    super(service);
  }
}

export const EmpresaExportadoraRouter = Router();
const controller = new EmpresaExportadoraController();
EmpresaExportadoraRouter.get('/', controller.getAll);
EmpresaExportadoraRouter.get('/:id', controller.getById);
EmpresaExportadoraRouter.post('/', checkAuth, controller.create);
EmpresaExportadoraRouter.put('/:id', checkAuth, controller.update);
EmpresaExportadoraRouter.delete('/:id', checkAuth, controller.delete);

export default EmpresaExportadora;
