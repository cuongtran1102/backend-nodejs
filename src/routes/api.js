//tạo các route api cho app(server.js) sử dụng

const express = require("express");

const routerAPI = express.Router();

const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadFileAPI,
  postUploadMutipleFileAPI,
} = require("../controllers/apiController");

const { postCreateCustomer } = require("../controllers/customerController");

routerAPI.get("/", (req, res) => {
  res.send("Hello API");
});

routerAPI.get("/users", getUsersAPI);

routerAPI.post("/users", postCreateUserAPI);

routerAPI.put("/users", putUpdateUserAPI);

routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadFileAPI);

routerAPI.post("/files", postUploadMutipleFileAPI);

routerAPI.post("/customers", postCreateCustomer);

module.exports = routerAPI;
