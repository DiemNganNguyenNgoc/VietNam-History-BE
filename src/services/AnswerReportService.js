const AnswerReport = require("../models/answerReportModel");
const Answer = require("../models/answerModel");

const createAnswerReport = async ({ answer, userId }) => {
  try {
    const existingReport = await AnswerReport.findOne({ answer, user: userId });
    if (existingReport) {
      throw new Error("You have already reported this answer.");
    }

    const newReport = new AnswerReport({
      answer,
      user: userId,
    });

    await newReport.save();

    // Tăng số lượng báo cáo trong Answer
    await Answer.findByIdAndUpdate(answer, { $inc: { reportCount: 1 } });

    return newReport;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getDetailsAnswerReport = async (reportId) => {
  try {
    const report = await AnswerReport.findById(reportId).populate(
      "user answer"
    );
    if (!report) {
      throw new Error("Report not found.");
    }
    return report;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllAnswerReports = async () => {
  try {
    const reports = await AnswerReport.find().populate("user answer");
    return reports;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteAnswerReport = async (reportId) => {
  try {
    const report = await AnswerReport.findByIdAndDelete(reportId);
    if (!report) {
      throw new Error("Report not found.");
    }

    // Giảm số lượng báo cáo trong Answer
    await Answer.findByIdAndUpdate(report.answer, {
      $inc: { reportCount: -1 },
    });

    return report;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getReportsByAnswer = async (answerId) => {
  try {
    const reports = await AnswerReport.find({ answer: answerId }).populate(
      "user"
    );
    if (!reports.length) {
      throw new Error("No reports found for this answer.");
    }
    return reports;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createAnswerReport,
  getDetailsAnswerReport,
  getAllAnswerReports,
  deleteAnswerReport,
  getReportsByAnswer,
};
