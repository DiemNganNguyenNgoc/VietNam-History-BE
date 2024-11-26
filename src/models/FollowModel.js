//lưu người theo dõi
const mongooes = require('mongooes');

const followSchema = new mongooes.Schema(
    {
        follow: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        followed: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Follow = mongooes.model('Follow', followSchema);
module.exports = Follow;
