//lưu các ảnh của ques
const mongooes = require('mongooes')

const questionImgsSchema = new mongooes.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
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

const QuestionImgs = mongooes.model('QuestionImgs', questionImgsSchema);
module.exports = QuestionImgs;