import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase2Afectiva extends Model {}

CvaFase2Afectiva.init(
  {
    hoja_catacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    fragancia_calidad_agrado: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    fragancia_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    },
    aroma_calidad_agrado: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    aroma_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    }
  },
  {
    sequelize,
    modelName: 'CvaFase2Afectiva',
    tableName: 'cva_fase_2_afectiva',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase2Afectiva;
