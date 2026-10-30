import { sequelize } from '../../../config/database.js';
import ClienteTenant from '../../clientes_tenants/ClienteTenant.js';
import TenantUsuario from '../../tenant_usuarios/TenantUsuario.js';
import TenantCliente from '../../tenant_clientes/TenantCliente.js';
import BaseRepository from '../../baseRepository.js';
import models from '../../index.js';

const { Usuario } = models;

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  async findByCorreo(correo) {
    const { SaasPlan, PagoEmpresaSuscripcion } = models;
    const userInstance = await this.model.findOne({
      where: { correo: correo.trim().toLowerCase() }
    });
    if (!userInstance) return null;

    const user = userInstance.toJSON();

    const [staffRelations, clienteRelations] = await Promise.all([
      TenantUsuario.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'fk_plan_actual', 'estado'],
          include: [
            { model: SaasPlan, as: 'plan_actual', attributes: ['id', 'nombre', 'precio_mensual_cop'] },
            { model: PagoEmpresaSuscripcion, as: 'pagos', attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at'] }
          ]
        }]
      }),
      TenantCliente.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'fk_plan_actual', 'estado'],
          include: [
            { model: SaasPlan, as: 'plan_actual', attributes: ['id', 'nombre', 'precio_mensual_cop'] },
            { model: PagoEmpresaSuscripcion, as: 'pagos', attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at'] }
          ]
        }]
      })
    ]);

    user.tenants_staff = staffRelations.map(r => r.tenant).filter(Boolean);
    user.tenants_cliente = clienteRelations.map(r => r.tenant).filter(Boolean);

    return this.sanitizeUser(user);
  }

  async findByUuid(uuid) {
    const { SaasPlan, PagoEmpresaSuscripcion } = models;
    const userInstance = await this.model.findOne({
      where: { uuid }
    });
    if (!userInstance) return null;

    const user = userInstance.toJSON();

    const [staffRelations, clienteRelations] = await Promise.all([
      TenantUsuario.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'fk_plan_actual', 'estado'],
          include: [
            { model: SaasPlan, as: 'plan_actual', attributes: ['id', 'nombre', 'precio_mensual_cop'] },
            { model: PagoEmpresaSuscripcion, as: 'pagos', attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at'] }
          ]
        }]
      }),
      TenantCliente.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'fk_plan_actual', 'estado'],
          include: [
            { model: SaasPlan, as: 'plan_actual', attributes: ['id', 'nombre', 'precio_mensual_cop'] },
            { model: PagoEmpresaSuscripcion, as: 'pagos', attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at'] }
          ]
        }]
      })
    ]);

    user.tenants_staff = staffRelations.map(r => r.tenant).filter(Boolean);
    user.tenants_cliente = clienteRelations.map(r => r.tenant).filter(Boolean);

    return this.sanitizeUser(user);
  }

  sanitizeUser(user) {
    if (!user) return null;
    const data = typeof user.toJSON === 'function' ? user.toJSON() : (typeof user.get === 'function' ? user.get({ plain: true }) : user);
    const { password_hash, ...safeUser } = data;
    
    const tenant = safeUser.tenants_staff?.[0] || safeUser.tenants_cliente?.[0] || null;
    safeUser.tenantId = tenant?.id || null;
    safeUser.uuid_tenant = tenant?.uuid || null;
    safeUser.nombre_comercial = tenant?.nombre_comercial || null;
    safeUser.empresa_nombre = tenant?.nombre_comercial || null;
    safeUser.tenantNombre = tenant?.nombre_comercial || null;
    safeUser.plan = tenant?.plan_actual?.nombre || 'Plan Básico';
    safeUser.plan_nombre = tenant?.plan_actual?.nombre || 'Plan Básico';
    
    if (tenant?.pagos && Array.isArray(tenant.pagos) && tenant.pagos.length > 0) {
      const pagosOrdenados = [...tenant.pagos].sort(
        (a, b) => new Date(b.fecha_proximo_pago || b.created_at) - new Date(a.fecha_proximo_pago || a.created_at)
      );
      const ultimoPago = pagosOrdenados[0];
      if (ultimoPago && ultimoPago.fecha_proximo_pago) {
        const fechaObj = new Date(ultimoPago.fecha_proximo_pago);
        if (!isNaN(fechaObj.getTime())) {
          safeUser.fecha_proximo_pago = fechaObj.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          safeUser.fecha_proximo_pago_raw = ultimoPago.fecha_proximo_pago;
        }
      }
    }
    
    return safeUser;
  }

  async findUserRawByCorreo(correo) {
    return await this.model.findOne({
      where: { correo: correo.trim().toLowerCase() }
    });
  }

  async findUserRawWithTenantsByCorreo(correo) {
    const { TipoNegocio, SaasPlan, PagoEmpresaSuscripcion } = models;
    const userInstance = await this.model.findOne({
      where: { correo: correo.trim().toLowerCase() }
    });
    if (!userInstance) return null;

    const user = userInstance.toJSON();

    const [staffRelations, clienteRelations] = await Promise.all([
      TenantUsuario.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'slug_subdominio', 'dominio_personalizado', 'fk_tipo_negocio', 'fk_plan_actual', 'estado'],
          include: [
            {
              model: TipoNegocio,
              as: 'tipo_negocio',
              attributes: ['id', 'codigo', 'identificador_sistema', 'nombre']
            },
            {
              model: SaasPlan,
              as: 'plan_actual',
              attributes: ['id', 'nombre', 'precio_mensual_cop']
            },
            {
              model: PagoEmpresaSuscripcion,
              as: 'pagos',
              attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at']
            }
          ]
        }]
      }),
      TenantCliente.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'slug_subdominio', 'dominio_personalizado', 'fk_tipo_negocio', 'fk_plan_actual', 'estado'],
          include: [
            {
              model: TipoNegocio,
              as: 'tipo_negocio',
              attributes: ['id', 'codigo', 'identificador_sistema', 'nombre']
            },
            {
              model: SaasPlan,
              as: 'plan_actual',
              attributes: ['id', 'nombre', 'precio_mensual_cop']
            },
            {
              model: PagoEmpresaSuscripcion,
              as: 'pagos',
              attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at']
            }
          ]
        }]
      })
    ]);

    user.tenants_staff = staffRelations.map(r => r.tenant).filter(Boolean);
    user.tenants_cliente = clienteRelations.map(r => r.tenant).filter(Boolean);

    return user;
  }

  async findById(id) {
    const { SaasPlan, PagoEmpresaSuscripcion } = models;
    const userInstance = await this.model.findByPk(id);
    if (!userInstance) return null;

    const user = userInstance.toJSON();

    const [staffRelations, clienteRelations] = await Promise.all([
      TenantUsuario.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'fk_plan_actual', 'estado'],
          include: [
            { model: SaasPlan, as: 'plan_actual', attributes: ['id', 'nombre', 'precio_mensual_cop'] },
            { model: PagoEmpresaSuscripcion, as: 'pagos', attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at'] }
          ]
        }]
      }),
      TenantCliente.findAll({
        where: { fk_usuario: user.id },
        include: [{
          model: ClienteTenant,
          as: 'tenant',
          attributes: ['id', 'uuid', 'nombre_comercial', 'fk_plan_actual', 'estado'],
          include: [
            { model: SaasPlan, as: 'plan_actual', attributes: ['id', 'nombre', 'precio_mensual_cop'] },
            { model: PagoEmpresaSuscripcion, as: 'pagos', attributes: ['id', 'pago', 'fecha_pago', 'fecha_proximo_pago', 'medio_pago', 'created_at'] }
          ]
        }]
      })
    ]);

    user.tenants_staff = staffRelations.map(r => r.tenant).filter(Boolean);
    user.tenants_cliente = clienteRelations.map(r => r.tenant).filter(Boolean);

    return this.sanitizeUser(user);
  }

  async findAll(limit = 50, offset = 0) {
    const orderField = this.model.rawAttributes.createdAt 
      ? 'createdAt' 
      : (this.model.rawAttributes.fecha_registro ? 'fecha_registro' : 'id');

    const result = await this.model.findAndCountAll({
      limit,
      offset,
      order: [[orderField, 'DESC']]
    });

    const rows = result.rows;
    if (rows.length === 0) {
      return {
        rows: [],
        total: result.count,
        limit,
        offset
      };
    }

    const userIds = rows.map(u => u.id);

    const [tenantUsuarios, tenantClientes] = await Promise.all([
      TenantUsuario.findAll({
        where: { fk_usuario: userIds },
        include: [
          {
            model: ClienteTenant,
            as: 'tenant',
            attributes: ['id', 'nombre_comercial']
          }
        ]
      }),
      TenantCliente.findAll({
        where: { fk_usuario: userIds },
        include: [
          {
            model: ClienteTenant,
            as: 'tenant',
            attributes: ['id', 'nombre_comercial']
          }
        ]
      })
    ]);

    const rowsWithTenants = rows.map(userInstance => {
      const user = userInstance.toJSON();
      
      const staffRelations = tenantUsuarios.filter(tu => tu.fk_usuario === user.id);
      const clienteRelations = tenantClientes.filter(tc => tc.tc_usuario === user.id || tc.fk_usuario === user.id);

      user.tenants_staff = staffRelations.map(r => r.tenant).filter(Boolean);
      user.tenants_cliente = clienteRelations.map(r => r.tenant).filter(Boolean);

      return user;
    });

    return {
      rows: rowsWithTenants,
      total: result.count,
      limit,
      offset
    };
  }
}

export default UsuarioRepository;
