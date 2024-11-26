//lưu các ảnh của ques
const mongoose = require('mongoose')

const questionImgsSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
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

const QuestionImgs = mongoose.model('QuestionImgs', questionImgsSchema);
module.exports = QuestionImgs;