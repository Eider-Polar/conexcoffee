import BaseService from '../../baseService.js';
import { sequelize } from '../../../config/database.js';

const IS_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class ContenedorVirtualService extends BaseService {
  /**
   * @param {import('../repository/ContenedorVirtualRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Contenedor Virtual Marítimo');
  }

  async resolveRefs(data = {}) {
    let empresa_exportadora_id =
      data.empresa_exportadora_id && IS_UUID.test(String(data.empresa_exportadora_id))
        ? data.empresa_exportadora_id
        : null;
    if (!empresa_exportadora_id) {
      const [eRows] = await sequelize.query(`SELECT id FROM personas.empresas_exportadoras LIMIT 1`);
      empresa_exportadora_id = eRows?.[0]?.id || null;
    }

    let broker_destino_id =
      data.broker_destino_id && IS_UUID.test(String(data.broker_destino_id))
        ? data.broker_destino_id
        : null;
    if (!broker_destino_id) {
      const [bRows] = await sequelize.query(`SELECT id FROM personas.brokers LIMIT 1`);
      broker_destino_id = bRows?.[0]?.id || null;
    }

    return { empresa_exportadora_id, broker_destino_id };
  }

  normalize(data = {}, isCreate = false) {
    const codigo_contenedor =
      data.codigo_contenedor || data.codigo || (isCreate ? `CONT-${Date.now()}` : undefined);
    const pais_destino = data.pais_destino || data.paisDestino || (isCreate ? 'Estados Unidos' : undefined);
    const puerto_embarque_colombia =
      data.puerto_embarque_colombia || data.pais_origen || (isCreate ? 'Buenaventura' : undefined);
    const puerto_destino =
      data.puerto_destino || data.ciudad_destino || data.pais_destino || (isCreate ? 'Miami' : undefined);
    const rawCap = data.capacidad_total_kg ?? data.totalKg;
    const capacidad_total_kg =
      rawCap !== undefined ? parseFloat(rawCap) || 20000 : isCreate ? 20000 : undefined;
    const rawRes = data.kilos_reservados ?? data.cantidad_cafe_kg;
    const kilos_reservados =
      rawRes !== undefined ? parseFloat(rawRes) || 0 : isCreate ? 0 : undefined;
    const fecha_cierre_reservas =
      data.fecha_cierre_reservas || data.fecha_cierre_estimada || (isCreate ? '2026-12-15' : undefined);
    const fecha_estimada_zarpe =
      data.fecha_estimada_zarpe || data.fecha_envio || data.fecha_cierre_estimada || (isCreate ? '2026-12-30' : undefined);

    const validEstados = [
      'ABIERTO_RECOLECCION',
      'LLENO_CERRADO',
      'EN_PREPARACION_PUERTO',
      'ZARPADO_EN_TRANSITO',
      'EN_PUERTO_DESTINO',
      'EN_BODEGA_BROKER',
      'LIQUIDADO_FINALIZADO',
    ];
    let estado = validEstados.includes(data.estado) ? data.estado : undefined;
    if (!estado && isCreate) estado = 'ABIERTO_RECOLECCION';

    const payload = { ...data };
    if (codigo_contenedor) payload.codigo_contenedor = codigo_contenedor;
    if (pais_destino) payload.pais_destino = pais_destino;
    if (puerto_embarque_colombia) payload.puerto_embarque_colombia = puerto_embarque_colombia;
    if (puerto_destino) payload.puerto_destino = puerto_destino;
    if (capacidad_total_kg !== undefined) payload.capacidad_total_kg = capacidad_total_kg;
    if (kilos_reservados !== undefined) payload.kilos_reservados = kilos_reservados;
    if (fecha_cierre_reservas) payload.fecha_cierre_reservas = fecha_cierre_reservas;
    if (fecha_estimada_zarpe) payload.fecha_estimada_zarpe = fecha_estimada_zarpe;
    if (estado) payload.estado = estado;
    delete payload.id;
    return payload;
  }

  async create(data, options = {}) {
    const refs = await this.resolveRefs(data);
    const payload = this.normalize({ ...data, ...refs }, true);
    return await super.create(payload, options);
  }

  async update(id, data, options = {}) {
    const payload = this.normalize(data, false);
    return await super.update(id, payload, options);
  }

  async autorizarZarpe(id, numeroBl = null) {
    const contenedor = await this.getById(id);

    return await contenedor.update({
      estado: 'ZARPADO_EN_TRANSITO',
      numero_bl_maritimo: numeroBl || contenedor.numero_bl_maritimo,
      fecha_real_zarpe: new Date()
    });
  }

  async getDisponibles() {
    return await this.repository.findDisponibles();
  }
}

export default ContenedorVirtualService;
