//lưu lượt vote của cmt
const mongooes = require('mongooes')

const commentReportSchema = new mongooes.Schema(
    {
        //khoa ngoai
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        comment: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Comment',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const CommentReport = mongooes.model('CommentReport', commentReportSchema);
module.exports = CommentReport;