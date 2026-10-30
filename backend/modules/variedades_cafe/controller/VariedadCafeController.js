import BaseController from '../../baseController.js';
import VariedadCafeRepository from '../repository/VariedadCafeRepository.js';
import VariedadCafeService from '../services/VariedadCafeService.js';

class VariedadCafeController extends BaseController {
  constructor(service = new VariedadCafeService(new VariedadCafeRepository())) {
    super(service);
  }
}

export default VariedadCafeController;
