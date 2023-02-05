const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.connect((error: any) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;

export {};
