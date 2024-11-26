//lưu admin
const mongooes = require('mongooes')

const userSchema = new mongooes.Schema(
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
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Province',
            require: true
        },
        district: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'District',
            require: true
        },
        commune: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Commune',
            require: true
        },
        gender: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Gender',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const User = mongooes.model('User', userSchema);
module.exports = User;