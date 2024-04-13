const {Schema, model, default: mongoose} = require('mongoose');

const Publicaciones = new Schema({
    IDPublicacion: {
        type: Number,
        required: true
    },
    Titulo: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true
    },
    IDPais: {
        type: Number,
        required: true
    },
    FechaPub: {
        type: Date,
        required: true
    },
    ImagenUno: {
        type: String, 
        required: false 
    },
    ImagenDos: {
        type: String,
        required: true
    },
    ImagenTres: {
        type: String,
        required: true
    },
    Estatus: {
        type: Number,
        required: true
    },
    IDUsuario: {
        type: Number,
        required: true
    }
})

module.exports = model('publicaciones', Publicaciones);