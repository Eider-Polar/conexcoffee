import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class UsuarioSistema extends Model {}

UsuarioSistema.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    correo_electronico: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    hash_contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rol_principal: {
      type: DataTypes.ENUM(
        'ADMINISTRADOR',
        'EMPRESA_EXPORTADORA',
        'ASISTENTE_TECNICO',
        'CAFICULTOR',
        'LABORATORIO',
        'CATADOR',
        'BROKER',
        'COMPRADOR_INTERNACIONAL'
      ),
      allowNull: false
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    correo_verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    intentos_fallidos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bloqueado_hasta: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ultimo_acceso: {
      type: DataTypes.DATE,
      allowNull: true
    },
    creado_por_usuario_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'UsuarioSistema',
    tableName: 'usuarios_sistema',
    schema: 'acceso',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  }
);

export default UsuarioSistema;
