import BaseService from '../../baseService.js';

class CatalogoErrorService extends BaseService {
  /**
   * @param {import('../repository/CatalogoErrorRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Código de Error del Catálogo');
  }

  async getByCodigo(codigo) {
    return await this.getById(codigo);
  }
}

export default CatalogoErrorService;
