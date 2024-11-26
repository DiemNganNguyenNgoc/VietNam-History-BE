// lưu giới tính 
const mongooes = require('mongooes')

const genderSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
    },
    {
        timestamps: true,
    }
);

const Gender = mongooes.model('Gender', genderSchema);
module.exports = Gender;