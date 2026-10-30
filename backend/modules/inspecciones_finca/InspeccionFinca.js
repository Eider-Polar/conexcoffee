import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class InspeccionFinca extends Model {}

InspeccionFinca.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    preoferta_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    asistente_tecnico_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    fecha_visita: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modo_offline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fecha_sincronizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    latitud_inspeccion: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitud_inspeccion: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    estibas_madera_presentes: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lugar_limpio_ventilado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    empaque_bolsa_hermetica: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tipo_empaque_hermetico: {
      type: DataTypes.STRING(50),
      defaultValue: 'GrainPro'
    },
    humedad_pergamino_porcentaje: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    temperatura_ambiente_c: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true
    },
    muestra_lab_extraida_gramos: {
      type: DataTypes.INTEGER,
      defaultValue: 1000
    },
    muestra_comercial_sellada_kg: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 5.00
    },
    codigo_precinto_muestra_comercial: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fotos_evidencia: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    resultado_inspeccion: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['CONFORME', 'NO_CONFORME', 'SUBSANABLE']]
      }
    },
    observaciones_tecnicas: {
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
    modelName: 'InspeccionFinca',
    tableName: 'inspecciones_finca',
    schema: 'cosechas',
    timestamps: false
  }
);

export default InspeccionFinca;
