const AnswerVote = require("../models/AnswerVoteModel");

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
  getVotesByAnswer,
  checkVoteStatus,
  getVoteStats,
};
