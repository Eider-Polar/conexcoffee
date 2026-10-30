import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class CatalogoError extends Model {}

CatalogoError.init(
  {
    codigo_error: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    accion_recomendada: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'CatalogoError',
    tableName: 'catalogo_errores',
    schema: 'auditoria',
    timestamps: false
  }
);

export default CatalogoError;
