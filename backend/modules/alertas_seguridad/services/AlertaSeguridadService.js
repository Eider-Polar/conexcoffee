import BaseService from '../../baseService.js';

class AlertaSeguridadService extends BaseService {
  /**
   * @param {import('../repository/AlertaSeguridadRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Alerta de Seguridad');
  }

  async resolverAlerta(id, notaResolucion) {
    const alerta = await this.getById(id);
    return await alerta.update({
      resuelta: true,
      resolucion_nota: notaResolucion
    });
  }

  async getPendientes() {
    return await this.repository.findPendientes();
  }
}

export default AlertaSeguridadService;
