

import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.DB_NAME ,
  process.env.DB_USER ,
  process.env.DB_PASSWORD ,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL ConexCoffee conectado exitosamente');
  } catch (error) {
    console.error('Error de conexión a PostgreSQL:', error.message);
    process.exit(1);
  }
};

// { alter: true } para que altere las tablas 