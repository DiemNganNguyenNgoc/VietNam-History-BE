const Answer = require("../models/AnswerModel");
const mongoose = require("mongoose");
//tạo Answer
const createAnswer = (newAnswer) => {
  return new Promise(async (resolve, reject) => {
    const {
      content,
      userAns,
      question,
      images
    } = newAnswer;

    try {
      //check tên sản phẩm
      const checkAnswer = await Answer.findOne({
        content: content,
      });
      //nếu name Answer đã tồn tại
      if (checkAnswer !== null) {
        resolve({
          status: "OK",
          message: "The name of Answer is already",
        });
      }

      const createdAnswer = await Answer.create({
        content,
        userAns,
        question,
        images
      });
      if (createdAnswer) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdAnswer,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//update Answer
const updateAnswer = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check name created
      const checkAnswer = await Answer.findOne({
        _id: id,
      });
      //console.log("checkUser", checkUser);

      //nếu Answer ko tồn tại
      if (checkAnswer === null) {
        resolve({
          status: "OK",
          message: "The Answer is not defined",
        });
      }

      const updatedAnswer = await Answer.findByIdAndUpdate(id, data, {
        new: true,
      });
      //console.log("updatedAnswer", updatedAnswer);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedAnswer,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//delete Answer
const deleteAnswer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check Answer created
      const checkAnswer = await Answer.findOne({
        _id: id,
      });
      //console.log("checkAnswer", checkAnswer);

      //nếu Answer ko tồn tại
      if (checkAnswer === null) {
        resolve({
          status: "OK",
          message: "The Answer is not defined",
        });
      }

      await Answer.findByIdAndDelete(id);
      //console.log("updatedAnswer", updatedAnswer);
      resolve({
        status: "OK",
        message: "DELETE Answer IS SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get details Answer
const getDetailsAnswer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email created
      const Answer = await Answer.findOne({
        _id: id,
      });

      //nếu Answer ko tồn tại
      if (Answer === null) {
        resolve({
          status: "OK",
          message: "The Answer is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: Answer,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get all Answer
const getAllAnswer = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalAnswer = await Answer.countDocuments();

      if (filter) {
        const label = filter[0];
        const allAnswerFilter = await Answer.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit); //filter gần đúng
        resolve({
          status: "OK",
          message: "Get all Answer IS SUCCESS",
          data: allAnswerFilter,
          total: totalAnswer,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalAnswer / limit),
        });
      }

      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        //console.log('objectSort', objectSort)
        const allAnswerSort = await Answer.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "Get all Answer IS SUCCESS",
          data: allAnswerSort,
          total: totalAnswer,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalAnswer / limit),
        });
      }

      const allAnswer = await Answer.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "OK",
        message: "Get all Answer IS SUCCESS",
        data: allAnswer,
        total: totalAnswer,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalAnswer / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAnswersByQuestionId = (questionId, filterActive) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra và chuyển đổi questionId thành ObjectId
      if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return resolve({
          status: "ERR",
          message: "Invalid questionId format.",
        });
      }

      // Create the query object
      let query = {
        question: new mongoose.Types.ObjectId(questionId),
        active:true
      };
     

      const answers = await Answer.find(query);

      if (!answers || answers.length === 0) {
        return resolve({
          status: "OK",
          message: "No answers found for this question.",
          data: [],
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: answers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAnswersByQuestionIdAdmin = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra và chuyển đổi questionId thành ObjectId
      if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return resolve({
          status: "ERR",
          message: "Invalid questionId format.",
        });
      }

      const answers = await Answer.find({
        question:new mongoose.Types.ObjectId(questionId),
      });

      if (!answers || answers.length === 0) {
        return resolve({
          status: "OK",
          message: "No answers found for this question.",
          data: [],
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: answers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getQuestionByAnswer = async (answerId) => {
  try {
    const question = await Answer.findById(answerId);

    if (!question) throw new Error("Question not found.");
    return question;
  } catch (err) {
    throw new Error(err.message);
  }
};

const toggleActiveAns = async (answerId) => {
  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error('Answer not found');
    }

    answer.active = !answer.active;
    await answer.save();

    return {
      status: 'OK',
      message: 'SUCCESS',
      data: answer,
    };
  } catch (error) {
    throw new Error(error.message || 'An error occurred');
  }
};

const getStatisticByUser = async ({ userAns, year, month }) => {
  try {
    const startOfMonth = new Date(year, month - 1, 1); // Ngày đầu tháng
    const endOfMonth = new Date(year, month, 0, 23, 59, 59); // Ngày cuối tháng

    const answer = await Answer.find({
      userAns: userAns,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return {
      status: "OK",
      message: "Questions statistics retrieved successfully.",
      data: answer,
    };
  } catch (err) {
    throw new Error(err.message);
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
  toggleActiveAns,
  getAnswersByQuestionIdAdmin,
  getStatisticByUser
};
