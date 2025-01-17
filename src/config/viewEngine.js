const path = require("path"); //sử dụng path(có sẵn trong jodejs) để lấy đường dẫn tuyệt đối
const express = require("express");
const configViewEngine = (app) => {
  app.set("views", path.join("./src", "views")); //sử dụng path với __dirname = './src/' và lấy thư mục views trong src
  app.set("view engine", "ejs"); // Sử dụng engine 'ejs'

  //config static file: image, js, css
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
