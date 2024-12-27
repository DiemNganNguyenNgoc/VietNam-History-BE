const express = require("express");
const router = express.Router();
const answerController = require("../controllers/AnswerController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Tạo bản lưu mới
router.post("/create-answer", answerController.createAnswer);

// Cập nhật thông tin bản lưu
router.put("/update-answer/:id", answerController.updateAnswer);

// Xóa bản lưu
router.delete("/delete-answer/:id", answerController.deleteAnswer);

// Lấy chi tiết bản lưu
router.get("/get-detail-answer/:id", answerController.getDetailsAnswer);

// Lấy tất cả bản lưu của một bài viết
//router.get("/get-all-answer/:postId", answerController.getAllAnswer);

// Xem câu hỏi của một câu trả lời
router.get("/answers/:id", answerController.getQuestionByAnswer);
// Xem câu hỏi của một câu trả lời
router.get("/get-by-question/:questionId", answerController.getAnswersByQuestionId);

module.exports = router;
