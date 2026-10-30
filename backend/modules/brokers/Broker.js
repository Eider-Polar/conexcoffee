import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseRepository from '../baseRepository.js';
import BaseService from '../baseService.js';
import BaseController from '../baseController.js';
import { Router } from 'express';
import checkAuth from '../../middleware/checkAuth.js';
import { ensureUsuarioSistema } from '../../utils/ensureUsuarioSistema.js';

class Broker extends Model {}

Broker.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    usuario_id: { type: DataTypes.UUID, allowNull: false, unique: true },
    nombre_empresa: { type: DataTypes.STRING(150), allowNull: false },
    identificacion_fiscal_pais: { type: DataTypes.STRING(50), allowNull: false },
    pais_operacion: { type: DataTypes.STRING(60), allowNull: false },
    ciudad: { type: DataTypes.STRING(60), allowNull: false },
    direccion_bodega: { type: DataTypes.TEXT, allowNull: true },
    telefono_contacto: { type: DataTypes.STRING(30), allowNull: true },
    porcentaje_comision_split: { type: DataTypes.DECIMAL(5, 2), defaultValue: 5.0 },
    datos_bancarios_internacionales: { type: DataTypes.JSONB, allowNull: true },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'Broker',
    tableName: 'brokers',
    schema: 'personas',
    timestamps: false,
  }
);

class BrokerRepository extends BaseRepository {
  constructor() {
    super(Broker);
  }
}

class BrokerService extends BaseService {
  constructor(repo = new BrokerRepository()) {
    super(repo, 'Broker Internacional');
  }

  normalize(data = {}, isCreate = false) {
    const fullName = [
      data.primerNombre || data.primer_nombre || data.nombres,
      data.segundoNombre || data.segundo_nombre,
      data.primerApellido || data.primer_apellido || data.apellidos,
      data.segundoApellido || data.segundo_apellido,
    ]
      .filter(Boolean)
      .join(' ')
      .trim();

    const nombre_empresa = data.nombre_empresa || fullName || (isCreate ? 'Broker Internacional' : undefined);
    const identificacion_fiscal_pais =
      data.identificacion_fiscal_pais ||
      data.numeroIdentificacion ||
      data.numero_identificacion ||
      (isCreate ? `EIN-${Date.now()}` : undefined);
    const pais_operacion =
      data.pais_operacion || data.pais || data.departamento || (isCreate ? 'Estados Unidos' : undefined);
    const ciudad = data.ciudad || data.municipio || (isCreate ? 'Miami' : undefined);
    const direccion_bodega = data.direccion_bodega || data.direccion || (isCreate ? 'Bodega Principal' : undefined);
    const telefono_contacto = data.telefono_contacto || data.telefono || undefined;

    const payload = { ...data };
    if (nombre_empresa) payload.nombre_empresa = nombre_empresa;
    if (identificacion_fiscal_pais) payload.identificacion_fiscal_pais = String(identificacion_fiscal_pais);
    if (pais_operacion) payload.pais_operacion = pais_operacion;
    if (ciudad) payload.ciudad = ciudad;
    if (direccion_bodega !== undefined) payload.direccion_bodega = direccion_bodega;
    if (telefono_contacto) payload.telefono_contacto = String(telefono_contacto);
    delete payload.id;
    return payload;
  }

  async create(data, options = {}) {
    const usuario_id = await ensureUsuarioSistema(data, 'BROKER');
    const payload = this.normalize({ ...data, usuario_id }, true);
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    return await super.update(id, payload, options);
  }
}

class BrokerController extends BaseController {
  constructor(service = new BrokerService()) {
    super(service);
  }
}

export const BrokerRouter = Router();
const controller = new BrokerController();
BrokerRouter.get('/', checkAuth, controller.getAll);
BrokerRouter.get('/:id', checkAuth, controller.getById);
BrokerRouter.post('/', checkAuth, controller.create);
BrokerRouter.put('/:id', checkAuth, controller.update);
BrokerRouter.delete('/:id', checkAuth, controller.delete);

export default Broker;
