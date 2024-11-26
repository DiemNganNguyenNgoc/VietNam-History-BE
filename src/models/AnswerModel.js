//lưu câu trả lời
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
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

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;