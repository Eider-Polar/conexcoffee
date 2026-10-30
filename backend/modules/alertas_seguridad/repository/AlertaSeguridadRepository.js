import BaseRepository from '../../baseRepository.js';
import AlertaSeguridad from '../AlertaSeguridad.js';

class AlertaSeguridadRepository extends BaseRepository {
  constructor() {
    super(AlertaSeguridad);
  }

  async findPendientes() {
    return await this.model.findAll({
      where: { resuelta: false },
      order: [['fecha_alerta', 'DESC']]
    });
  }
}

export default AlertaSeguridadRepository;
