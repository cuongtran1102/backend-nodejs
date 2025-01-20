//file này để tạo các hàm thao tác với CSDL(Thêm, sửa, xóa, cập nhât...)
const connection = require("../config/database");
const getAllUsers = async () => {
  let [results, fields] = await connection.query("SELECT * from Users");
  //biến results sẽ lưu giá trị truy vấn được của câu truy vấn dạng SELECT
  //biến results thuộc kiểu object
  return results;
};

module.exports = { getAllUsers };
