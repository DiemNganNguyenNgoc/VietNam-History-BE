//lưu huyện
const mongoose = require('mongoose')

const districtSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        province: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Province',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const District = mongoose.model('District', districtSchema);
module.exports = District;
