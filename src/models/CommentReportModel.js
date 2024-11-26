//lưu lượt vote của cmt
const mongoose = require('mongoose')

const commentReportSchema = new mongoose.Schema(
    {
        //khoa ngoai
        user: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        comment: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Comment',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const CommentReport = mongoose.model('CommentReport', commentReportSchema);
module.exports = CommentReport;