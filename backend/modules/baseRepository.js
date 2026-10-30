/**
 * BaseRepository - ConexCoffee
 * Capa de persistencia base que abstrae las operaciones CRUD con Sequelize,
 * soporte de paginación uniforme, ordenamiento y manejo de claves primarias UUID/Serial.
 */
class BaseRepository {
  /**
   * @param {import('sequelize').ModelStatic<any>} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Crear un nuevo registro
   */
  async create(data, options = {}) {
    return await this.model.create(data, options);
  }

  /**
   * Buscar un registro por clave primaria
   */
  async findById(id, options = {}) {
    return await this.model.findByPk(id, options);
  }

  /**
   * Buscar un único registro bajo condiciones
   */
  async findOne(options = {}) {
    return await this.model.findOne(options);
  }

  /**
   * Listar registros con paginación uniforme y metadatos
   */
  async findAll({ page = 1, limit = 20, where = {}, order, include = [], attributes, ...otherOptions } = {}) {
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    // Determinar campo de ordenamiento por defecto
    const defaultOrderField = this.model.rawAttributes.fecha_creacion
      ? 'fecha_creacion'
      : (this.model.rawAttributes.fecha_registro
        ? 'fecha_registro'
        : (this.model.rawAttributes.created_at
          ? 'created_at'
          : (this.model.primaryKeyAttributes?.[0] || 'id')));

    const queryOrder = order || [[defaultOrderField, 'DESC']];

    const result = await this.model.findAndCountAll({
      where,
      limit: limitNum,
      offset,
      order: queryOrder,
      include,
      attributes,
      ...otherOptions
    });

    const totalRecords = typeof result.count === 'number' 
      ? result.count 
      : (Array.isArray(result.count) ? result.count.length : 0);

    const totalPages = Math.ceil(totalRecords / limitNum);

    return {
      rows: result.rows,
      meta: {
        page: pageNum,
        limit: limitNum,
        totalRecords,
        totalPages
      }
    };
  }

  /**
   * Actualizar un registro por ID
   */
  async update(id, data, options = {}) {
    const pk = this.model.primaryKeyAttributes?.[0] || 'id';
    const [affected] = await this.model.update(data, {
      where: { [pk]: id },
      ...options
    });

    if (!affected) return null;
    return await this.findById(id);
  }

  /**
   * Eliminar un registro por ID
   */
  async delete(id, options = {}) {
    const pk = this.model.primaryKeyAttributes?.[0] || 'id';
    return await this.model.destroy({
      where: { [pk]: id },
      ...options
    });
  }

  /**
   * Contar registros bajo condiciones
   */
  async count(options = {}) {
    return await this.model.count(options);
  }
}

export default BaseRepository;
