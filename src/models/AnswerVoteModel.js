//lưu lượt vote của ans
const mongooes = require('mongooes')

const answerVoteSchema = new mongooes.Schema(
    {
        type: {type: Boolean, required: true}, // upvote hoặc downvote

        //khoa ngoai
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

const AnswerVote = mongooes.model('AnswerVote', answerVoteSchema);
module.exports = AnswerVote;