//lưu lượt report của ques
const mongooes = require('mongooes')

const questionReportSchema = new mongooes.Schema(
    {
        //khoa ngoai
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

const QuestionReport = mongooes.model('QuestionReport', questionReportSchema);
module.exports = QuestionReport;