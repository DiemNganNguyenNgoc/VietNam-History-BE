const express = require("express");
const router = express.Router();
const questionController = require("../controllers/QuestionController");
const { authMiddleware } = require("../middleware/authMiddleware");
// Tạo bản lưu mới
router.post("/create-question",  questionController.createQuestion);

// Cập nhật thông tin bản lưu
router.put("/update-question/:id",  questionController.updateQuestion);

// Cập nhật số câu trả lời của câu hỏi
router.put("/update-answer-count/:id", questionController.updateAnswerCount);

// Xóa bản lưu
router.delete("/delete-question/:id", questionController.deleteQuestion);

// Lấy chi tiết bản lưu
router.get("/get-detail-question/:id",  questionController.getDetailsQuestion);

// Lấy tất cả bản lưu của một bài viết
router.get("/get-all-question",  questionController.getAllQuestion);

router.get("/user/:userId",  questionController.getQuestionsByUserId);

router.get("/answers/user/:userId", questionController.getQuestionsFromUserAnswers);

router.put("/toggle-active/:id",  questionController.toggleActiveQues);

router.post("/questions/:id/vote", questionController.addVote);

module.exports = router;
