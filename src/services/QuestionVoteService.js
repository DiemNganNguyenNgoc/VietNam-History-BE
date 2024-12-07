const QuestionVote = require("../models/QuestionVoteModel");

// Tạo hoặc cập nhật vote
const createOrUpdateVote = (newVote) => {
  const { type, userId, questionId } = newVote;
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem người dùng đã vote chưa
      const existingVote = await QuestionVote.findOne({
        user: userId,
        question: questionId,
      });

      if (existingVote) {
        // Nếu đã vote, cập nhật kiểu vote
        existingVote.type = type;
        await existingVote.save();
        resolve({
          status: "OK",
          message: "Vote updated successfully",
          data: existingVote,
        });
      } else {
        // Nếu chưa vote, tạo mới
        const createdNewVote = await QuestionVote.create({
          type: type,
          user: userId,
          question: questionId,
        });
        resolve({
          status: "OK",
          message: "Vote created successfully",
          data: createdNewVote,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa vote
const deleteVote = (userId, questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm vote của người dùng cho câu hỏi
      const vote = await QuestionVote.findOneAndDelete({
        user: userId,
        question: questionId,
      });

      if (!vote) {
        resolve({
          status: "OK",
          message: "No vote found to delete",
        });
      } else {
        resolve({
          status: "OK",
          message: "Vote deleted successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy danh sách vote theo câu hỏi
const getVotesByQuestion = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const votes = await QuestionVote.find({ question: questionId }).populate(
        "user",
        "name"
      );

      resolve({
        status: "OK",
        message: "Get votes successfully",
        data: votes,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// Kiểm tra trạng thái vote của người dùng
const checkVoteStatus = (userId, questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vote = await QuestionVote.findOne({
        user: userId,
        question: questionId,
      });

      if (!vote) {
        resolve({
          status: "OK",
          message: "No vote found",
          data: { hasVoted: false },
        });
      } else {
        resolve({
          status: "OK",
          message: "Vote found",
          data: { hasVoted: true, type: vote.type },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Thống kê lượt vote
const getVoteStats = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const upVotes = await QuestionVote.countDocuments({
        question: questionId,
        type: true,
      });
      const downVotes = await QuestionVote.countDocuments({
        question: questionId,
        type: false,
      });

      resolve({
        status: "OK",
        message: "Get vote stats successfully",
        data: { upVotes, downVotes },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrUpdateVote,
  deleteVote,
  getVotesByQuestion,
  checkVoteStatus,
  getVoteStats,
};
