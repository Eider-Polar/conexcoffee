import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaFase3SaborDescriptiva extends Model {}

CvaFase3SaborDescriptiva.init(
  {
    hoja_catacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    sabor_intensidad: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    sabor_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    },
    sabor_categoria_intensidad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sabor_residual_aftertaste_intensidad: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    sabor_residual_escala_maxima: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    },
    sabor_residual_categoria_intensidad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gustos_predominantes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
    descriptores_sabor: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'CvaFase3SaborDescriptiva',
    tableName: 'cva_fase_3_sabor_descriptiva',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaFase3SaborDescriptiva;
