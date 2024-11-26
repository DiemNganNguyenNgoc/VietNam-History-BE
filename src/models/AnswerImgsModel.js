//lưu các ảnh của ans
const mongoose = require('mongoose')

const answerImgsSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
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

const AnswerImgs = mongoose.model('AnswerImgs', answerImgsSchema);
module.exports = AnswerImgs;