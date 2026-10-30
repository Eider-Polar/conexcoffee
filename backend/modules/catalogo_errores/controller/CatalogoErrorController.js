import BaseController from '../../baseController.js';
import CatalogoErrorRepository from '../repository/CatalogoErrorRepository.js';
import CatalogoErrorService from '../services/CatalogoErrorService.js';

class CatalogoErrorController extends BaseController {
  constructor(service = new CatalogoErrorService(new CatalogoErrorRepository())) {
    super(service);
  }
}

export default CatalogoErrorController;
