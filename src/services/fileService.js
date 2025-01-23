//file này định nghĩa các hàm hỗ trợ việc upload file với: express-fileupload

const path = require("path"); //sử dụng path(có sẵn trong jodejs) để lấy đường dẫn tuyệt đối

//sử dụng async và await
const uploadSingleFile = async (sampleFile) => {
  //sampleFile chính là req.files.image(trong đó req.files là của thư viện express-fileupload, req.files.image là thuộc tính tên file của modal Customer)
  let uploadPath = path.resolve(__dirname, "../public/images/upload"); //thiết lập đường dẫn lưu file = đường dẫn tuyệt đối của project + nơi lưu file(ở đây là thư mục upload trong thư mục public)

  //config lại tên file để tránh bị trùng
  let extFileName = path.extname(sampleFile.name); //dùng hàm path.extname để lấy phần đuôi file(png, jpg, ...);

  let baseFileName = path.basename(sampleFile.name, extFileName); ////dùng hàm path.basename để lấy tên file(không có đuôi file)

  //cteate final path để lưu file được upload
  let finalFileName = `${baseFileName}-${Date.now()}${extFileName}`; //thêm thời gian tạo file vào tên file để tránh trường hợp trùng tên file
  let finalPath = path.join(uploadPath, finalFileName); //finalPath sẽ là uploadPath + finalFileName;

  try {
    await sampleFile.mv(finalPath); //sử dụng hàm mv của express-fileupload để upload file
    return {
      //nếu upload ko có lỗi: return 1 đối tượng với các thuộc tính: status: "Upload success", path: uploadPath, err: null,
      status: "Upload success",
      fileName: sampleFile.name,
      path: finalPath,
      err: null,
    };
  } catch (error) {
    return {
      //nếu upload có lỗi: return 1 đối tượng với các thuộc tính: status: "pload failed", path: null, err: JSON.stringify(error),
      status: "Upload failed",
      path: null,
      err: JSON.stringify(error), //convert biến error từ kiểu JSON sang String
    };
  }
};

//sử dụng async, await
const uploadMutipleFile = async (arrFile) => {
  //arrFile là 1 mảng các req.files.image
  try {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    var result = []; //tạo 1 mảng lưu danh sách các kết quả của hàm uploadMutipleFile
    var countOfFileUploaded = 0; //1 biến lưu số lượng file upload thành công

    //duyệt mảng arrFile
    for (let i = 0; i < arrFile.length; i++) {
      let extFileName = path.extname(arrFile[i].name); //arrFile[i].name tương đương với req.files.image.name

      let baseFileName = path.basename(arrFile[i].name, extFileName);

      let finalFileName = `${baseFileName}-${Date.now()}${extFileName}`;

      let finalPath = path.join(uploadPath, finalFileName);

      try {
        await arrFile[i].mv(finalPath); //arrFile[i] tương đương với req.files.image

        //mỗi lần upload file thành công thì push 1 object có các thuộc tính: status, fileName, path, err vào mảng result
        result.push({
          status: "Upload success",
          fileName: finalFileName,
          path: finalPath,
          err: null,
        });
        countOfFileUploaded++; //mỗi lần upload thành cong thì countOfFileUploaded tăng lên 1
      } catch (error) {
        //upload thất bại cũng tương tự
        result.push({
          status: "Upload failed",
          fileName: arrFile[i].name,
          err: JSON.stringify(error),
        });
      }
    }
  } catch (error) {
    console.log("Lỗi khi upload file: ", error);
  }
  return {
    //hàm uploadMutipleFile sẽ trả về 1 đối tượng có 2 thuộc tính là: mảng result và số lượng file upload thành công
    countOfFileUploaded: countOfFileUploaded,
    results: result,
  };
};

module.exports = { uploadSingleFile, uploadMutipleFile };
