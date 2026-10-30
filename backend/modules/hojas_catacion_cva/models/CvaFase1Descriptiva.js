import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase1Descriptiva extends Model {}

CvaFase1Descriptiva.init(
  {
    hoja_catacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    nivel_tueste_valor: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    nivel_tueste_nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nivel_tueste_termino_ingles: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fragancia_intensidad: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    fragancia_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    },
    fragancia_categoria_intensidad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aroma_intensidad: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    aroma_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    },
    aroma_categoria_intensidad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    descriptores_seleccionados: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'CvaFase1Descriptiva',
    tableName: 'cva_fase_1_descriptiva',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase1Descriptiva;
