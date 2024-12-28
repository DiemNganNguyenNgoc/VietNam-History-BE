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

// Lấy câu hỏi theo ID người dùng
const getQuestionsByUserId = (userId, limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem userId có tồn tại hay không
      if (!userId) {
        resolve({
          status: "FAIL",
          message: "User ID is required",
        });
        return;
      }

      // Tính tổng số câu hỏi của người dùng
      const totalQuestions = await Question.countDocuments({ userQues: userId });

      // Lấy danh sách câu hỏi theo userId
      const userQuestions = await Question.find({ userQues: userId })
        .limit(limit)
        .skip(page * limit)
        .sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo giảm dần

      // Kiểm tra kết quả
      if (userQuestions.length === 0) {
        resolve({
          status: "OK",
          message: "No questions found for this user",
          data: [],
        });
        return;
      }

      // Trả về kết quả
      resolve({
        status: "OK",
        message: "Questions retrieved successfully",
        data: userQuestions,
        total: totalQuestions,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalQuestions / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
// tim ID cau hoi 
const findById = async (id) => {
  try {
    const question = await Question.findById(id);  // Mongoose method to find by ID
    return question;
  } catch (error) {
    throw new Error("Error finding question: " + error.message);
  }
};
const findByIdAndUpdate = async (id, updateData) => {
  try {
    // Mongoose method to find by ID and update
    const updatedQuestion = await Question.findByIdAndUpdate(id, updateData, {
      new: true, // This ensures that the updated document is returned
      runValidators: true, // This ensures that the update respects your model's validation rules
    });

    return updatedQuestion;
  } catch (error) {
    throw new Error("Error updating question: " + error.message);
  }
};

const toggleActiveQues = async (quesID) => {
  try {
      const ques = await Question.findById(quesID);
      if (!ques) {
          throw new Error('Question is not exist!');
      }

      ques.active = !ques.active; // Đảo ngược trạng thái active
      await ques.save();

      return {
          status: 'OK',
          message: 'Successful!',
          ques,
      };
  } catch (error) {
      throw new Error(error.message || 'Have some error');
  }
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDetailsQuestion,
  getAllQuestion,
  getQuestionsByUserId,
  findById,
  findByIdAndUpdate,toggleActiveQues
};
