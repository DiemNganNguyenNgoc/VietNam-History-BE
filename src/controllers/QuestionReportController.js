const QuestionReportService = require("../services/QuestionReportService");

const createQuestionReport = async (req, res) => {
  try {
    const { user, question } = req.body;

    if (!user || !question) {
      return res.status(400).json({
        status: "ERR",
        message: "User ID and Question ID are required.",
      });
    }

    const response = await QuestionReportService.createQuestionReport(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const getAllReports = async (req, res) => {
  try {
    const response = await QuestionReportService.getAllReports();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await QuestionReportService.getReportById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await QuestionReportService.deleteReport(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

module.exports = {
  createQuestionReport,
  getAllReports,
  getReportById,
  deleteReport,
};
