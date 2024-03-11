const Usuario = require('../Schemas/Usuarios')
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const insertarUsuario = async (req, res) => {
  console.log("INSERTAR USUARIO ", req.body);
  console.log("Foto", req.file); // Accede a req.file en lugar de req.files.Foto
  
  // Verifica si se adjuntó un archivo antes de acceder a sus propiedades
  const foto = req.file ? req.file : null;
  let fotoPath = null;
  if (foto) {
      const uploadDir = 'uploads/usuarios'; 
      const extension = path.extname(foto.originalname);
      const fotoName = `foto_${uuidv4()}${extension}`;
      fotoPath = path.join(uploadDir, fotoName);
      console.log(fotoPath);

      try {
          console.log("Foto agregada");
      } catch (error) {
          console.error("Error al guardar la foto:", error);
          return res.status(500).json({ error: "Error al guardar la foto" }); // Devuelve una respuesta de error
      }
  }

  const usuario = new Usuario({
      IDUsuario: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      NombreUsuario: req.body.NombreUsuario,
      Nombre: req.body.Nombre,
      Correo: req.body.Correo,
      Contrasena: req.body.Contrasena,
      FechaNacimiento: req.body.FechaNacimiento,
      Genero: req.body.Genero,
      Foto: fotoPath
  });

  console.log("Usuario ", usuario);
  try {
      const usuarioSaved = await usuario.save();
      console.log("UsuarioSaved", usuarioSaved);
      res.status(201).json(usuarioSaved); 
  } catch (error) {
      console.error("Error al insertar usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" }); 
  }
};


const autenticarUsuario = async (req, res) =>{

    const {email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({ Correo: email, Contrasena: password });
    
        if (!usuario) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }
    
        const {IDUsuario, NombreUsuario, Nombre, Correo, Foto, Contrasena, FechaNacimiento, Genero } = usuario;
        res.status(200).json({
          IDUsuario,
          NombreUsuario,
          Nombre,
          Correo,
          Contrasena, 
          Foto,
          FechaNacimiento,
          Genero
        });
      } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }

};


module.exports = {
    insertarUsuario,
    autenticarUsuario
}