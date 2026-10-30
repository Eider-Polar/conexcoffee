import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class EvaluacionSensorialCva extends Model {}

EvaluacionSensorialCva.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    objetivo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    total_muestras: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    evaluacion_fisica_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    preoferta_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    catador_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    puntuacion_sca_global: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    estado_estandar: {
      type: DataTypes.STRING(50),
      defaultValue: 'EN_EVALUACION'
    },
    conclusion_catador: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aprobado_para_exportacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'EvaluacionSensorialCva',
    tableName: 'evaluaciones_sensoriales_cva',
    schema: 'calidad',
    timestamps: false
  }
);

export default EvaluacionSensorialCva;
