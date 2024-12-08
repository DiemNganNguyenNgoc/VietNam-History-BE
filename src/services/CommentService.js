const Comment = require("../models/commentModel");

const createComment = async (data) => {
  try {
    const { content, user, answer } = data;

    if (!content || !user || !answer) {
      return {
        status: "ERR",
        message: "Content, user, and answer are required.",
      };
    }

    const newComment = new Comment({
      content,
      user,
      answer,
      active: true,
    });

    await newComment.save();
    return {
      status: "OK",
      message: "Comment created successfully.",
      data: newComment,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateComment = async (id, data) => {
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return {
        status: "ERR",
        message: "Comment not found.",
      };
    }

    Object.assign(comment, data);
    await comment.save();
    return {
      status: "OK",
      message: "Comment updated successfully.",
      data: comment,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteComment = async (id) => {
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return {
        status: "ERR",
        message: "Comment not found.",
      };
    }

    await comment.deleteOne();
    return {
      status: "OK",
      message: "Comment deleted successfully.",
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getDetailsComment = async (id) => {
  try {
    const comment = await Comment.findById(id).populate("user answer");

    if (!comment) {
      return {
        status: "ERR",
        message: "Comment not found.",
      };
    }

    return {
      status: "OK",
      message: "Comment details retrieved successfully.",
      data: comment,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAllComment = async (postId) => {
  try {
    const comments = await Comment.find({ answer: postId })
      .populate("user")
      .sort({ createdAt: -1 });

    return {
      status: "OK",
      message: "All comments retrieved successfully.",
      data: comments,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCommentsByAnswer = async (answerId) => {
  try {
    const comments = await Comment.find({ answer: answerId })
      .populate("user")
      .sort({ createdAt: -1 });

    return {
      status: "OK",
      message: "Comments for the answer retrieved successfully.",
      data: comments,
    };
  } catch (err) {
    throw new Error(err.message);
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
