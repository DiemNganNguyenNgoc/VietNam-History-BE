//lưu xã
const mongooes = require('mongooes')

const communeSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        district: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'District',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Commune = mongooes.model('Commune', communeSchema);
module.exports = Commune;
