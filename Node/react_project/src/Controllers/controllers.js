const Usuario = require('../Schemas/Usuarios')
const { v4: uuidv4 } = require('uuid');

const insertarUsuario = async (req, res) =>{
    console.log("INSERTAR USUARIO ", req.body);
    const uuid = uuidv4();
    const usuario = new Usuario({
        IDUsuario: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        NombreUsuario: req.body.NombreUsuario,
        Nombre: req.body.Nombre,
        Correo: req.body.Correo,
        Contrasena: req.body.Contrasena,
        FechaNacimiento: req.body.FechaNacimiento,
        Genero: req.body.Genero
    })

    console.log("Usuario ", usuario);
    try {
        const usuarioSaved = await usuario.save();
        console.log("UsuarioSaved", usuarioSaved);
        res.status(201).json(usuarioSaved); 
    } catch (error) {
        console.error("Error al insertar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" }); 
    }
}

module.exports = {
    insertarUsuario
}