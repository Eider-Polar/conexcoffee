import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    correo: {
      type: DataTypes.STRING(155),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nombre_completo: {
      type: DataTypes.STRING(155),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tipo_usuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'staff',
      validate: {
        isIn: [['staff', 'cliente_final']]
      }
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'activo'
    },
    webpush_endpoint: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    webpush_p256dh: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    webpush_auth: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (user) => {
        user.created_at = new Date();
        user.updated_at = new Date();
      },
      beforeUpdate: (user) => {
        user.updated_at = new Date();
      }
    }
  }
);

Usuario.associate = function(models) {
  Usuario.belongsToMany(models.ClienteTenant, {
    through: models.TenantUsuario,
    foreignKey: 'fk_usuario',
    otherKey: 'fk_tenant',
    as: 'tenants_staff'
  });

  Usuario.belongsToMany(models.ClienteTenant, {
    through: models.TenantCliente,
    foreignKey: 'fk_usuario',
    otherKey: 'fk_tenant',
    as: 'tenants_cliente'
  });
};

export default Usuario;
