//lưu câu trả lời
const mongooes = require('mongooes');

const answerSchema = new mongooes.Schema(
    {
        content: {type: String, required: true},
        upVoteCount: {type: Number, required: true}, 
        downVoteCount: {type: Number, required: true},
        commentCount: {type: Number, required: true},
        view: {type: Number, required: true}, 
        reportCount: {type: Number, required: true},
        active: {type: Boolean, required: true},

        //khóa ngoại
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

const Answer = mongooes.model('Answer', answerSchema);
module.exports = Answer;