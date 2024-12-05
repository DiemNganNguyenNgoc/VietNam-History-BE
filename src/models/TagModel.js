//lưu tag
const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        usedCount: {type: Number, default: 0}, //đếm lượt đã sử dụng

        //khóa ngoại
        // user: {
        //     type: mongoose.Schema.Types.Objectid, 
        //     ref: 'User',
        //     require: true
        // },
    },
    {
        timestamps: true,
    }
);

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;