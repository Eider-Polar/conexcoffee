import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class Preoferta extends Model {}

Preoferta.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    codigo_preoferta: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    caficultor_id: {
      type: DataTypes.UUID,
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
    proceso: {
      type: DataTypes.ENUM(
        'LAVADO',
        'NATURAL',
        'HONEY',
        'ANAEROBICO',
        'DOBLE_FERMENTACION',
        'OTRO'
      ),
      allowNull: false
    },
    secado: {
      type: DataTypes.ENUM(
        'SOL_MARQUESINA',
        'SOL_PATIO',
        'SILO_MECANICO',
        'CAMA_AFRICANA'
      ),
      allowNull: false
    },
    fecha_recoleccion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_almacenamiento_pos_secado: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cantidad_cargas: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true
    },
    cantidad_kg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    precio_esperado_cop: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false
    },
    tipo_modalidad: {
      type: DataTypes.STRING(20),
      defaultValue: 'DIRECTA'
    },
    empresa_aliada_asignada_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM(
        'OFERTA_DIRECTA_ASIGNADA',
        'EN_INSPECCION_CAMPO',
        'PENDIENTE_EVALUACION_LAB',
        'OFERTA_LIBRE',
        'EN_NEGOCIACION',
        'CONTRATADA',
        'RECHAZADA_CALIDAD',
        'EXPIRADA',
        'CANCELADA'
      ),
      defaultValue: 'OFERTA_DIRECTA_ASIGNADA'
    },
    fecha_limite_oferta_directa: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dias_vigencia_oferta_libre: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    },
    fecha_expiracion_oferta_libre: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Preoferta',
    tableName: 'preofertas',
    schema: 'cosechas',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  }
);

export default Preoferta;
