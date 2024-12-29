//lưu bình luận của câu trả lời
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        content: {type: String, required: true},
        upVoteCount: {type: Number, required: true}, 
        downVoteCount: {type: Number, required: true},
        view: {type: Number, required: true}, 
        reportCount: {type: Number, required: true},
        active: {type: Boolean, required: true},

        //khóa ngoại
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            require: true
        },
        answer: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Answer',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;