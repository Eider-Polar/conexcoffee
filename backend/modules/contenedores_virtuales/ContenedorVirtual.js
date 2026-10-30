import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

class ContenedorVirtual extends Model {}

ContenedorVirtual.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    codigo_contenedor: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    empresa_exportadora_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    broker_destino_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    pais_destino: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    puerto_embarque_colombia: {
      type: DataTypes.STRING(50),
      defaultValue: 'Buenaventura'
    },
    puerto_destino: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    capacidad_total_kg: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 20000.00
    },
    kilos_reservados: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    estado: {
      type: DataTypes.ENUM(
        'ABIERTO_RECOLECCION',
        'LLENO_CERRADO',
        'EN_PREPARACION_PUERTO',
        'ZARPADO_EN_TRANSITO',
        'EN_PUERTO_DESTINO',
        'EN_BODEGA_BROKER',
        'LIQUIDADO_FINALIZADO'
      ),
      defaultValue: 'ABIERTO_RECOLECCION'
    },
    fecha_apertura: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fecha_cierre_reservas: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_estimada_zarpe: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_real_zarpe: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_estimada_arribo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_real_arribo: {
      type: DataTypes.DATE,
      allowNull: true
    },
    numero_bl_maritimo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    factura_exportacion_consolidada_nro: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'ContenedorVirtual',
    tableName: 'contenedores_virtuales',
    schema: 'logistica',
    timestamps: false
  }
);

export default ContenedorVirtual;
