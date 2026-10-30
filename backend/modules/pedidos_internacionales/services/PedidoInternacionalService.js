import BaseService from '../../baseService.js';

class PedidoInternacionalService extends BaseService {
  /**
   * @param {import('../repository/PedidoInternacionalRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Pedido Internacional');
  }

  async create(data, options = {}) {
    const year = new Date().getFullYear();
    const count = await this.repository.count();
    const codigo_pedido = data.codigo_pedido || `PED-${year}-${String(count + 1).padStart(4, '0')}`;

    const totalKilos = parseFloat(data.total_kilos);
    const precioKg = parseFloat(data.precio_por_kilo_usd);
    const montoTotal = data.monto_total_usd ? parseFloat(data.monto_total_usd) : (totalKilos * precioKg);

    const pctAnticipo = data.porcentaje_anticipo ? parseFloat(data.porcentaje_anticipo) : 30.00;
    const pctSaldo = data.porcentaje_saldo ? parseFloat(data.porcentaje_saldo) : 70.00;

    const montoAnticipo = data.monto_anticipo_usd ? parseFloat(data.monto_anticipo_usd) : ((montoTotal * pctAnticipo) / 100);
    const montoSaldo = data.monto_saldo_usd ? parseFloat(data.monto_saldo_usd) : (montoTotal - montoAnticipo);

    return await super.create(
      {
        ...data,
        codigo_pedido,
        monto_total_usd: montoTotal.toFixed(2),
        porcentaje_anticipo: pctAnticipo.toFixed(2),
        monto_anticipo_usd: montoAnticipo.toFixed(2),
        porcentaje_saldo: pctSaldo.toFixed(2),
        monto_saldo_usd: montoSaldo.toFixed(2)
      },
      options
    );
  }

  async cambiarEstado(id, nuevoEstado) {
    const pedido = await this.getById(id);
    return await pedido.update({ estado: nuevoEstado });
  }

  async getByComprador(compradorId) {
    return await this.repository.findByCompradorId(compradorId);
  }
}

export default PedidoInternacionalService;
