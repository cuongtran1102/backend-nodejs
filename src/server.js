const express = require("express"); //imporn express from express
require("dotenv").config(); //npm i dotenv để sử dụng process.env
const app = express(); //app express
const port = process.env.PORT || 8888; //port
const host_name = process.env.HOST_NAME;
const configViewEngine = require("./config/viewEngine");
const router = require("./routes/web");

//config teamplate engine
//khai báo nơi lưu trữ các thư mục teamplate engine(views/sample.ejs)
configViewEngine(app);

//Khai báo route
app.use(router);

app.listen(port, host_name, () => {
  console.log(`Example app listening on port ${port}`);
});
