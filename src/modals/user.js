//file này để định nghĩa và tạo các modal xuống mongodb
//khai báo mongoose
const mongoose = require("mongoose");

//định nghĩa 1 Schema(tương đương 1 table dưới database)
//userSchema sẽ có 4 thuộc tính là: id kiểu là string(thư viện mongoose sẽ tự định nghĩa id),
// --------------------------------: name: kiểu là string(mình tự định nghĩa)
// --------------------------------: email: kiểu là string(mình tự định nghĩa)
// --------------------------------: city: kiểu là string(mình tự định nghĩa)
const userSchema = new mongoose.Schema({
  name: String, //thuộc tính name của userSchema do mình tự định nghĩa, có thể định nghĩa thêm các thuộc tính với các kiểu dữ liệu khác nhau
  email: String,
  city: String,
});

//User sẽ là 1 modal thuộc kittySchema
const User = mongoose.model("user", userSchema); // "user sẽ là tên của table muốn tạo dưới mongodb(nên để tên giống modal cho dễ thao tác)"

module.exports = User;
