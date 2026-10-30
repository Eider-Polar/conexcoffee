import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class HojaCatacionCva extends Model {}

HojaCatacionCva.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    sesion_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    catador_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    numero_muestra: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    puntuacion_catador_individual: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    conclusion_catador: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    firma_digital_catador: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_catacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'HojaCatacionCva',
    tableName: 'hojas_catacion_cva',
    schema: 'calidad',
    timestamps: false
  }
);

export default HojaCatacionCva;
