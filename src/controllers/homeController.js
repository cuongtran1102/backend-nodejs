const User = require("../modals/user");

//định nghĩa các controller để sử dụng bên web.js

const getHomePage = async (req, res) => {
  const results = await User.find({});
  console.log("results: ", results);
  return res.render("home.ejs", { listUsers: results });
};
const getABC = (req, res) => {
  res.send("ABC");
};
const getCreatePage = (req, res) => {
  return res.render("create.ejs"); //render file create.ejs cho trang create user
};
const getUpdatePage = async (req, res) => {
  const userID = req.params.id;
  //req.params thuộc kiểu object, thuộc tính của object này lưu các giá trị như id của user truyền từ homepage
  // thông qua: router.get("/update/:id", getUpdatePage);

  let user = await User.findById(userID); // findById là phương thức tìm 1 document by id của mongoose

  return res.render("update.ejs", { user: user }); //truyền user sang trang update.ejs
};

//Sử dụng bất đồng bộ với async, await
const postCreateUser = async (req, res) => {
  //req.body chính là cục data lấy từ các thuộc tính: name trong các thẻ input của file create.ejs
  console.log("req.body: ", req.body); //kiểm tra giá trị req khi client gửi request lên server
  let email = req.body.email; //req.body.email lấy từ thuộc tính: name = "email" từ các thẻ input của file create.ejs
  let name = req.body.myname;
  let city = req.body.city;
  console.log(`email: ${email}, name: ${name}, city: ${city}`);

  await User.create({ email: email, name: name, city: city });

  res.send("Create user success");
};

const postUpdateUser = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  // req.body là các giá trị lấy từ form-add-new của update.ejs
  // req.body.id là giá trị lấy từ thuộc tính name của thẻ input có name="id" trong form-add-new của update.ejs
  // tương tự với req.body.email, req.body.myname, ...

  await User.updateOne({ _id: id }, { name: name, email: email, city: city });
  // updateOne({điều kiện update}, {thuộc tính cần update: giá trị cần update})
  // updateOne là 1 phương thức của mongoose cho pháp update 1 document dưới mongodb với điều kiện nhất định
  //ở hàm User.updateOne điều kiện update là id

  res.redirect("/"); //về home page sau khi update thành công
};

const postDeleteUser = async (req, res) => {
  const userID = req.params.id;
  let user = await User.findById(userID);

  res.render("delete.ejs", { user: user });
};

const postHanldeDeleteUser = async (req, res) => {
  const userID = req.body.id;

  let result = await User.deleteOne({ _id: userID });
  console.log(result);
  res.redirect("/");
};

module.exports = {
  getHomePage,
  getABC,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHanldeDeleteUser,
};
