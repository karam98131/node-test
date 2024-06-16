const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME || "nodetest";
const dbHostName = process.env.DB_HOST_NAME || "localhost";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbDialect = process.env.DB_PASSWORD || "mysql";

// Initialize Sequelize with MySQL database credentials
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHostName,
  dialect: dbDialect,
});

module.exports = sequelize;
