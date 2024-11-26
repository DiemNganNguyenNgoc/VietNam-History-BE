//lưu các ảnh của ans
const mongooes = require('mongooes')

const answerImgsSchema = new mongooes.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
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

const AnswerImgs = mongooes.model('AnswerImgs', answerImgsSchema);
module.exports = AnswerImgs;