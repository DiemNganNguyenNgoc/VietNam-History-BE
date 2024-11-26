//lưu tỉnh
const mongooes = require('mongooes')

const provinceSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
    },
    {
        timestamps: true,
    }
);

const Province = mongooes.model('Province', provinceSchema);
module.exports = Province;