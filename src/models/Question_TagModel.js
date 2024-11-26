//lưu chi tiết các tag trong ques
const mongooes = require('mongooes');

const question_TagSchema = new mongooes.Schema(
    {
        question: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Question',
            require: true
        },
        tag: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Tag',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Question_Tag = mongooes.model('Question_Tag', question_TagSchema);
module.exports = Question_Tag;
