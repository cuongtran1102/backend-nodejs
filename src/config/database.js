const mysql = require("mysql2/promise"); // mysql2 với cơ chế bất đồng bộ
require("dotenv").config(); //npm i dotenv để sử dụng process.env

const connection = mysql.createPool({
  //Sử dụng connectionPool của mysql2
  host: process.env.DB_HOST, //lấy các biến đã dịnh nghĩa bên file .env
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = connection;
