//file này định nghĩa controller api
const User = require("../modals/user");

const {
  uploadSingleFile,
  uploadMutipleFile,
} = require("../services/fileService");

const getUsersAPI = async (req, res) => {
  const results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let user = await User.create({ email: email, name: name, city: city });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let user = await User.updateOne(
    { _id: id },
    { name: name, email: email, city: city }
  );

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  const id = req.body.id;
  let result = await User.deleteOne({ _id: id });

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

//vì hàm uploadSingleFile là bất đồng bộ nên dùng async
const postUploadFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    //nếu req.files không tồn tại(null) hoặc Object.keys(req.files) === 0: req.files tồn tại nhưng không chứa bất kỳ tệp nào
    return res.status(400).send("No files were uploaded."); //server trả về phản hồi với status code: 400 và dòng thông báo: "No files were uploaded."
  }
  let result = await uploadSingleFile(req.files.image); //vì hàm uploadSingleFile là bất đồng bộ nên dùng await
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

//lưu ý 2 hàm uploadMutipleFile và postUploadFileAPI đều bất đồng bộ nên phải dùng async, await
const postUploadMutipleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  //nếu req.files.image là 1 mảng(req.files.image chứa từ 2 tệp trở lên)
  if (Array.isArray(req.files.image)) {
    //tham số truyền vào hàm uploadMutipleFile là req.files.image
    let result = await uploadMutipleFile(req.files.image);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else {
    //nếu req.files.image ko phải là 1 mảng(req.files.image chỉ chứa 1 phần tử) thì chỉ upload 1 file với hàm postUploadFileAPI
    return await postUploadFileAPI(req, res);
  }
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadFileAPI,
  postUploadMutipleFileAPI,
};
