import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class Finca extends Model {}

Finca.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    caficultor_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    nombre_finca: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    departamento: {
      type: DataTypes.STRING(50),
      defaultValue: 'Cauca',
      allowNull: false
    },
    municipio: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    vereda: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    altitud_msnm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 800,
        max: 2800
      }
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    area_total_hectareas: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    area_protegida_hectareas: {
      type: DataTypes.DECIMAL(6, 2),
      defaultValue: 0.00
    },
    tipo_manejo: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isIn: [['ORGANICO', 'CONVENCIONAL', 'EN_TRANSICION']]
      }
    },
    certificaciones: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    historia_familiar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    foto_portada_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Finca',
    tableName: 'fincas',
    schema: 'agronomia',
    timestamps: false
  }
);

export default Finca;
