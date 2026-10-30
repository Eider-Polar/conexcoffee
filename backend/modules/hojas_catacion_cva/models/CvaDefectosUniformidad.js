import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/database.js';

class CvaDefectosUniformidad extends Model {}

CvaDefectosUniformidad.init(
  {
    hoja_catacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    tazas_no_uniformes_cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tazas_no_uniformes_total: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    tazas_no_uniformes_seleccionadas: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    tazas_defectuosas_cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tazas_defectuosas_total: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    tazas_defectuosas_seleccionadas: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    tipo_defecto: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    defecto_critico_detectado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'CvaDefectosUniformidad',
    tableName: 'cva_defectos_uniformidad',
    schema: 'calidad',
    timestamps: false
  }
);

export default CvaDefectosUniformidad;
