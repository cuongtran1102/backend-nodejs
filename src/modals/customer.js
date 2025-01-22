//file này để định nghĩa và tạo các modal xuống mongodb
//khai báo mongoose
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String,
  },
  {
    timestamps: true, //thêm trường createdDate và updatedDate cho customerSchema
  }
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
