//file này dùng để khai báo các web routes để cho app(server.js sử dụng)

const express = require("express"); //import express from express
const {
  getHomePage,
  getABC,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHanldeDeleteUser,
} = require("../controllers/homeController");

const router = express.Router();

//router.method("endpoint", handler);
router.get("/", getHomePage); //sử dụng controller bên homeController, "/" chỉ định homeController là trang chủ, method = GET

router.get("/abc", getABC); //method = GET, endpoint = /abc, handler = getABC from "../controllers/homeController"

router.get("/create", getCreatePage); //tạo route cho page create user(create.ejs)

router.get("/update/:id", getUpdatePage); //cú pháp(:id) định nghĩa id user cần update cho url

router.post("/create-user", postCreateUser); //method = POST,, endpoint = /create-user, handler = postCreateUser from "../controllers/homeController"
// tương đương với class form-add-new bên file create.ejs

router.post("/update-user", postUpdateUser);

router.post("/delete-user/:id", postDeleteUser);

router.post("/delete-user", postHanldeDeleteUser);

module.exports = router;
