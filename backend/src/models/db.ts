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







// import mysql from "mysql2";
// const dbConfig = require("../config/db.config");

// console.log("DB Config:", dbConfig); // Debugging

// // Create a connection pool with promises
// const pool = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   port: dbConfig.PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Export the promise-based pool
// const promisePool = pool.promise();

// promisePool.getConnection()
//   .then(() => console.log("✅ Successfully connected to the database."))
//   .catch((err:any) => {
//     console.error("❌ Database connection failed:", err.message);
//     console.error("Error code:", err.code);
//   });

// export default promisePool;
