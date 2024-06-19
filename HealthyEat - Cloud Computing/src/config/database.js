// database.js
const Sequelize = require('sequelize');
require('dotenv').config();
const mysql2 = require('mysql2');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectModule: mysql2,
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;
