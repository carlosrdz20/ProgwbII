const {Schema, model, default: mongoose} = require('mongoose');

const Guardados = new Schema({
    IDGuardado: {
        type: Number,
        required: true
    },
    IDPublicacion: {
        type: Number,
        required: true
    },
    IDUsuario: {
        type: Number,
        required: true
    },
    Estatus: {
        type: Number,
        required: true
    }
})

module.exports = model('guardados', Guardados);