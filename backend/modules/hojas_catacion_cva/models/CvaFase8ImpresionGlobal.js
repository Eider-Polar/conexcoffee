import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase8ImpresionGlobal extends Model {}

CvaFase8ImpresionGlobal.init(
  {
    hoja_catacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    calidad_agrado_global_valor: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    calidad_agrado_global_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 9
    },
    nota_balance: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'CvaFase8ImpresionGlobal',
    tableName: 'cva_fase_8_impresion_global',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase8ImpresionGlobal;
