const express = require("express");
const router = express.Router();
const savedController = require("../controllers/SavedController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

// Tạo bản lưu mới
router.post("/create-saved", authMiddleware, savedController.createSaved);

// Cập nhật thông tin bản lưu
router.put("/update-saved/:id", authMiddleware, savedController.updateSaved);

// Xóa bản lưu
router.delete("/delete-saved/:id", authMiddleware, savedController.deleteSaved);

// Lấy chi tiết bản lưu
router.get("/get-detail-saved/:id", authMiddleware, savedController.getDetailSaved);

// Lấy tất cả bản lưu của một bài viết
router.get("/get-all-saved/:postId", authMiddleware, savedController.getAllSaved);

module.exports = router;
