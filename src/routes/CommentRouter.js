const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

// Tạo bản lưu mới
router.post("/create-comment", commentController.createComment);

// Cập nhật thông tin bản lưu
router.put("/update-comment/:id", commentController.updateComment);

// Xóa bản lưu
router.delete("/delete-comment/:id", commentController.deleteComment);

// Lấy chi tiết bản lưu
router.get("/get-detail-comment/:id", commentController.getDetailsComment);

// Lấy tất cả bản lưu của một bài viết
router.get("/get-all-comment/:postId", commentController.getAllComment);

// Xem bình luận của một câu trả lời
router.get("/comments/:answerId", commentController.getCommentsByAnswer);

module.exports = router;
