require("dotenv").config(); //npm i dotenv để sử dụng process.env

const express = require("express"); //imporn express from express
const app = express(); //app express
//khai báo port và host_name
const port = process.env.PORT || 8888; //port từ file .env
const host_name = process.env.HOST_NAME; //host_name từ file .env

//khai báo teamplate engine
const configViewEngine = require("./config/viewEngine");

//khai báo web routes
const webRoutes = require("./routes/web"); //lấy các router từ web.js

//khai báo api routes
const apiRouter = require("./routes/api"); //lấy các router từ api.js

//khai báo connection
const connection = require("./config/database");

//khai báo fileUpload
const fileUpload = require("express-fileupload");

//sử dụng fileupload
app.use(fileUpload);

//config req.body(convert dữ liệu từ html trước khi request) để phục vụ việc gửi dữ liệu từ form lên server
// ví dụ với form-add-new của file home.ejs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config teamplate engine
//khai báo nơi lưu trữ các thư mục teamplate engine(views/sample.ejs)
configViewEngine(app);

//sử dụng web routes
app.use("/", webRoutes);

//sử dụng api routes
app.use("/v1/api/", apiRouter);

//cú pháp (gọi 1 hàm vào trong này)() là seft running funtion
//cú pháp này giúp sử dụng async và await khi gọi hàm connection()
(async () => {
  try {
    await connection();

    //nếu khi chạy app backend nodejs mà có lỗi khi kết nối tới mongodb thì sẽ không chạy app nữa mà vào thẳng catch luôn
    //config port và host_name(domain) cho app express(nodejs)
    app.listen(port, host_name, () => {
      console.log(`Backend nodejs app đang chạy ở port: ${port}`);
    });
  } catch (error) {
    console.log("Có lỗi khi kết nối tới mongodb: ", error);
  }
})();
