//lưu admin
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: String, required: true},
        img: {type: String},
        birthday: {type: Date, required: true},
        note: {type: String}, //textbox 'about me'    

        //khóa ngoại
        province: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Province',
            require: true
        },
        district: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'District',
            require: true
        },
        commune: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Commune',
            require: true
        },
        gender: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Gender',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;