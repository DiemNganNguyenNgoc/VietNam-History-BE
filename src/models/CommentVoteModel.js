//lưu lượt vote của cmt
const mongoose = require('mongoose')

const commentVoteSchema = new mongoose.Schema(
    {
        type: {type: Boolean, required: true}, // upvote hoặc downvote

        //khoa ngoai
        user: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        comment: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Comment',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const CommentVote = mongoose.model('CommentVote', commentVoteSchema);
module.exports = CommentVote;