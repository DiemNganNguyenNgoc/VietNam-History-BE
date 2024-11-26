//lưu xã
const mongoose = require('mongoose')

const communeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        district: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'District',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Commune = mongoose.model('Commune', communeSchema);
module.exports = Commune;
