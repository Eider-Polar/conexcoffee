import { DomainError } from '../utils/DomainError.js';
import { ERROR_CATALOG } from '../utils/errorCatalog.js';

/**
 * BaseService - ConexCoffee
 * Capa de lógica de negocio base. Encapsula validaciones, orquesta repositorios
 * y dispara excepciones de dominio CC-XXXX estandarizadas.
 */
class BaseService {
  /**
   * @param {import('./baseRepository.js').default} repository
   * @param {string} entityName
   */
  constructor(repository, entityName = 'Recurso') {
    this.repository = repository;
    this.entityName = entityName;
  }

  /**
   * Obtener listado con paginación
   */
  async getAll(queryParams = {}) {
    const { page, limit, sort, ...filters } = queryParams;
    const result = await this.repository.findAll({
      page,
      limit,
      where: filters
    });

    return {
      data: result.rows,
      meta: result.meta
    };
  }

  /**
   * Obtener por ID con validación de existencia
   */
  async getById(id, options = {}) {
    const record = await this.repository.findById(id, options);
    if (!record) {
      throw new DomainError(
        ERROR_CATALOG.NOT_FOUND.code,
        `${this.entityName} no encontrado(a)`,
        `No se encontró ningún registro con ID: ${id}`,
        404
      );
    }
    return record;
  }

  /**
   * Crear un nuevo registro
   */
  async create(data, options = {}) {
    return await this.repository.create(data, options);
  }

  /**
   * Actualizar registro existente con validación previa
   */
  async update(id, data, options = {}) {
    await this.getById(id); // Valida que exista
    const updated = await this.repository.update(id, data, options);
    return updated;
  }

  /**
   * Eliminar un registro con validación previa
   */
  async delete(id, options = {}) {
    await this.getById(id); // Valida que exista
    const deletedCount = await this.repository.delete(id, options);
    return {
      eliminado: true,
      id,
      filasAfectadas: deletedCount
    };
  }
}

export default BaseService;
