const Question = require("../models/QuestionModel");

//tạo Question
const createQuestion = (newQuestion) => {
  return new Promise(async (resolve, reject) => {
    const { title, content, upVoteCount, downVoteCount, answerCount, view, reportCount, active, user } =
      newQuestion;

    try {
      //check tên sản phẩm
      const checkQuestion = await Question.findOne({
        content: content,
      });
      //nếu name Question đã tồn tại
      if (checkQuestion !== null) {
        resolve({
          status: "OK",
          message: "The name of Question is already",
        });
      }

      const createdQuestion = await Question.create({
        title, 
        content, 
        upVoteCount, 
        downVoteCount, 
        answerCount, 
        view, 
        reportCount, 
        active, 
        user 
      });
      if (createdQuestion) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdQuestion,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//update Question
const updateQuestion = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check name created
      const checkQuestion = await Question.findOne({
        _id: id,
      });
      //console.log("checkUser", checkUser);

      //nếu Question ko tồn tại
      if (checkQuestion === null) {
        resolve({
          status: "OK",
          message: "The Question is not defined",
        });
      }

      const updatedQuestion = await Question.findByIdAndUpdate(id, data, {
        new: true,
      });
      //console.log("updatedQuestion", updatedQuestion);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedQuestion,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//delete Question
const deleteQuestion = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check Question created
      const checkQuestion = await Question.findOne({
        _id: id,
      });
      //console.log("checkQuestion", checkQuestion);

      //nếu Question ko tồn tại
      if (checkQuestion === null) {
        resolve({
          status: "OK",
          message: "The Question is not defined",
        });
      }

      await Question.findByIdAndDelete(id);
      //console.log("updatedQuestion", updatedQuestion);
      resolve({
        status: "OK",
        message: "DELETE Question IS SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get details Question
const getDetailsQuestion = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email created
      const Question = await Question.findOne({
        _id: id,
      });

      //nếu Question ko tồn tại
      if (Question === null) {
        resolve({
          status: "OK",
          message: "The Question is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: Question,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//get all Question
const getAllQuestion = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalQuestion = await Question.countDocuments();
      
      if(filter){
        const label = filter[0];
        const allQuestionFilter = await Question.find({ [label]: {'$regex': filter[1] } }).limit(limit).skip(page * limit) //filter gần đúng
        resolve({
          status: "OK",
          message: "Get all Question IS SUCCESS",
          data: allQuestionFilter,
          total: totalQuestion,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalQuestion / limit),
        });
      }

      if(sort){
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        //console.log('objectSort', objectSort)
        const allQuestionSort = await Question.find().limit(limit).skip(page * limit).sort(objectSort);
        resolve({
          status: "OK",
          message: "Get all Question IS SUCCESS",
          data: allQuestionSort,
          total: totalQuestion,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalQuestion / limit),
        });
      }

      const allQuestion = await Question.find().limit(limit).skip(page * limit);
      resolve({
        status: "OK",
        message: "Get all Question IS SUCCESS",
        data: allQuestion,
        total: totalQuestion,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalQuestion / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDetailsQuestion,
  getAllQuestion,
};
