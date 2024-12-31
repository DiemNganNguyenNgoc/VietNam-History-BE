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
    // console.log("req.body", req.body);

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
    // console.log("resPON", response)
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

// Lấy tất cả câu trả lời có active = true theo ID câu hỏi
const getAnswersByQuestionId = async (req, res) => {
  const { questionId } = req.params;

  try {
    // Gọi dịch vụ để lấy câu trả lời với active = true
    const answers = await AnswerService.getAnswersByQuestionId(questionId);

    res.status(200).json({
      status: "OK",
      message: "Answers fetched successfully.",
      data: answers,
    });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const getStatisticByUser = async (req, res) => {
  try {
    const { userAns, year, month } = req.query;

    if (!userAns || !year || !month) {
      return res.status(400).json({
        status: "ERR",
        message: "Missing required query parameters: user, year, and month.",
      });
    }

    const result = await AnswerService.getStatisticByUser({ userAns, year, month });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

// Lấy tất cả câu trả lời theo ID câu hỏi (Admin)
const getAnswersByQuestionIdAdmin = async (req, res) => {
  // console.log("req.params:", req.params);

  const { questionId } = req.params;
  
  try {
    const answers = await AnswerService.getAnswersByQuestionIdAdmin(questionId); // Gọi dịch vụ để lấy câu trả lời
    res.status(200).json({
      status: "OK",
      message: "Answers fetched successfully.",
      data: answers,
    });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};


const toggleActiveAns = async (req, res) => {
  const { id } = req.params; // Lấy id từ tham số route

  // Kiểm tra xem id có tồn tại và hợp lệ không
  if (!id) {
    return res.status(400).json({
      status: 'ERR',
      message: 'ID is required.',
    });
  }

  try {
    const result = await AnswerService.toggleActiveAns(id);

    // Kiểm tra nếu không tìm thấy đối tượng
    if (!result || result.status === 'ERR') {
      return res.status(404).json({
        status: 'ERR',
        message: 'Answer not found or could not be updated.',
      });
    }

    res.status(200).json(result); // Trả về kết quả thành công
  } catch (error) {
    res.status(500).json({
      status: 'ERR',
      message: error.message || 'An unexpected error occurred.',
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
  getAnswersByQuestionId,
  getStatisticByUser,
  toggleActiveAns,
  getAnswersByQuestionIdAdmin
};
