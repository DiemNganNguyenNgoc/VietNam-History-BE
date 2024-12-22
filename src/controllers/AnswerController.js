const AnswerService = require("../services/AnswerService");

//create Answer
const createAnswer = async (req, res) => {
  try {
    //test input data
    const {
      content,
     
      userAns,
      question,
      images
    } = req.body;
    console.log("req.body", req.body);

    if (
      !content ||
      
      !userAns ||
      !question
    ) {
      //check have
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }

    const response = await AnswerService.createAnswer(req.body);
    console.log("resPON", response)
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    
    });
  }
};

//update Answer
const updateAnswer = async (req, res) => {
  try {
    const AnswerId = req.params.id;
    const data = req.body;
    if (!AnswerId) {
      return res.status(200).json({
        status: "ERR",
        message: "The AnswerId is required",
      });
    }

    const response = await AnswerService.updateAnswer(AnswerId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//delete Answer
const deleteAnswer = async (req, res) => {
  try {
    const AnswerId = req.params.id;
    //const token = req.headers;

    if (!AnswerId) {
      return res.status(200).json({
        status: "ERR",
        message: "The AnswerId is required",
      });
    }

    const response = await AnswerService.deleteAnswer(AnswerId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//get details Answer
const getDetailsAnswer = async (req, res) => {
  try {
    const AnswerId = req.params.id;

    if (!AnswerId) {
      return res.status(200).json({
        status: "ERR",
        message: "The AnswerId is required",
      });
    }

    const response = await AnswerService.getDetailsAnswer(AnswerId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//get all Answer
const getAllAnswer = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await AnswerService.getAllAnswer(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getQuestionByAnswer = async (req, res) => {
  try {
    const question = await AnswerService.getQuestionByAnswer(
      req.params.questionId
    );
    res.status(200).json({
      status: "OK",
      message: "Question fetched successfully.",
      data: question,
    });
  } catch (err) {
    res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

module.exports = {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getDetailsAnswer,
  getAllAnswer,
  getQuestionByAnswer,
};
