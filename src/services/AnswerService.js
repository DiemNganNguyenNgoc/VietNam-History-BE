const Answer = require("../models/AnswerModel");

//tạo Answer
const createAnswer = (newAnswer) => {
  return new Promise(async (resolve, reject) => {
    const {
      content,
      upVoteCount,
      downVoteCount,
      commentCount,
      view,
      reportCount,
      active,
      user,
      question,
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
        upVoteCount,
        downVoteCount,
        commentCount,
        view,
        reportCount,
        active,
        user,
        question,
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

const getQuestionByAnswer = async (answerId) => {
  try {
    const question = await Answer.findById(answerId);

    if (!question) throw new Error("Question not found.");
    return question;
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
};
