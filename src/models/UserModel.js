const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    img: { type: String, default: "" }, // Mặc định là chuỗi rỗng
    birthday: { type: Date, default: null }, // Mặc định là null
    note: { type: String, default: "" }, // Mặc định là chuỗi rỗng
    facebookLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    reportCount: { type: Number, default: 0 }, // Mặc định là 0
    followerCount: { type: Number, default: 0 }, // Mặc định là 0
    followingCount: { type: Number, default: 0 }, // Mặc định là 0
    savedCount: { type: Number, default: 0 }, // Mặc định là 0
    score: { type: Number, default: 0 }, // Mặc định là 0
    active: { type: Boolean, default: true }, // Mặc định là true
    isAdmin: { type: Boolean, default: false },

    // Khóa ngoại (có thể bỏ qua hoặc thêm giá trị mặc định)
    reputationType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReputationType",
      required: false,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: false,
    },
    gender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gender",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
