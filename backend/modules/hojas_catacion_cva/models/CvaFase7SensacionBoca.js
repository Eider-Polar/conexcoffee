import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase7SensacionBoca extends Model {}

CvaFase7SensacionBoca.init(
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
    textura_cualidad: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
    calidad_agrado_valor: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    calidad_agrado_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    },
    nota: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'CvaFase7SensacionBoca',
    tableName: 'cva_fase_7_sensacion_boca',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase7SensacionBoca;
