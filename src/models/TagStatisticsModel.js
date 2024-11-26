//lưu thống kê hoạt động của tất cả các user
const mongoose = require('mongoose')

const tagStatisticsSchema = new mongoose.Schema(
    {
        month: {type: Number, required: true}, 
        year: {type: Number, required: true},
        quesNotAnsCount: {type: Number, required: true},
        quesCount: {type: Number, required: true},
        ansCount: {type: Number, required: true},
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

const tagStatistics = mongoose.model('TagStatistics', tagStatisticsSchema);
module.exports = tagStatistics;