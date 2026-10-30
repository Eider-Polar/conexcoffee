import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase6Dulzor extends Model {}

CvaFase6Dulzor.init(
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
    tipo_dulzor_nota: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'CvaFase6Dulzor',
    tableName: 'cva_fase_6_dulzor',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase6Dulzor;
