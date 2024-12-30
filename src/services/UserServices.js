const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

//tạo user
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone, birthday } = newUser;
    try {
      //check email created
      const checkUser = await User.findOne({
        email: email,
      });
      //nếu email đã tồn tại
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "The email is already",
        });
      }
      //mã hóa password
      const hash = bcrypt.hashSync(password, 10);
      console.log("hash", hash);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        confirmPassword: hash,
        phone,
        birthday,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//log in user
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      //check email created
      const checkUser = await User.findOne({
        email: email,
      });
      //nếu email đã tồn tại
      if (checkUser === null) {
        return reject({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      console.log("comparePassword ", comparePassword);

      if (!comparePassword) {
        return reject({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      console.log("access_token ", access_token);

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//update user
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email created
      const checkUser = await User.findOne({
        _id: id,
      });
      console.log("checkUser", checkUser);

      //nếu user ko tồn tại
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("updatedUser", updatedUser);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//delete user
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email created
      const checkUser = await User.findOne({
        _id: id,
      });
      console.log("checkUser", checkUser);

      //nếu user ko tồn tại
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE USER IS SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get info user
const getAllUser = (limit = 4, page = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await User.countDocuments();
      const allUser = await User.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "OK",
        message: "Get all USER IS SUCCESS",
        data: allUser,
        total: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsersExceptSelf = async (currentUserId) => {
  try {
    // Lọc người dùng trừ bản thân
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select("name img address followerCount") // Chỉ lấy các trường cần thiết
      .lean(); // Chuyển đổi sang đối tượng JS
    return users;
  } catch (error) {
    throw new Error("Unable to fetch users: " + error.message);
  }
};

//get details user
const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email created
      const user = await User.findOne({
        _id: id,
      });

      //nếu user ko tồn tại
      if (user === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//view follower
const viewFollower = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm user dựa trên ID
      const user = await User.findOne({ _id: id }).populate("followers"); // Populate thêm danh sách followers

      // Nếu user không tồn tại
      if (!user) {
        return resolve({
          status: "ERR",
          message: "The user does not exist",
        });
      }

      // Trả về danh sách followers
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user.followers, // Trả về danh sách followers
      });
    } catch (e) {
      reject(e);
    }
  });
};

//add follower
const addFollower = async (currentUserId, userIdToFollow) => {
  const userToFollow = await User.findById(userIdToFollow);
  if (!userToFollow) throw new Error("User to follow does not exist.");

  const currentUser = await User.findById(currentUserId);
  if (!currentUser) throw new Error("Current user does not exist.");

  // Kiểm tra nếu đã follow
  if (userToFollow.followers.includes(currentUserId)) {
    throw new Error("You are already following this user.");
  }

  // Cập nhật danh sách followers và following
  userToFollow.followers.push(currentUserId);
  currentUser.following.push(userIdToFollow);

  await userToFollow.save();
  await currentUser.save();

  return { userToFollow, currentUser };
};

const updateQuesCount = async (userId) => {
  try {
      const user = await User.findById(userId);
      if (!user) {
          return null;
      }
      user.quesCount = (user.quesCount || 0) + 1; // Nếu `quesCount` chưa được khởi tạo thì set về 0
      await user.save();
      return user;
  } catch (error) {
      throw error;
  }
};

const updateAnswerCount = async (userId) => {
  try {
      const user = await User.findById(userId);
      if (!user) {
          return null;
      }
      user.answerCount = (user.answerCount || 0) + 1; // Nếu `quesCount` chưa được khởi tạo thì set về 0
      await user.save();
      return user;
  } catch (error) {
      throw error;
  }
};

//tạo access token dựa vào refresh token

//Update active cua user
const toggleActiveUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.active = !user.active;
    await user.save();

    return {
      status: 'OK',
      message: 'SUCCESS',
      data: user,
    };
  } catch (error) {
    throw new Error(error.message || 'An error occurred');
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
  addFollower,
  getAllUsersExceptSelf,
  updateQuesCount,
  updateAnswerCount,
  toggleActiveUser 
};
