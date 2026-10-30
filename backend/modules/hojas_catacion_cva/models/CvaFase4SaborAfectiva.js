import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase4SaborAfectiva extends Model {}

CvaFase4SaborAfectiva.init(
  {
    hoja_catacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    sabor_calidad_agrado: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    sabor_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    },
    sabor_residual_calidad_agrado: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    sabor_residual_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    }
  },
  {
    sequelize,
    modelName: 'CvaFase4SaborAfectiva',
    tableName: 'cva_fase_4_sabor_afectiva',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase4SaborAfectiva;
