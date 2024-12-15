const UserServices = require("../services/UserServices");
const JwtService = require("../services/JwtService");
const validator = require("validator");

//tạo tài khoản
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //check email
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is not email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is not equal confirmPassword",
      });
    }

    const response = await UserServices.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//đăng nhập
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    //test input data
    const { email, password } = req.body;
    console.log('reg.body');
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //check email
    const isCheckEmail = reg.test(email);
    console.log(email, password);
    if (!email || !password) {
      //check have
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is not email",
      });
    }

    const response = await UserServices.loginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    console.log("userId", userId);
    const response = await UserServices.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    const response = await UserServices.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//get info user
const getAllUser = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const response = await UserServices.getAllUser(Number(limit), Number(page));
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//get detail user
const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    const response = await UserServices.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//cấp token mới
const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token?.split(" ")[1];

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }

    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//view follower
const viewFollower = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    const response = await UserServices.viewFollower(userId);

    // Kiểm tra response từ service và phản hồi theo tình huống
    if (response.status === "ERR") {
      return res.status(404).json(response); // Trả về mã lỗi 404 nếu user không tồn tại
    }

    return res.status(200).json(response); // Trả về thành công
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

//add follower
const addFollower = async (req, res) => {
  try {
    const userIdToFollow = req.params.id; // ID của user sẽ được follow
    const currentUserId = req.user.id; // ID của người gửi request (lấy từ token)

    // Kiểm tra xem ID có hợp lệ không
    if (!userIdToFollow || !currentUserId) {
      return res.status(400).json({
        status: "ERR",
        message: "User ID is required.",
      });
    }

    if (userIdToFollow === currentUserId) {
      return res.status(400).json({
        status: "ERR",
        message: "You cannot follow yourself.",
      });
    }

    // Thêm follower qua service
    const response = await UserServices.addFollower(currentUserId, userIdToFollow);
    return res.status(200).json({
      status: "OK",
      message: "Successfully followed the user.",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  viewFollower,
  refreshToken,
  addFollower,
};
