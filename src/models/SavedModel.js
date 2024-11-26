//lưu các bài lưu của người dùng
const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Question',
            require: true
        },
        user: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Saved = mongoose.model('Saved', savedSchema);
module.exports = Saved;
