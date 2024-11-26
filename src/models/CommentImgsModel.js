//lưu các ảnh của cmt
const mongoose = require('mongoose')

const commentImgsSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
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

const CommentImgs = mongoose.model('CommentImgs', commentImgsSchema);
module.exports = CommentImgs;