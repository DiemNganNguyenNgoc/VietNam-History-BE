const QuestionReport = require("../models/QuestionReportModel");
const Question = require("../models/QuestionModel");
const User = require("../models/UserModel");

const createQuestionReport = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { user, question } = data;

      // Kiểm tra nếu đã tồn tại report giữa user và question
      const existingReport = await QuestionReport.findOne({ user, question });
      if (existingReport) {
        return resolve({
          status: "ERR",
          message: "You have already reported this question.",
        });
      }

      // Tạo mới report
      const newReport = await QuestionReport.create({ user, question });

      console.log("newReport", newReport);

      // Tăng reportCount của Question
      await Question.findByIdAndUpdate(question, { $inc: { reportCount: 1 } });

      // Tăng reportCount của User
      await User.findByIdAndUpdate(user, { $inc: { reportCount: 1 } });

      resolve({
        status: "OK",
        message: "Question reported successfully.",
        data: newReport,
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message,
      });
    }
  });
};

const getAllReports = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const reports = await QuestionReport.find()
        .populate("user", "name email")
        .populate("question", "title content");
      resolve({
        status: "OK",
        message: "All reports retrieved successfully.",
        data: reports,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getReportById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const report = await QuestionReport.findById(id)
        .populate("user", "name email")
        .populate("question", "title content");

      if (!report) {
        return resolve({
          status: "ERR",
          message: "Report not found.",
        });
      }

      resolve({
        status: "OK",
        message: "Report retrieved successfully.",
        data: report,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteReport = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedReport = await QuestionReport.findByIdAndDelete(id);

      if (!deletedReport) {
        return resolve({
          status: "ERR",
          message: "Report not found or deletion failed.",
        });
      }

      resolve({
        status: "OK",
        message: "Report deleted successfully.",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createQuestionReport,
  getAllReports,
  getReportById,
  deleteReport,
};
