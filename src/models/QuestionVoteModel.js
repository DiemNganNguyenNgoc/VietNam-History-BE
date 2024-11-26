//lưu lượt vote của ques
const mongoose = require('mongoose')

const questionVoteSchema = new mongoose.Schema(
    {
        type: {type: Boolean, required: true}, // upvote hoặc downvote

        //khoa ngoai
        user: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        question: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Question',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const QuestionVote = mongoose.model('QuestionVote', questionVoteSchema);
module.exports = QuestionVote;