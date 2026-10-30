import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class SacoCafe extends Model {}

SacoCafe.init(
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
    precinto_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    asistente_tecnico_vinculo_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    numero_saco_consecutivo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso_neto_kg: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 70.00,
      allowNull: false
    },
    contenedor_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    qr_interno_canjeado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fecha_canje_qr_interno: {
      type: DataTypes.DATE,
      allowNull: true
    },
    usuario_canje_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    ip_canje: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coordenadas_gps_canje: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    alerta_fraude_disparada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    estado_saco: {
      type: DataTypes.STRING(25),
      defaultValue: 'SELLADO_EN_FINCA',
      validate: {
        isIn: [['SELLADO_EN_FINCA', 'EN_TRILLADORA', 'EN_PUERTO', 'EMBARCADO', 'EN_BODEGA_DESTINO', 'ENTREGADO_Y_VERIFICADO', 'COMPROMETIDO']]
      }
    },
    fecha_vinculacion_finca: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'SacoCafe',
    tableName: 'sacos_cafe',
    schema: 'logistica',
    timestamps: false
  }
);

export default SacoCafe;
