const CommentService = require("../services/CommentService.js");

const createComment = async (req, res) => {
  try {
    const response = await CommentService.createComment(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const response = await CommentService.updateComment(
      req.params.id,
      req.body
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const response = await CommentService.deleteComment(req.params.id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const getDetailsComment = async (req, res) => {
  try {
    const response = await CommentService.getDetailsComment(req.params.id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const getAllComment = async (req, res) => {
  try {
    const response = await CommentService.getAllComment(req.params.postId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const getCommentsByAnswer = async (req, res) => {
  try {
    const response = await CommentService.getCommentsByAnswer(
      req.params.answerId
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getDetailsComment,
  getAllComment,
  getCommentsByAnswer,
};
