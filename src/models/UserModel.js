//lưu người dùng
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    img: { type: String },
    birthday: { type: Date, required: true },
    note: { type: String }, //textbox 'about me'
    facebookLink: { type: String },
    githubLink: { type: String },
    reportCount: { type: Number, required: true }, //đếm số lần bị báo cáo dựa trên các report từ ques, ans, cmt
    followerCount: { type: Number, required: true },
    followingCount: { type: Number, required: true },
    savedCount: { type: Number, required: true },
    score: { type: Number, required: true },
    active: { type: Boolean, required: true }, //trạng thái người dùng: bị cấm hoặc kh

    //khóa ngoại
    reputationType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReputationType",
      require: true,
    },
    address: {
      //địa chỉ thì chắc lưu tỉnh/thành thôi
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      require: true,
    },
    gender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gender",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
