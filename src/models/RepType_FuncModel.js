//lưu chi tiết các chức năng tùy theo loại danh tiếng
const mongoose = require('mongoose');

const repType_FuncSchema = new mongoose.Schema(
    {
        reputationType: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'ReputationType',
            require: true
        },
        function: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Function',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const RepType_Func = mongoose.model('RepType_Func', repType_FuncSchema);
module.exports = RepType_Func;
