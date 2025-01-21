const connection = require("../config/database");
const {
  getAllUsers,
  updateUserByID,
  getUserByID,
  deleteUserByID,
} = require("../services/CRUDService");
//định nghĩa các controller để sử dụng bên web.js

const getHomePage = async (req, res) => {
  const results = await getAllUsers(); //vì hàm getAllUsers là bất đồng bộ nên phải dùng async, await
  //sau khi render home.ejs, hàm getAllUsers sẽ truy vấn xuống database để lấy dữ liệu của user hiển thị lên table-user
  return res.render("home.ejs", { listUsers: results }); //{listUsers, results}: lấy biến results gán cho listUsers và truyền sang home.ejs
  //listUsers phải là kiểu object mới truyền sang một file ejs(home.ejs) được
  // home.ejs sẽ nhận danh sách các user từ database từ biến listUsers
  //reander file home.ejs và các router của web.js sẽ sử dụng hàm getHomePage để reander file home.ejs
  //file home.ejs sẽ là trang chủ vì có "/"
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
  let [results, fields] = await connection.query(
    "SELECT * FROM Users WHERE id = ?",
    [userID]
  );
  let user = results && results.length > 0 ? results[0] : {}; //nếu tồn tạo biến results và results có ít nhất 1 phần tử user
  //trả về phần tử user đầu tiền, ngược lại trả về đối tượng rỗng

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

  //const [results, fields] dùng để truy vấn xuống database bằng sql
  //biến results: là 1 object lưu trạng thái của lần truy vấn dạng INSERT
  //fields dùng để lưu giá trị của trường mà lần truy vấn lấy được
  const [results, fields] = await connection.query(
    `INSERT INTO Users(email, name, city)
    VALUES (?, ?, ?)`,
    [email, name, city]
  );
  res.send("Create user success");
};

const postUpdateUser = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  await updateUserByID(email, name, city, id);
  res.redirect("/"); //về home page sau khi update thành công
};

const postDeleteUser = async (req, res) => {
  const userID = req.params.id;
  let user = await getUserByID(userID);

  res.render("delete.ejs", { user: user });
};

postHanldeDeleteUser = async (req, res) => {
  const userID = req.body.id;
  console.log(userID);
  await deleteUserByID(userID);
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
