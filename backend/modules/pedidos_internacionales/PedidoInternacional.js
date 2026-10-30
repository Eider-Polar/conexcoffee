import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class PedidoInternacional extends Model {}

PedidoInternacional.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    codigo_pedido: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    comprador_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    contenedor_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    preoferta_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    formato: {
      type: DataTypes.ENUM(
        'CAJA_AL_VACIO_24KG',
        'SACO_25KG',
        'SACO_35KG',
        'SACO_70KG'
      ),
      allowNull: false
    },
    cantidad_unidades: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }
    },
    total_kilos: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0.01 }
    },
    precio_por_kilo_usd: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    monto_total_usd: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    porcentaje_anticipo: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 30.00
    },
    monto_anticipo_usd: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    porcentaje_saldo: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 70.00
    },
    monto_saldo_usd: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM(
        'PENDIENTE_ANTICIPO_30',
        'ANTICIPO_PAGADO_RESERVADO',
        'PENDIENTE_SALDO_70',
        'PAGADO_TOTAL_AUTORIZADO',
        'LOTE_SUSTITUIDO',
        'REEMBOLSADO',
        'CANCELADO'
      ),
      defaultValue: 'PENDIENTE_ANTICIPO_30'
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'PedidoInternacional',
    tableName: 'pedidos_internacionales',
    schema: 'finanzas',
    timestamps: false
  }
);

export default PedidoInternacional;
