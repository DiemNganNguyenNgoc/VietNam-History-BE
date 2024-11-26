//lưu các ảnh của cmt
const mongooes = require('mongooes')

const commentImgsSchema = new mongooes.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
        comment: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Comment',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const CommentImgs = mongooes.model('CommentImgs', commentImgsSchema);
module.exports = CommentImgs;