//lưu lượt vote của ans
const mongoose = require('mongoose')

const answerVoteSchema = new mongoose.Schema(
    {
        type: {type: Boolean, required: true}, // upvote hoặc downvote

        //khoa ngoai
        user: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        answer: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Answer',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const AnswerVote = mongoose.model('AnswerVote', answerVoteSchema);
module.exports = AnswerVote;