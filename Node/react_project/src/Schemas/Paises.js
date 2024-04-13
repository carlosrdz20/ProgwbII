const {Schema, model, default: mongoose} = require('mongoose');

const Paises = new Schema({
    pais: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    idPais: {
        type: Number,
        required: true
    }
})

module.exports = model('paises', Paises);