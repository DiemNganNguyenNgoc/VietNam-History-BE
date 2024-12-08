const express = require("express");
const router = express.Router();
const answerReportController = require("../controllers/AnswerReportController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

// Tạo báo cáo cho câu trả lời
router.post("/create-answer-report", authMiddleware, answerReportController.createAnswerReport);

// Lấy chi tiết một báo cáo
router.get("/get-detail-answer-report/:id", authMiddleware, answerReportController.getDetailsAnswerReport);

// Lấy tất cả báo cáo (admin dùng)
router.get("/get-all-answer-report", authMiddleware, answerReportController.getAllAnswerReports);

// Xóa một báo cáo (admin dùng)
router.delete("/delete-answer-report/:id", authMiddleware, answerReportController.deleteAnswerReport);

// Lấy tất cả báo cáo theo câu trả lời cụ thể
router.get("/get-reports-by-answer/:answerId", authMiddleware, answerReportController.getReportsByAnswer);

module.exports = router;
