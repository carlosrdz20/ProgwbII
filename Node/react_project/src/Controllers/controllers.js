const Usuario = require('../Schemas/Usuarios');
const Publicaciones = require('../Schemas/Publicaciones');
const Guardados = require('../Schemas/Guardados');
const Pais = require('../Schemas/Paises');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { crearToken } = require('../helpers/jwt_helper');

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
        const token = await crearToken({usuario});
        res.status(200).json({
          IDUsuario,
          NombreUsuario,
          Nombre,
          Correo,
          Contrasena, 
          Foto,
          FechaNacimiento,
          Genero,
          token
        });
      } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }

};

const editarUsuario = async (req, res) => {
  const { IDUsuario } = req.body; // ID del usuario a editar
  const { NombreUsuario, Nombre, Correo, Contrasena, FechaNacimiento, Genero } = req.body; // Datos actualizados del usuario
  const foto = req.file ? req.file : null;

  // Verifica si se adjuntó una nueva foto
  let fotoPath = null;
  if (req.file) {
    const uploadDir = 'public/Imagenes';
    const extension = path.extname(req.file.originalname);
    const fotoName = `foto_${uuidv4()}${extension}`;
    fotoPath = path.join(uploadDir, fotoName);
    // Aquí guardarías la foto en el servidor
    try {
      console.log("Foto agregada");
    } catch (error) {
      console.error("Error al guardar la foto:", error);
      return res.status(500).json({ error: "Error al guardar la foto" });
    }
  }

  try {
    // Buscar y actualizar el usuario en la base de datos
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { IDUsuario: IDUsuario },
      {
        NombreUsuario: NombreUsuario,
        Nombre: Nombre,
        Correo: Correo,
        Contrasena: Contrasena,
        FechaNacimiento: FechaNacimiento,
        Genero: Genero,
        // Si se adjuntó una nueva foto, actualiza la ruta de la foto
        Foto: fotoPath ? foto.filename : req.body.Foto // Si no se adjuntó una nueva foto, usa la foto existente
      },
      { new: true } // Devolver el documento actualizado en lugar del original
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
  console.log("Imágenes", req.files);
  console.log("Aquí terminan las imagenes") // Accede a req.files para obtener las imágenes

  const fotos = req.files ? req.files : [];
  let fotoPaths = [];

  if (fotos.length > 0) {
    try {
      console.log("Entramos a fotos")
                    // Itera sobre los archivos adjuntos para guardarlos y obtener los nombres de archivo
                    fotoPaths = await Promise.all(
                      fotos.map(async (foto) => {
                          const extension = path.extname(foto.originalname);
                          const fotoName = `foto_${uuidv4()}${extension}`;
                          const fotoPath = path.join(uploadDir, fotoName);
                          return fotoName; // Devuelve el nombre del archivo guardado
                      })
                  );
                  console.log("Fotos agregadas:", fotoPaths);
    } catch (error) {
        console.error("Error al guardar la foto:", error);
        return res.status(500).json({ error: "Error al guardar la foto" }); // Devuelve una respuesta de error
    }
}

  const publicacion = new Publicaciones({
      IDPublicacion: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      Titulo: req.body.Titulo,
      Descripcion: req.body.Descripcion,
      IDPais: parseInt(req.body.IDPais),
      FechaPub: new Date(),
      ImagenUno: req.files.Fotos1[0].filename,
      ImagenDos: req.files.Fotos2[0].filename,
      ImagenTres: req.files.Fotos3[0].filename,
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

  const fotos = req.files ? req.files : [];
  let fotoPaths = [];

  if (fotos.length > 0) {
    try {
      console.log("Entramos a fotos")
                    // Itera sobre los archivos adjuntos para guardarlos y obtener los nombres de archivo
                    fotoPaths = await Promise.all(
                      fotos.map(async (foto) => {
                          const extension = path.extname(foto.originalname);
                          const fotoName = `foto_${uuidv4()}${extension}`;
                          const fotoPath = path.join(uploadDir, fotoName);
                          return fotoName; // Devuelve el nombre del archivo guardado
                      })
                  );
                  console.log("Fotos agregadas:", fotoPaths);
    } catch (error) {
        console.error("Error al guardar la foto:", error);
        return res.status(500).json({ error: "Error al guardar la foto" }); // Devuelve una respuesta de error
    }
}
  // en Estatus dejare el 1 para publicación, 2 para borrador y 3 para publicación o borrador eliminado --Edgar
  const publicacion = new Publicaciones({
      IDPublicacion: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      Titulo: req.body.Titulo,
      Descripcion: req.body.Descripcion,
      IDPais: req.body.IDPais,
      FechaPub: new Date(),
      ImagenUno: req.files.Fotos1[0].filename,
      ImagenDos: req.files.Fotos2[0].filename,
      ImagenTres: req.files.Fotos3[0].filename,
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

const mostrarFavoritos = async (req, res) => {
  try {
    const userID = parseInt(req.params.IDUsuario);

    // Utiliza la agregación para filtrar las publicaciones guardadas por el usuario actual
    const publicacionesFavoritas = await Publicaciones.aggregate([
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
                    { $eq: ["$IDUsuario", userID] },
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
      // Filtra las publicaciones que han sido guardadas por el usuario actual
      { $match: { "saved.savedCount": { $gt: 0 } } },
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
          "pais.imagen": 1
        }
      }
    ]);

    res.status(200).json(publicacionesFavoritas);
  } catch (error) {
    console.error("Error al buscar publicaciones favoritas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const mostrarFavoritosFiltrados = async (req, res) => {
  const userID = parseInt(req.params.IDUsuario);
  const { pais, fechaInicio, fechaFin } = req.query;

  let matchPublicaciones = {
    Estatus: 1 // Suponiendo que solo quieres las publicaciones activas
  };

  if (pais) {
    matchPublicaciones['IDPais'] = parseInt(pais);
  }

  if (fechaInicio && fechaFin) {
    matchPublicaciones.FechaPub = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin + 'T23:59:59') };
  }

  try {
    // Utiliza la agregación para filtrar las publicaciones guardadas por el usuario actual
    const publicacionesFiltradas = await Publicaciones.aggregate([
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
      { $match: matchPublicaciones }, // Aquí puedes especificar el valor de estatus que desees mostrar

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
                    { $eq: ["$IDUsuario", userID] },
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
      // Filtra las publicaciones que han sido guardadas por el usuario actual
      { $match: { "saved.savedCount": { $gt: 0 } } },
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
          "pais.imagen": 1
        }
      }
    ]);

    res.status(200).json(publicacionesFiltradas);
  } catch (error) {
    console.error("Error al buscar publicaciones filtradas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const mostrarMisPublicaciones = async (req, res) => {
  try {
    // Utiliza la agregación para realizar un "join" entre las colecciones
    const publicacionesDelUsuario = await Publicaciones.aggregate([
      // Agrega un filtro para obtener solo las publicaciones del usuario específico
      {
        $match: {
          IDUsuario: parseInt(req.params.IDUsuario), // Filtra por el ID del usuario
          Estatus: 1 // Filtra por el estatus de la publicación si es necesario
        }
      },
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
          Saved: 1
        }
      }
    ]);

    res.status(200).json(publicacionesDelUsuario);
  } catch (error) {
    console.error("Error al buscar publicaciones del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const buscarPublicacionPorID = async (req, res) => {
  try {
    // Utiliza la agregación para realizar la búsqueda de la publicación por su ID
    const publicacion = await Publicaciones.aggregate([
      // Agrega un filtro para obtener solo la publicación con el ID especificado
      {
        $match: {
          IDPublicacion: parseInt(req.params.IDPublicacion) // Filtra por el ID de la publicación
        }
      },
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
                    { $eq: ["$IDUsuario", "$usuario.IDUsuario"] },
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
          "pais.idPais": 1,
          Saved: 1
        }
      }
    ]);

    // Verificar si se encontró la publicación
    if (publicacion.length === 0) {
      return res.status(404).json({ mensaje: "La publicación no fue encontrada" });
    }

    // Devolver la publicación encontrada
    res.status(200).json(publicacion[0]);
  } catch (error) {
    console.error("Error al buscar la publicación por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const editarPublicacion = async (req, res) => {
  console.log("Entré");
  console.log(req.body.Fotos1);
  console.log(req.body.Fotos2);
  console.log(req.body.Fotos3);
  const idPublicacion = req.body.IDPublicacion; // Suponiendo que obtienes el ID de la publicación de los parámetros de la solicitud

  // Verificar si se proporcionó un archivo de imagen
  const fotos = req.files ? req.files : [];
  let fotoPaths = [];

  if (fotos.length > 0) {
    try {
      console.log("Entramos a fotos")
                    // Itera sobre los archivos adjuntos para guardarlos y obtener los nombres de archivo
                    fotoPaths = await Promise.all(
                      fotos.map(async (foto) => {
                          const extension = path.extname(foto.originalname);
                          const fotoName = `foto_${uuidv4()}${extension}`;
                          const fotoPath = path.join(uploadDir, fotoName);
                          return fotoName; // Devuelve el nombre del archivo guardado
                      })
                  );
                  console.log("Fotos agregadas:", fotoPaths);
    } catch (error) {
        console.error("Error al guardar la foto:", error);
        return res.status(500).json({ error: "Error al guardar la foto" }); // Devuelve una respuesta de error
    }
}
  console.log("Despues de foto");
  // Crear un objeto con los campos a actualizar
  const camposActualizar = {
    Titulo: req.body.Titulo,
    Descripcion: req.body.Descripcion,
    IDPais: parseInt(req.body.IDPais),    
    FechaPub: req.body.FechaPub,
    ImagenUno: fotoPaths ? (req.files.Fotos1 ? req.files.Fotos1[0].filename : req.body.Fotos1) : req.body.Fotos1,
    ImagenDos: fotoPaths ? (req.files.Fotos2 ? req.files.Fotos2[0].filename : req.body.Fotos2) : req.body.Fotos2,
    ImagenTres: fotoPaths ? (req.files.Fotos3 ? req.files.Fotos3[0].filename : req.body.Fotos3) : req.body.Fotos3,
    Estatus: 1,
    IDUsuario: req.body.IDUsuario
  };
  console.log("Después de campo");
  try {
    // Actualizar la publicación en la base de datos
    console.log("Antes de actualizar");
    const publicacionActualizada = await Publicaciones.findByIdAndUpdate(idPublicacion, camposActualizar, { new: true });
    
    // Verificar si la publicación fue encontrada y actualizada correctamente
    if (!publicacionActualizada) {
      return res.status(404).json({ error: "La publicación no fue encontrada" });
    }
      // Actualizar otros campos de imagen si es necesario
      await publicacionActualizada.save(); // Guardar la publicación actualizada con la nueva imagen
    
    res.status(200).json(publicacionActualizada);
  } catch (error) {
    console.error("Error al editar la publicación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const borrarPublicacion = async (req, res) => {
  try {
      // Busca la publicación por su ID
      console.log("Antes de la busqueda");
      console.log(req.params.IDPublicacion);
      console.log(req.body.IDPublicacion);
      const publicacion = await Publicaciones.findOne({ IDPublicacion: req.params.IDPublicacion });
      console.log(req.params.IDPublicacion);
      console.log("Después de la busqueda");
      // Verifica si la publicación existe
      if (!publicacion) {
          return res.status(404).json({ error: 'Publicación no encontrada' });
      }
            publicacion.Estatus = 3;
            
            const publicacionActualizada = await publicacion.save();

            res.status(200).json(publicacionActualizada);
        
  } catch (error) {
      console.error('Error al borrar la publicación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const mostrarMisBorradores = async (req, res) => {
  try {
    // Utiliza la agregación para realizar un "join" entre las colecciones
    const publicacionesDelUsuario = await Publicaciones.aggregate([
      // Agrega un filtro para obtener solo las publicaciones del usuario específico
      {
        $match: {
          IDUsuario: parseInt(req.params.IDUsuario), // Filtra por el ID del usuario
          Estatus: 2 // Filtra por el estatus de la publicación si es necesario
        }
      },
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
          Saved: 1
        }
      }
    ]);

    res.status(200).json(publicacionesDelUsuario);
  } catch (error) {
    console.error("Error al buscar publicaciones del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const editarBorrador = async (req, res) => {
  console.log("Entré");
  
  const idPublicacion = req.body.IDPublicacion; // Suponiendo que obtienes el ID de la publicación de los parámetros de la solicitud

  // Verificar si se proporcionó un archivo de imagen
  const fotos = req.files ? req.files : [];
  let fotoPaths = [];

  if (fotos.length > 0) {
    try {
      console.log("Entramos a fotos")
                    // Itera sobre los archivos adjuntos para guardarlos y obtener los nombres de archivo
                    fotoPaths = await Promise.all(
                      fotos.map(async (foto) => {
                          const extension = path.extname(foto.originalname);
                          const fotoName = `foto_${uuidv4()}${extension}`;
                          const fotoPath = path.join(uploadDir, fotoName);
                          return fotoName; // Devuelve el nombre del archivo guardado
                      })
                  );
                  console.log("Fotos agregadas:", fotoPaths);
    } catch (error) {
        console.error("Error al guardar la foto:", error);
        return res.status(500).json({ error: "Error al guardar la foto" }); // Devuelve una respuesta de error
    }
}
  console.log("Despues de foto");
  // Crear un objeto con los campos a actualizar
  const camposActualizar = {
    Titulo: req.body.Titulo,
    Descripcion: req.body.Descripcion,
    IDPais: parseInt(req.body.IDPais),    
    FechaPub: req.body.FechaPub,
    ImagenUno: fotoPaths ? (req.files.Fotos1 ? req.files.Fotos1[0].filename : req.body.Fotos1) : req.body.Fotos1,
    ImagenDos: fotoPaths ? (req.files.Fotos2 ? req.files.Fotos2[0].filename : req.body.Fotos2) : req.body.Fotos2,
    ImagenTres: fotoPaths ? (req.files.Fotos3 ? req.files.Fotos3[0].filename : req.body.Fotos3) : req.body.Fotos3,
    Estatus: 2,
    IDUsuario: req.body.IDUsuario
  };
  console.log("Después de campo");
  try {
    // Actualizar la publicación en la base de datos
    console.log("Antes de actualizar");
    const publicacionActualizada = await Publicaciones.findByIdAndUpdate(idPublicacion, camposActualizar, { new: true });
    
    // Verificar si la publicación fue encontrada y actualizada correctamente
    if (!publicacionActualizada) {
      return res.status(404).json({ error: "La publicación no fue encontrada" });
    }
      // Actualizar otros campos de imagen si es necesario
      await publicacionActualizada.save(); // Guardar la publicación actualizada con la nueva imagen
    
    res.status(200).json(publicacionActualizada);
  } catch (error) {
    console.error("Error al editar la publicación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const enviarPublicacion = async (req, res) => {
  try {
      // Busca la publicación por su ID
      console.log("Antes de la busqueda");
      console.log(req.params.IDPublicacion);
      console.log(req.body.IDPublicacion);
      const publicacion = await Publicaciones.findOne({ IDPublicacion: req.params.IDPublicacion });
      console.log(req.params.IDPublicacion);
      console.log("Después de la busqueda");
      // Verifica si la publicación existe
      if (!publicacion) {
          return res.status(404).json({ error: 'Publicación no encontrada' });
      }
            publicacion.Estatus = 1;
            
            const publicacionActualizada = await publicacion.save();

            res.status(200).json(publicacionActualizada);
        
  } catch (error) {
      console.error('Error al borrar la publicación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
    insertarUsuario,
    autenticarUsuario,
    buscarPaises,
    insertarPublicacion,
    mostrarPublicaciones,
    insertarBorrador,
    insertarGuardado,
    mostrarFavoritos,
    mostrarFavoritosFiltrados,
    editarUsuario,
    mostrarMisPublicaciones,
    buscarPublicacionPorID,
    editarPublicacion,
    borrarPublicacion,
    mostrarMisBorradores,
    editarBorrador,
    enviarPublicacion
}