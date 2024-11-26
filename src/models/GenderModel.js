// lưu giới tính 
const mongoose = require('mongoose')

const genderSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
    },
    {
        timestamps: true,
    }
);

const Gender = mongoose.model('Gender', genderSchema);
module.exports = Gender;