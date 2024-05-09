const {Schema, model, default: mongoose} = require('mongoose');

const Seguidores = new Schema({
    IDSeguimiento: {
        type: Number,
        required: true
    },
    IDSeguidor: {
        type: String,
        required: true
    },
    IDSeguido: {
        type: String,
        required: true
    },
    Estatus: {
        type: Number,
        required: true
    }
})

module.exports = model('seguidores', Seguidores);