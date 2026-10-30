import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class Caficultor extends Model {}

Caficultor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    tipo_documento: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    numero_documento: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono_movil: {
      type: DataTypes.STRING(20),
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
    url_documento_identidad: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url_rut: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado_verificacion: {
      type: DataTypes.STRING(20),
      defaultValue: 'EN_REVISION'
    },
    observaciones_verificacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    billetera_saldo_cop: {
      type: DataTypes.DECIMAL(14, 2),
      defaultValue: 0.00
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Caficultor',
    tableName: 'caficultores',
    schema: 'personas',
    timestamps: false
  }
);

export default Caficultor;
