//lưu người theo dõi
const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
    {
        follow: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        followed: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;
