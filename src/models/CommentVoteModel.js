//lưu lượt vote của cmt
const mongooes = require('mongooes')

const commentVoteSchema = new mongooes.Schema(
    {
        type: {type: Boolean, required: true}, // upvote hoặc downvote

        //khoa ngoai
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        comment: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Comment',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const CommentVote = mongooes.model('CommentVote', commentVoteSchema);
module.exports = CommentVote;