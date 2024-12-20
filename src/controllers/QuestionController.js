const QuestionService = require("../services/QuestionService");

//create Question
const createQuestion = async (req, res) => {
  try {
    const { title, content, note, userQues, images, tags } = req.body;

    if (!title || !content || !userQues) {
      return res.status(400).json({
        status: "ERR",
        message: "Title, content, and userQues are required",
      });
    }

    const response = await QuestionService.createQuestion({
      title,
      content,
      note,
      userQues,
      images,
      tags,
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while creating the question",
      error: e.message,
    });
  }
};

// Update Question
const updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { title, content, note, tags, images } = req.body;

    if (!questionId) {
      return res.status(400).json({
        status: "ERR",
        message: "Question ID is required",
      });
    }

    const response = await QuestionService.updateQuestion(questionId, {
      title,
      content,
      note,
      tags,
      images,
    });
    if (!response) {
      return res.status(404).json({
        status: "ERR",
        message: "Question not found",
      });
    }

    return res.status(200).json(response);
  } catch (e) {
    console.error("Error updating question: ", e);
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while updating the question.",
    });
  }
};

// Delete Question
const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    if (!questionId) {
      return res.status(400).json({
        status: "ERR",
        message: "Question ID is required",
      });
    }

    const response = await QuestionService.deleteQuestion(questionId);
    if (!response) {
      return res.status(404).json({
        status: "ERR",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Question deleted successfully",
    });
  } catch (e) {
    console.error("Error deleting question: ", e);
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while deleting the question.",
    });
  }
};

// Get Details Question
const getDetailsQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    console.log("questionId", questionId);
    
    if (!questionId) {
      return res.status(400).json({
        status: "ERR",
        message: "Question ID is required",
      });
    }

    const response = await QuestionService.getDetailsQuestion(questionId);
    if (!response) {
      return res.status(404).json({
        status: "ERR",
        message: "Question not found",
      });
    }

    return res.status(200).json(response);
  } catch (e) {
    console.error("Error fetching question details: ", e);
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while fetching the question details.",
    });
  }
};

// Get All Questions
const getAllQuestion = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await QuestionService.getAllQuestion(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error fetching questions: ", e);
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while fetching the questions.",
    });
  }
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDetailsQuestion,
  getAllQuestion,
};
