import BaseService from '../../baseService.js';

class VariedadCafeService extends BaseService {
  /**
   * @param {import('../repository/VariedadCafeRepository.js').default} repository
   */
  constructor(repository) {
    super(repository, 'Variedad de Café');
  }
}

export default VariedadCafeService;
