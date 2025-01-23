//file này dùng để thêm, sửa, xóa, ... Modal Customer xuống mongodb
const Customer = require("../modals/customer");

//hàm createCustomerService sẽ lưu dữ liệu của customer xuống mongodb
//tham số truyền vào hàm này là 1 đối tượng chứa thông tin của 1 customer
//thông tin của customer sẽ được lấy từ req.body(các giá trị truyền vào phần body của api trong postman hoặc các value truyền từ 1 forrm html)
const createCustomerService = async (customerData) => {
  try {
    //sử dụng hàm create() của thư viện mongoose để lưu customer xuống mongodb
    //hàm create sau khi lưu thành công sẽ trả về 1 đối tượng chứa thông tin của customer vừa mới lưu hoặc 1 mảng các đối tương nếu lưu nhiều cutstomer cùng 1 lúc
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      image: customerData.image,
      description: customerData.description,
    });
    return result; //biến result là 1 đối tượng chứa thông tin customer vừa mới lưu thành công nhờ hàm create()
  } catch (error) {
    console.log("Có lỗi khi lưu customer xuống mongodb: ", error);
    return null; //khi có lỗi hàm createCustomerService sẽ return null
  }
};

module.exports = { createCustomerService };
