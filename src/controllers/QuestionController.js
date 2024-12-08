const QuestionService = require("../services/QuestionService");

//create Question
const createQuestion = async (req, res) => {
  try {
    //test input data
    const { title, content, upVoteCount, downVoteCount, answerCount, view, reportCount, active, user  } =
      req.body;
    //console.log("req.body", req.body);

    if (!title|| content|| upVoteCount|| downVoteCount|| answerCount||view|| reportCount|| active|| user ) {
      //check have
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }

    const response = await QuestionService.createQuestion(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//update Question
const updateQuestion = async (req, res) => {
  try {
    const QuestionId = req.params.id;
    const data = req.body;
    if (!QuestionId) {
      return res.status(200).json({
        status: "ERR",
        message: "The QuestionId is required",
      });
    }

    const response = await QuestionService.updateQuestion(QuestionId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//delete Question
const deleteQuestion = async (req, res) => {
  try {
    const QuestionId = req.params.id;
    //const token = req.headers;

    if (!QuestionId) {
      return res.status(200).json({
        status: "ERR",
        message: "The QuestionId is required",
      });
    }

    const response = await QuestionService.deleteQuestion(QuestionId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//get details Question
const getDetailsQuestion = async (req, res) => {
  try {
    const QuestionId = req.params.id;

    if (!QuestionId) {
      return res.status(200).json({
        status: "ERR",
        message: "The QuestionId is required",
      });
    }

    const response = await QuestionService.getDetailsQuestion(QuestionId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//get all Question
const getAllQuestion = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await QuestionService.getAllQuestion(Number(limit) || 8, Number(page) || 0, sort, filter);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
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
