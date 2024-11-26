//lưu các chức năng
const mongooes = require('mongooes')

const functionSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true, unique: true},
    },
    {
        timestamps: true,
    }
);

const Function = mongooes.model('Function', functionSchema);
module.exports = Function;
