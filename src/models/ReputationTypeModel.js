//lưu loại danh tiếng
const mongoose = require('mongoose')

const reputationTypeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        minScore: {type: Number, required: true},
        maxScore: {type: Number, required: true},
        note: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const ReputationType = mongoose.model('ReputationType', reputationTypeSchema);
module.exports = ReputationType;
