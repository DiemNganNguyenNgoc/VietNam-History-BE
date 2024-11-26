//lưu lượt báo cáo của ans
const mongooes = require('mongooes')

const answerReportSchema = new mongooes.Schema(
    {
        //khoa ngoai
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
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

const AnswerReport = mongooes.model('AnswerReport', answerReportSchema);
module.exports = AnswerReport;