require("dotenv").config(); //npm i dotenv để sử dụng process.env

const express = require("express"); //imporn express from express
//khai báo port và host_name
const app = express(); //app express
const port = process.env.PORT || 8888; //port từ file .env
const host_name = process.env.HOST_NAME; //host_name từ file .env

//khai báo teamplate engine
const configViewEngine = require("./config/viewEngine");

//khai báo router
const router = require("./routes/web"); //lấy các router từ web.js

//config req.body(convert dữ liệu từ html trước khi request) để phục vụ việc gửi dữ liệu từ form lên server
// ví dụ với form-add-new của file home.ejs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config teamplate engine
//khai báo nơi lưu trữ các thư mục teamplate engine(views/sample.ejs)
configViewEngine(app);

//sử dụng router
app.use(router);

//config port và host_name(domain) cho app express(nodejs)
app.listen(port, host_name, () => {
  console.log(`Example app listening on port ${port}`);
});
