const {Schema, model, default: mongoose} = require('mongoose');

const Usuario = new Schema({
    IDUsuario: {
        type: Number,
        required: true
    },
    NombreUsuario: {
        type: String,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        required: true
    },
    Contrasena: {
        type: String,
        required: true
    },
    Foto: {
        type: String, 
        required: false 
    },
    FechaNacimiento: {
        type: Date,
        required: true
    },
    Genero: {
        type: String,
        required: true
    }
})

module.exports = model('usuarios', Usuario);