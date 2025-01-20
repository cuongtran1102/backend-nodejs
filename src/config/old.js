//file old.js chỉ để test, không phải file quan trọng của project
const mysql = require("mysql2");
require("dotenv").config(); //npm i dotenv để sử dụng process.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST, //lấy các biến đã ịnh nghĩ bên file .env
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

module.exports = connection;
