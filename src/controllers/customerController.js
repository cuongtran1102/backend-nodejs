//file này là controller cho các api của modal Customer

const {
  uploadSingleFile,
  uploadMutipleFile,
} = require("../services/fileService");

const { createCustomerService } = require("../services/customerService");

//hàm postCreateCustomer sẽ dùng hàm createCustomerService để lưu thông tin customer xuống mongodb
//vì hàm createCustomerService sử dụng phương thức create() của thư viện mongoose nên sẽ là 1 promise nên hàm postCreateCustomer phải dùng async, await
const postCreateCustomer = async (req, res) => {
  const { name, address, phone, email, description } = req.body; //lấy các giá trị từ body của api được truyền vào thông qua postman hoặc forrm html

  let imageURL = ""; //khởi tạo đường dẫn tới file ảnh = rỗng

  //nếu không truyền file vào body(thông qua thư viện: express-fileupload) hoặc có truyền file nhưng file rỗng thì không làm gì cả
  if (!req.files || Object.keys(req.files).length === 0) {
    //do nothing
    //ngược lại thì upload file với hàm uploadSingleFile
  } else {
    let result = await uploadSingleFile(req.files.image); //biến result lưu trạng thái sau khi upload file
    if (result.path !== null) {
      //nếu thuộc tính path của result(result.path) không null thì gán đường dẫn tới file ảnh = result.path để lưu xuống mongodb
      imageURL = result.path;
    }
    //ngược lại, nếu result.path === null(trường hợp error của hàm uploadSingleFile) thì imageURL giữ nguyên(= rỗng);
  }

  let customerData = {
    name,
    address,
    phone,
    email,
    image: imageURL,
    description,
  }; //khởi tạo đối tượng customerData với các thuộc tính chứa giá trị từ body của api và thuộc tính image = imageURL(đường dẫn tới file ảnh)

  //truyền đối tượng customerData cho hàm createCustomerService
  let customer = await createCustomerService(customerData);

  return res.status(200).json({
    errorCode: 0,
    data: customer, //phần data của api postCreateCustomer sẽ chứa result của hàm createCustomerService
  });
};

module.exports = { postCreateCustomer };
