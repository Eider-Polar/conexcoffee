import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class EvaluacionFisica extends Model {}

EvaluacionFisica.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    codigo_analisis: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    etapa: {
      type: DataTypes.ENUM('FASE_1_FINCA_MUESTRA', 'FASE_2_TRILLADORA_DESTINO'),
      allowNull: false
    },
    preoferta_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    laboratorio_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    analista_nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fecha_analisis: {
      type: DataTypes.DATE,
      allowNull: false
    },
    peso_muestra_analizada_gramos: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    humedad_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    densidad_g_l: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    actividad_agua_aw: {
      type: DataTypes.DECIMAL(4, 3),
      allowNull: false
    },
    factor_rendimiento: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    malla_18_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0
    },
    malla_17_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0
    },
    malla_16_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0
    },
    malla_15_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0
    },
    malla_14_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0
    },
    menor_malla_14_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0
    },
    defectos_primer_grupo: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    defectos_segundo_grupo: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    es_conforme: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    motivo_no_conformidad: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    firma_digital_laboratorio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    documento_certificado_url: {
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
    modelName: 'EvaluacionFisica',
    tableName: 'evaluaciones_fisicas',
    schema: 'calidad',
    timestamps: false
  }
);

export default EvaluacionFisica;
