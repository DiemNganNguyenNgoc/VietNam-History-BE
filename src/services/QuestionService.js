const Question = require("../models/QuestionModel");

// Tạo câu hỏi mới
const createQuestion = (newQuestion) => {
  return new Promise(async (resolve, reject) => {
    const { title, content, note, userQues, images, tags } = newQuestion;

    try {
      const createdQuestion = await Question.create({
        title,
        content,
        note,
        userQues,
        images,  
        tags,   
      });

      if (createdQuestion) {
        return resolve({
          status: 'OK',
          message: 'Question created successfully',
          data: createdQuestion,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật câu hỏi
const updateQuestion = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem câu hỏi có tồn tại hay không
      const checkQuestion = await Question.findOne({ _id: id });

      if (checkQuestion === null) {
        resolve({
          status: "OK",
          message: "The Question is not defined",
        });
        return;
      }

      // Cập nhật câu hỏi
      const updatedQuestion = await Question.findByIdAndUpdate(id, data, { new: true });
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

// Xóa câu hỏi
const deleteQuestion = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem câu hỏi có tồn tại hay không
      const checkQuestion = await Question.findOne({ _id: id });

      if (checkQuestion === null) {
        resolve({
          status: "OK",
          message: "The Question is not defined",
        });
        return;
      }

      // Xóa câu hỏi
      await Question.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE Question IS SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy chi tiết câu hỏi
const getDetailsQuestion = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const question = await Question.findOne({ _id: id });

      if (question === null) {
        resolve({
          status: "OK",
          message: "The Question is not defined",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: question,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy tất cả câu hỏi
const getAllQuestion = (limit, page, sort, filter, tag) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = {}; 
      if (tag) {
        query.tags = tag;
      }

      if (filter) {
        const label = filter[0];
        query[label] = { '$regex': filter[1] }; 
      }

      const totalQuestion = await Question.countDocuments(query);

      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0]; 
        const allQuestionSort = await Question.find(query)
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "Get all Question IS SUCCESS",
          data: allQuestionSort,
          total: totalQuestion,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalQuestion / limit),
        });
        return;
      }

      const allQuestion = await Question.find(query).limit(limit).skip(page * limit);
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
