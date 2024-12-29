const Question = require("../models/QuestionModel");
const Answer = require("../models/AnswerModel");
const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");


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
      const checkQuestion = await Question.findOne({ _id: id });

      if (!checkQuestion) {
        resolve({
          status: "OK",
          message: "The Question is not defined",
        });
        return;
      }

      const questionOwnerId = checkQuestion.user;

      // Xóa các câu trả lời liên quan đến câu hỏi
      const deletedAnswers = await Answer.deleteMany({ question: id });
      console.log(`${deletedAnswers.deletedCount} answers deleted.`);

      // Cập nhật số lượng câu trả lời cho người sở hữu câu trả lời
      if (deletedAnswers.deletedCount > 0) {
        const answers = await Answer.find({ question: id });
        for (const answer of answers) {
          const answerOwnerId = answer.user;
          const answerOwner = await User.findById(answerOwnerId);
          if (answerOwner) {
            answerOwner.ansCount = Math.max(0, answerOwner.ansCount - 1);
            await answerOwner.save();
            console.log(`User ansCount updated: ${answerOwner.ansCount}`);
          }

          // Xóa các bình luận liên quan đến câu trả lời
          const deletedComments = await Comment.deleteMany({ answer: answer._id });
          console.log(`${deletedComments.deletedCount} comments deleted.`);
        }
      }

      // Cập nhật số lượng câu hỏi cho người sở hữu câu hỏi
      const questionOwner = await User.findById(questionOwnerId);
      if (questionOwner) {
        questionOwner.quesCount = Math.max(0, questionOwner.quesCount - 1);
        await questionOwner.save();
        console.log(`User quesCount updated: ${questionOwner.quesCount}`);
      }

      // Xóa câu hỏi
      await Question.findByIdAndDelete(id);
      console.log("Question deleted.");

      resolve({
        status: "OK",
        message: "DELETE Question IS SUCCESS, along with associated answers and comments",
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

const getStatisticByUser = async ({ userQues, year, month }) => {
  try {
    const startOfMonth = new Date(year, month - 1, 1); // Ngày đầu tháng
    const endOfMonth = new Date(year, month, 0, 23, 59, 59); // Ngày cuối tháng

    const questions = await Question.find({
      userQues: userQues,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return {
      status: "OK",
      message: "Questions statistics retrieved successfully.",
      data: questions,
    };
  } catch (err) {
    throw new Error(err.message);
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
  findByIdAndUpdate,toggleActiveQues,
  getStatisticByUser
};
