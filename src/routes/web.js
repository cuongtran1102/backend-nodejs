const express = require("express"); //import express from express
const { getHomePage, getABC } = require("../controllers/homeController");
const router = express.Router();

router.get("/", getHomePage); //sử dụng controller bên homeController

router.get("/abc", getABC);

module.exports = router;
