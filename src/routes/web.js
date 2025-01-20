const express = require("express"); //import express from express
const {
  getHomePage,
  getABC,
  postCreateUser,
  getCreatePage,
} = require("../controllers/homeController");

const router = express.Router();

//router.method("endpoint", handler);
router.get("/", getHomePage); //sử dụng controller bên homeController, "/" chỉ định homeController là trang chủ, method = GET

router.get("/abc", getABC); //method = GET, endpoint = /abc, handler = getABC from "../controllers/homeController"

router.get("/create", getCreatePage); //tạo route cho page create user(create.ejs)

router.post("/create-user", postCreateUser); //method = POST,, endpoint = /create-user, handler = postCreateUser from "../controllers/homeController"
// tương đương với class form-add-new bên file create.ejs

module.exports = router;
