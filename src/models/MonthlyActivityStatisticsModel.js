//lưu thống kê hoạt động của tất cả các user
const mongoose = require('mongoose')

const monthlyActivityStatisticsSchema = new mongoose.Schema(
    {
        month: {type: Number, required: true}, 
        year: {type: Number, required: true},
        registrationCount: {type: Number, required: true},
        quesCount: {type: Number, required: true},
        ansCount: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

const MonthlyActivityStatistics = mongoose.model('MonthlyActivityStatistics', monthlyActivityStatisticsSchema);
module.exports = MonthlyActivityStatistics;