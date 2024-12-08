const express = require("express");
const router = express.Router();
const questionController = require("../controllers/QuestionController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

// Tạo bản lưu mới
router.post("/create-question",  questionController.createQuestion);

// Cập nhật thông tin bản lưu
router.put("/update-question/:id",  questionController.updateQuestion);

// Xóa bản lưu
router.delete("/delete-question/:id", questionController.deleteQuestion);

// Lấy chi tiết bản lưu
router.get("/get-detail-question/:id",  questionController.getDetailsQuestion);

// Lấy tất cả bản lưu của một bài viết
router.get("/get-all-question/:postId",  questionController.getAllQuestion);


module.exports = router;
