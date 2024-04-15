const Usuario = require('../Schemas/Usuarios');
const Publicaciones = require('../Schemas/Publicaciones');
const Guardados = require('../Schemas/Guardados');
const Pais = require('../Schemas/Paises');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

//Usuarios
const insertarUsuario = async (req, res) => {
  console.log("INSERTAR USUARIO ", req.body);
  console.log("Foto", req.file); // Accede a req.file en lugar de req.files.Foto
  
  // Verifica si se adjuntó un archivo antes de acceder a sus propiedades
  const foto = req.file ? req.file : null;
  let fotoPath = null;
  if (foto) {
      const uploadDir = 'public/Imagenes'; 
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
      Foto: foto.filename
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

//Paises
const buscarPaises = async (req, res) => {
  try {
    // Realiza la búsqueda de todos los países en la colección
    const paises = await Pais.find();

    res.status(200).json(paises); // Retorna los países encontrados como respuesta
  } catch (error) {
    console.error("Error al buscar países:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


//Publicaciones

const insertarPublicacion = async (req, res) => {
  console.log("INSERTAR PUBLICACIÓN ", req.body);
  console.log("Imágenes", req.files); // Accede a req.files para obtener las imágenes

  const foto = req.file ? req.file : null;
  let fotoPath = null;

  if (foto) {
    const uploadDir = 'public/Imagenes'; 
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

  const publicacion = new Publicaciones({
      IDPublicacion: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      Titulo: req.body.Titulo,
      Descripcion: req.body.Descripcion,
      IDPais: req.body.IDPais,
      FechaPub: new Date(),
      ImagenUno: foto.filename,
      ImagenDos: foto.filename,
      ImagenTres: foto.filename,
      Estatus: 1,
      IDUsuario: req.body.IDUsuario
  });

  console.log("Publicación ", publicacion);
  try {
      const publicacionSaved = await publicacion.save();
      console.log("Publicación guardada:", publicacionSaved);
      res.status(201).json(publicacionSaved);
  } catch (error) {
      console.error("Error al insertar la publicación:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
};

const insertarBorrador = async (req, res) => {
  console.log("INSERTAR BORRADOR ", req.body);
  console.log("Imágenes", req.files); // Accede a req.files para obtener las imágenes

  const foto = req.file ? req.file : null;
  let fotoPath = null;

  if (foto) {
    const uploadDir = 'public/Imagenes'; 
    const extension = path.extname(foto.originalname);
    const fotoName = `foto_${uuidv4()}${extension}`;
    fotoPath = path.join(uploadDir, fotoName);
    console.log(fotoPath);

    try {
        console.log("Foto borrador agregada");
    } catch (error) {
        console.error("Error al guardar la foto del borrador:", error);
        return res.status(500).json({ error: "Error al guardar la foto del borrador." }); // Devuelve una respuesta de error
    }
}
  // en Estatus dejare el 1 para publicación, 2 para borrador y 3 para publicación o borrador eliminado --Edgar
  const publicacion = new Publicaciones({
      IDPublicacion: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      Titulo: req.body.Titulo,
      Descripcion: req.body.Descripcion,
      IDPais: req.body.IDPais,
      FechaPub: new Date(),
      ImagenUno: foto.filename,
      ImagenDos: foto.filename,
      ImagenTres: foto.filename,
      Estatus: 2,
      IDUsuario: req.body.IDUsuario
  });

  console.log("Borrador guardado: ", publicacion);
  try {
      const publicacionSaved = await publicacion.save();
      console.log("Borrador guardado:", publicacionSaved);
      res.status(201).json(publicacionSaved);
  } catch (error) {
      console.error("Error al insertar el borrador:", error);
      res.status(500).json({ error: "Error interno del servidor al guardar el borrador." });
  }
};

const mostrarPublicaciones = async (req, res) => {
  try {
    // Utiliza la agregación para realizar un "join" entre las colecciones
    const publicacionesConUsuariosYPaises = await Publicaciones.aggregate([
      // Realiza un "lookup" para unir la colección de usuarios
      {
        $lookup: {
          from: "usuarios", 
          localField: "IDUsuario", 
          foreignField: "IDUsuario", 
          as: "usuario" 
        }
      },
      
      { $unwind: "$usuario" },
      
      {
        $lookup: {
          from: "paises", 
          localField: "IDPais", 
          foreignField: "idPais", 
          as: "pais"
        }
      },
      
      { $unwind: "$pais" },

      // Filtra las publicaciones por el atributo "Estatus"
      { $match: { Estatus: 1 } }, // Aquí puedes especificar el valor de estatus que desees mostrar

      // Agrega el campo "Tipo" basado en la condición proporcionada
      {
        $addFields: {
          Tipo: {
            $cond: { 
              if: { $eq: ["$usuario.IDUsuario", parseInt(req.params.IDUsuario)] }, 
              then: "Propio", 
              else: "Ajeno" 
            }
          }
        }
      },

      //Buscar si el usuario ha guardado la publicación para mandar un Saved en true o false y rellenar el corazón o no
      // Realiza una búsqueda en el documento "guardados" para verificar si el usuario ha guardado la publicación
      {
        $lookup: {
          from: "guardados",
          let: { pubId: "$IDPublicacion" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", parseInt(req.params.IDUsuario)] },
                    { $eq: ["$Estatus", 1] }
                  ]
                }
              }
            },
            { $count: "savedCount" }
          ],
          as: "saved"
        }
      },
      // Agrega el campo "Saved" basado en si se encontró un registro en "guardados"
      {
        $addFields: {
          Saved: { $gt: [{ $size: "$saved" }, 0] }
        }
      },
      //
      
      {
        $project: {
          _id: 1,
          IDPublicacion: 1,
          Titulo: 1,
          Descripcion: 1,
          FechaPub: 1,
          ImagenUno: 1,
          ImagenDos: 1,
          ImagenTres: 1,
          Estatus: 1,
          "usuario.NombreUsuario": 1, 
          "usuario.Foto": 1, 
          "pais.pais": 1, 
          "pais.imagen": 1,
          Tipo: 1,
          Saved: 1
        }
      }
    ]);

    res.status(200).json(publicacionesConUsuariosYPaises);
  } catch (error) {
    console.error("Error al buscar publicaciones con usuarios y países:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Guardados
const insertarGuardado = async (req, res) => {
  console.log("INSERTAR GUARDADO ", req.body);
  const { IDPublicacion, IDUsuario } = req.body;

  try {
    // Verificar si ya existe un registro de guardado para esta publicación y usuario
    let guardadoExistente = await Guardados.findOne({ IDPublicacion, IDUsuario });

    if (guardadoExistente) {
      // Si existe un registro, actualiza el campo de estatus
      guardadoExistente.Estatus = guardadoExistente.Estatus === 1 ? 2 : 1;
      await guardadoExistente.save();
      console.log("Guardado actualizado:", guardadoExistente);
      res.status(200).json(guardadoExistente);
    } else {
      // Si no existe un registro, crea uno nuevo con el estatus 1
      // en Estatus dejare el 1 para publicación, 2 para borrador y 3 para publicación o borrador eliminado --Edgar
      const guardado = new Guardados({
        IDGuardado: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        IDPublicacion: req.body.IDPublicacion,
        Estatus: 1,
        IDUsuario: req.body.IDUsuario
      });

      console.log("Guardado salvado: ", guardado);
      try {
        const guardadoSaved = await guardado.save();
        console.log("Guardado salvado:", guardadoSaved);
        res.status(201).json(guardadoSaved);
      } catch (error) {
        console.error("Error al insertar el guardado:", error);
        res.status(500).json({ error: "Error interno del servidor al salvar el guardado." });
      }
    }
  } catch (error) {
    console.error("Error al insertar o actualizar el guardado:", error);
    res.status(500).json({ error: "Error interno del servidor al salvar el guardado." });
  }
};



module.exports = {
    insertarUsuario,
    autenticarUsuario,
    buscarPaises,
    insertarPublicacion,
    mostrarPublicaciones,
    insertarBorrador,
    insertarGuardado
}