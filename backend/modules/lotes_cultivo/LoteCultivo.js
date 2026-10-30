import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class LoteCultivo extends Model {}

LoteCultivo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    finca_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    variedad_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre_identificador: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    numero_arboles: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    edad_arboles_anos: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true
    },
    tipo_sombra: {
      type: DataTypes.STRING(30),
      allowNull: true,
      validate: {
        isIn: [['TOTAL', 'PARCIAL', 'A_LIBRE_EXPOSICION']]
      }
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'LoteCultivo',
    tableName: 'lotes_cultivo',
    schema: 'agronomia',
    timestamps: false
  }
);

export default LoteCultivo;
