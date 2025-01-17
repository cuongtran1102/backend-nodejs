//định nghĩa các controller để sử dụng bên web.js
const getHomePage = (req, res) => {
  res.render("sample.ejs"); //reander file sample.ejs nằm trong thư mục views đã khai báo ở trên, view sample sẽ là trang chủ vì có "/"
};
const getABC = (req, res) => {
  res.send("ABC");
};
module.exports = { getHomePage, getABC };
