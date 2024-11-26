//lưu huyện
const mongooes = require('mongooes')

const districtSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        province: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Province',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const District = mongooes.model('District', districtSchema);
module.exports = District;
