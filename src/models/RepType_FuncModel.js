//lưu chi tiết các chức năng tùy theo loại danh tiếng
const mongooes = require('mongooes');

const repType_FuncSchema = new mongooes.Schema(
    {
        reputationType: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'ReputationType',
            require: true
        },
        function: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Function',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const RepType_Func = mongooes.model('RepType_Func', repType_FuncSchema);
module.exports = RepType_Func;
