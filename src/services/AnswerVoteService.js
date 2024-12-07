const AnswerVote = require("../models/AnswerVoteModel");

// Tạo hoặc cập nhật vote
const createOrUpdateVote = (newVote) => {
  const { type, userId, answerId } = newVote;
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem người dùng đã vote chưa
      const existingVote = await AnswerVote.findOne({
        user: userId,
        answer: answerId,
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
        const createdNewVote = await AnswerVote.create({
          type: type,
          user: userId,
          answer: answerId,
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
const deleteVote = (userId, answerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm vote của người dùng cho câu hỏi
      const vote = await AnswerVote.findOneAndDelete({
        user: userId,
        answer: answerId,
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
const getVotesByAnswer = (answerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const votes = await AnswerVote.find({ answer: answerId }).populate(
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
const checkVoteStatus = (userId, answerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vote = await AnswerVote.findOne({
        user: userId,
        answer: answerId,
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
const getVoteStats = (answerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const upVotes = await AnswerVote.countDocuments({
        answer: answerId,
        type: true,
      });
      const downVotes = await AnswerVote.countDocuments({
        answer: answerId,
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
  getVotesByAnswer,
  checkVoteStatus,
  getVoteStats,
};
