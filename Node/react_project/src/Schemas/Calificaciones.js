const {Schema, model, default: mongoose} = require('mongoose');

const Calificaciones = new Schema({
    IDCalificacion: {
        type: Number,
        required: true
    },
    IDUsuario: {
        type: Number,
        required: true
    },
    IDPublicacion: {
        type: Number,
        required: true
    },
    Calificacion: {
        type: Number,
        required: true
    }
})

module.exports = model('calificaciones', Calificaciones);