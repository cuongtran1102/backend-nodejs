//file này dùng để kết nối xuống mongodb với thư viện mongoose
const { mongoose } = require("mongoose");
require("dotenv").config(); //npm i dotenv để sử dụng process.env

var dbState = [
  {
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
]; //mảng này dùng để check kết nối xuống mongodb

const connection = async () => {
  await mongoose.connect("mongodb://localhost:27018", {
    user: process.env.DB_USER, //user và pass là 2 thuộc tính chứa thông tin user để kết nối xuống mongodb, ngoài ra còn nhiều thuộc tính khác tham khảo bên file: C:\Users\Admin\Documents\backend-nodejs\node_modules\mongoose\types\connection.d.ts
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME, //giá trị của 2 thuộc tính user và pass lấy bên file .env
  });

  //đoạn code này dùng để check kết nối xuống mongodb thành công hay chưa
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find((f) => f.value == state).label, "to db"); //thông báo xem đã kết nối thành công hay chưa
  //-------------------------------------------------------------------//
};
module.exports = connection;
