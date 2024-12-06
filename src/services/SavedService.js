const Saved = require("../models/SavedModel");

const createSaved = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { question, user } = data;

      // Kiểm tra dữ liệu đầu vào
      if (!question || !user) {
        return resolve({
          status: "ERR",
          message: "Question ID and User ID are required",
        });
      }

      // Tạo bản lưu mới
      const newSaved = await Saved.create({ question, user });

      resolve({
        status: "OK",
        message: "Saved successfully created",
        data: newSaved,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateSaved = async (savedID, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra ID bản lưu
      if (!savedID) {
        return resolve({
          status: "ERR",
          message: "Saved ID is required",
        });
      }

      const updatedSaved = await Saved.findByIdAndUpdate(savedID, data, {
        new: true,
      });

      if (!updatedSaved) {
        return resolve({
          status: "ERR",
          message: "Saved not found or update failed",
        });
      }

      resolve({
        status: "OK",
        message: "Saved successfully updated",
        data: updatedSaved,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteSaved = async (savedID) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra ID bản lưu
      if (!savedID) {
        return resolve({
          status: "ERR",
          message: "Saved ID is required",
        });
      }

      const deletedSaved = await Saved.findByIdAndDelete(savedID);

      if (!deletedSaved) {
        return resolve({
          status: "ERR",
          message: "Saved not found or delete failed",
        });
      }

      resolve({
        status: "OK",
        message: "Saved successfully deleted",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailSaved = async (savedID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!savedID) {
        return resolve({
          status: "ERR",
          message: "Saved ID is required",
        });
      }

      const saved = await Saved.findById(savedID)
        .populate("question")
        .populate("user");

      if (!saved) {
        return resolve({
          status: "ERR",
          message: "Saved not found",
        });
      }

      resolve({
        status: "OK",
        message: "Saved details retrieved successfully",
        data: saved,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllSaved = async (postID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!postID) {
        return resolve({
          status: "ERR",
          message: "Post ID is required",
        });
      }

      const savedList = await Saved.find({ question: postID })
        .populate("question")
        .populate("user");

      resolve({
        status: "OK",
        message: "All saved entries retrieved successfully",
        data: savedList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createSaved,
  updateSaved,
  deleteSaved,
  getDetailSaved,
  getAllSaved,
};
