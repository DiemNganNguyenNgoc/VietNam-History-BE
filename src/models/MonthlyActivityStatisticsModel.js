//lưu thống kê hoạt động của tất cả các user
const mongoose = require('mongoose')

const monthlyActivityStatisticsSchema = new mongoose.Schema(
    {
        month: {type: Number, required: true}, 
        year: {type: Number, required: true},
        registrationCount: {type: Number, default: 0},
        quesCount: {type: Number, default: 0},
        ansCount: {type: Number, default: 0},
    },
    {
        timestamps: true,
    }
);

const MonthlyActivityStatistics = mongoose.model('MonthlyActivityStatistics', monthlyActivityStatisticsSchema);
module.exports = MonthlyActivityStatistics;