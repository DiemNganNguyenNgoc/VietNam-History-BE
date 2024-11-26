//lưu tag
const mongooes = require('mongooes')

const tagSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        usedCount: {type: Number, required: true}, //đếm lượt đã sử dụng

        //khóa ngoại
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Tag = mongooes.model('Tag', tagSchema);
module.exports = Tag;