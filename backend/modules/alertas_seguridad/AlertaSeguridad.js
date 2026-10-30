import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class AlertaSeguridad extends Model {}

AlertaSeguridad.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    codigo_error: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tipo_alerta: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    severidad: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isIn: [['BAJA', 'MEDIA', 'ALTA', 'CRITICA']]
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    referencia_entidad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    referencia_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    direccion_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coordenadas_gps: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    resuelta: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resolucion_nota: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_alerta: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'AlertaSeguridad',
    tableName: 'alertas_seguridad',
    schema: 'auditoria',
    timestamps: false
  }
);

export default AlertaSeguridad;
