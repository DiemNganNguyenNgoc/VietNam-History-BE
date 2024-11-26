//lưu lượt vote của ques
const mongooes = require('mongooes')

const questionVoteSchema = new mongooes.Schema(
    {
        type: {type: Boolean, required: true}, // upvote hoặc downvote

        //khoa ngoai
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        question: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Question',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const QuestionVote = mongooes.model('QuestionVote', questionVoteSchema);
module.exports = QuestionVote;