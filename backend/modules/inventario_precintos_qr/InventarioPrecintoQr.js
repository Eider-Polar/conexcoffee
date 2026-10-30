import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class InventarioPrecintoQr extends Model {}

InventarioPrecintoQr.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    empresa_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    asistente_tecnico_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    codigo_lote_fabricacion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    codigo_suncho_precinto: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    token_qr_externo: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    token_qr_interno: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    url_publica_trazabilidad: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM(
        'EN_BODEGA_EMPRESA',
        'EN_CUSTODIA_TECNICO',
        'VINCULADO_A_SACO',
        'DANADO_ANULADO'
      ),
      defaultValue: 'EN_BODEGA_EMPRESA'
    },
    fecha_entrega_tecnico: {
      type: DataTypes.DATE,
      allowNull: true
    },
    motivo_anulacion: {
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
    modelName: 'InventarioPrecintoQr',
    tableName: 'inventario_precintos_qr',
    schema: 'logistica',
    timestamps: false
  }
);

export default InventarioPrecintoQr;
