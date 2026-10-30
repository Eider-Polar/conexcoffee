import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class VariedadCafe extends Model {}

VariedadCafe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    especie: {
      type: DataTypes.STRING(30),
      defaultValue: 'Coffea Arabica'
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    perfil_esperado_taza: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'VariedadCafe',
    tableName: 'variedades_cafe',
    schema: 'agronomia',
    timestamps: false
  }
);

export default VariedadCafe;
