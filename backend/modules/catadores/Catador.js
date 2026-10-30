import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class Catador extends Model {}

Catador.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    empresa_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    laboratorio_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    numero_documento: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    codigo_certificado_q_grader: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_vencimiento_q_grader: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    firma_digital_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    telefono_movil: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Catador',
    tableName: 'catadores',
    schema: 'personas',
    timestamps: false
  }
);

export default Catador;
