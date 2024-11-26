//lưu các bài lưu của người dùng
const mongooes = require('mongooes');

const savedSchema = new mongooes.Schema(
    {
        question: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Question',
            require: true
        },
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Saved = mongooes.model('Saved', savedSchema);
module.exports = Saved;
