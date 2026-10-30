import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class TrazabilidadEscaneo extends Model {}

TrazabilidadEscaneo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    saco_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    tipo_qr: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isIn: [['QR_EXTERNO', 'QR_INTERNO']]
      }
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    rol_detectado: {
      type: DataTypes.STRING(35),
      defaultValue: 'PUBLICO_EXTERNO',
      allowNull: false
    },
    direccion_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    agente_usuario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    es_escaneo_valido: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_escaneo: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'TrazabilidadEscaneo',
    tableName: 'trazabilidad_escaneos',
    schema: 'logistica',
    timestamps: false
  }
);

export default TrazabilidadEscaneo;
