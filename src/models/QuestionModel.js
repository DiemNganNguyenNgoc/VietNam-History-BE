//lưu câu hỏi
const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
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
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;