//lưu các chức năng
const mongoose = require('mongoose')

const functionSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true, unique: true},
    },
    {
        timestamps: true,
    }
);

const Function = mongoose.model('Function', functionSchema);
module.exports = Function;
