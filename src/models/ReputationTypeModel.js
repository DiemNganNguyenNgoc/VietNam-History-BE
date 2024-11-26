//lưu loại danh tiếng
const mongooes = require('mongooes')

const reputationTypeSchema = new mongooes.Schema(
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

const ReputationType = mongooes.model('ReputationType', reputationTypeSchema);
module.exports = ReputationType;
