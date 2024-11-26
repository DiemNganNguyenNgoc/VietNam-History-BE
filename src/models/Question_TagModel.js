//lưu chi tiết các tag trong ques
const mongoose = require('mongoose');

const question_TagSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Question',
            require: true
        },
        tag: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Tag',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Question_Tag = mongoose.model('Question_Tag', question_TagSchema);
module.exports = Question_Tag;
