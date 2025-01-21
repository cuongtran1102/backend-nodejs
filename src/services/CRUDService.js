//file này để tạo các hàm thao tác với CSDL(Thêm, sửa, xóa, cập nhât...)
const connection = require("../config/database");
const getAllUsers = async () => {
  let [results, fields] = await connection.query("SELECT * from Users");
  //biến results sẽ lưu giá trị truy vấn được của câu truy vấn dạng SELECT
  //biến results thuộc kiểu object
  return results;
};

const updateUserByID = async (email, name, city, id) => {
  const [results, fields] = await connection.query(
    `UPDATE Users 
    set email = ?, name = ?, city = ?
    WHERE id = ?`,
    [email, name, city, id]
  );
};

const getUserByID = async (id) => {
  let [results, fields] = await connection.query(
    "SELECT * FROM Users WHERE id = ?",
    [id]
  );
  return results && results.length > 0 ? results[0] : {};
};

const deleteUserByID = async (id) => {
  let [results, fields] = await connection.query(
    `DELETE from Users where id = ?`,
    [id]
  );
};

module.exports = { getAllUsers, updateUserByID, getUserByID, deleteUserByID };
