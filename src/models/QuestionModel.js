//lưu câu hỏi
const mongooes = require('mongooes')

const questionSchema = new mongooes.Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        upVoteCount: {type: Number, required: true}, 
        downVoteCount: {type: Number, required: true},
        answerCount: {type: Number, required: true},
        view: {type: Number, required: true}, 
        reportCount: {type: Number, required: true},
        active: {type: Boolean, required: true},

        //khóa ngoại
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongooes.model('Question', questionSchema);
module.exports = Question;