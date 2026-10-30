import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseRepository from '../baseRepository.js';
import BaseService from '../baseService.js';
import BaseController from '../baseController.js';
import { Router } from 'express';
import checkAuth from '../../middleware/checkAuth.js';
import { ensureUsuarioSistema } from '../../utils/ensureUsuarioSistema.js';

class CompradorInternacional extends Model {}

CompradorInternacional.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    usuario_id: { type: DataTypes.UUID, allowNull: false, unique: true },
    tipo_entidad: { type: DataTypes.STRING(50), defaultValue: 'TOSTADOR_ARTESANAL' },
    nombre_empresa: { type: DataTypes.STRING(150), allowNull: false },
    identificacion_tributaria: { type: DataTypes.STRING(50), allowNull: false },
    pais_destino: { type: DataTypes.STRING(60), allowNull: false },
    ciudad: { type: DataTypes.STRING(60), allowNull: false },
    direccion_entrega: { type: DataTypes.TEXT, allowNull: false },
    telefono_contacto: { type: DataTypes.STRING(30), allowNull: true },
    sitio_web: { type: DataTypes.STRING(150), allowNull: true },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'CompradorInternacional',
    tableName: 'compradores_internacionales',
    schema: 'personas',
    timestamps: false,
  }
);

class CompradorInternacionalRepository extends BaseRepository {
  constructor() {
    super(CompradorInternacional);
  }
}

class CompradorInternacionalService extends BaseService {
  constructor(repo = new CompradorInternacionalRepository()) {
    super(repo, 'Comprador Internacional');
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

    const nombre_empresa =
      data.nombre_empresa ||
      data.empresaCompradora ||
      data.empresa ||
      fullName ||
      (isCreate ? 'Comprador Internacional' : undefined);
    const identificacion_tributaria =
      data.identificacion_tributaria ||
      data.numeroIdentificacion ||
      data.numero_identificacion ||
      (isCreate ? `TAX-${Date.now()}` : undefined);
    const pais_destino = data.pais_destino || data.pais || (isCreate ? 'Estados Unidos' : undefined);
    const ciudad = data.ciudad || (isCreate ? 'Miami' : undefined);
    const direccion_entrega =
      data.direccion_entrega || data.direccion || (isCreate ? `${ciudad}, ${pais_destino}` : undefined);
    const telefono_contacto = data.telefono_contacto || data.telefono || undefined;
    const sitio_web = data.sitio_web || fullName || undefined;

    const payload = { ...data };
    if (nombre_empresa) payload.nombre_empresa = nombre_empresa;
    if (identificacion_tributaria) payload.identificacion_tributaria = String(identificacion_tributaria);
    if (pais_destino) payload.pais_destino = pais_destino;
    if (ciudad) payload.ciudad = ciudad;
    if (direccion_entrega) payload.direccion_entrega = direccion_entrega;
    if (telefono_contacto) payload.telefono_contacto = String(telefono_contacto);
    if (sitio_web) payload.sitio_web = sitio_web;
    delete payload.id;
    return payload;
  }

  async create(data, options = {}) {
    const usuario_id = await ensureUsuarioSistema(data, 'COMPRADOR_INTERNACIONAL');
    const payload = this.normalize({ ...data, usuario_id }, true);
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    return await super.update(id, payload, options);
  }
}

class CompradorInternacionalController extends BaseController {
  constructor(service = new CompradorInternacionalService()) {
    super(service);
  }
}

export const CompradorInternacionalRouter = Router();
const controller = new CompradorInternacionalController();
CompradorInternacionalRouter.get('/', checkAuth, controller.getAll);
CompradorInternacionalRouter.get('/:id', checkAuth, controller.getById);
CompradorInternacionalRouter.post('/', checkAuth, controller.create);
CompradorInternacionalRouter.put('/:id', checkAuth, controller.update);
CompradorInternacionalRouter.delete('/:id', checkAuth, controller.delete);

export default CompradorInternacional;
