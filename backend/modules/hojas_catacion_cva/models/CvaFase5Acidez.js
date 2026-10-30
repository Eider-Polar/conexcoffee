import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase5Acidez extends Model {}

CvaFase5Acidez.init(
  {
    hoja_catacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    intensidad_valor: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    intensidad_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    },
    categoria_intensidad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    calidad_agrado_valor: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    calidad_agrado_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    },
    tipo_acidez_nota: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'CvaFase5Acidez',
    tableName: 'cva_fase_5_acidez',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase5Acidez;
