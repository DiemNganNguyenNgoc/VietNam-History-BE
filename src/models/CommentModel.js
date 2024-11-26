//lưu bình luận của câu trả lời
const mongooes = require('mongooes');

const commentSchema = new mongooes.Schema(
    {
        content: {type: String, required: true},
        upVoteCount: {type: Number, required: true}, 
        downVoteCount: {type: Number, required: true},
        view: {type: Number, required: true}, 
        reportCount: {type: Number, required: true},
        active: {type: Boolean, required: true},

        //khóa ngoại
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        answer: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Answer',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongooes.model('Comment', commentSchema);
module.exports = Comment;