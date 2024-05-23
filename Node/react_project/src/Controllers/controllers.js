const Usuario = require('../Schemas/Usuarios');
const Publicaciones = require('../Schemas/Publicaciones');
const Guardados = require('../Schemas/Guardados');
const Pais = require('../Schemas/Paises');
const Rating = require('../Schemas/Calificaciones')
const Seguidores = require('../Schemas/Seguidores')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { crearToken } = require('../helpers/jwt_helper');
const Calificaciones = require('../Schemas/Calificaciones');
const mongoose = require('mongoose');


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

   // Validaciones
   const nombreUsuarioRegex = /^[^\s]+$/; 
   const nombreRegex = /^[a-zA-Z\s]+$/; 
   const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{6,}$/; 
 
   if (!nombreUsuarioRegex.test(req.body.NombreUsuario)) {
     return res.status(400).json({ error: "El Nombre de Usuario no debe contener espacios" });
   }
 
   if (!nombreRegex.test(req.body.Nombre)) {
     return res.status(400).json({ error: "El Nombre debe contener solo letras y espacios" });
   }
 
   if (!correoRegex.test(req.body.Correo)) {
     return res.status(400).json({ error: "El Correo electrónico debe tener un formato válido" });
   }
 
   if (req.body.Contrasena.includes(" ") || !passwordRegex.test(req.body.Contrasena)) {
     return res.status(400).json({ error: "La Contraseña debe contener al menos una mayúscula, una minúscula, un dígito, un carácter especial y ser mayor a 6 caracteres" });
   }
 
   if (!foto) {
     return res.status(400).json({ error: "La Foto es requerida" });
   }
 
   
   if (!req.body.FechaNacimiento || !req.body.Genero) {
     return res.status(400).json({ error: "Fecha de Nacimiento y Género son campos obligatorios" });
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
    

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(401).json({ error: "Por favor ingresa un correo electrónico válido" });
  }
  
  // Validación de la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{6,}$/;
  if (password.length < 6 || password.includes(" ") || !passwordRegex.test(password)) {
    return res.status(401).json({ error: "La contraseña debe contener al menos una mayúscula, una minúscula, un dígito, un carácter especial y ser mayor a 6 caracteres" });
  }

    try {
        const usuario = await Usuario.findOne({ Correo: email, Contrasena: password });
    
        if (!usuario) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }
    
        const {IDUsuario, NombreUsuario, Nombre, Correo, Foto, Contrasena, FechaNacimiento, Genero, _id } = usuario;
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
          token,
          _id
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

  const nombreUsuarioRegex = /^[^\s]+$/; 
  const nombreRegex = /^[a-zA-Z\s]+$/; 
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{6,}$/; 

  if (!nombreUsuarioRegex.test(NombreUsuario)) {
    return res.status(400).json({ error: "El Nombre de Usuario no debe contener espacios" });
  }

  if (!nombreRegex.test(Nombre)) {
    return res.status(400).json({ error: "El Nombre debe contener solo letras y espacios" });
  }

  if (!correoRegex.test(Correo)) {
    return res.status(400).json({ error: "El Correo electrónico debe tener un formato válido" });
  }

  if (Contrasena.includes(" ") || !passwordRegex.test(Contrasena)) {
    return res.status(400).json({ error: "La Contraseña debe contener al menos una mayúscula, una minúscula, un dígito, un carácter especial y ser mayor a 6 caracteres" });
  }
  
  if (!FechaNacimiento || !Genero) {
    return res.status(400).json({ error: "Fecha de Nacimiento y Género son campos obligatorios" });
  }

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

  if (!NombreUsuario || !Nombre || !Correo || !Contrasena || !FechaNacimiento || !Genero) {
    return res.status(400).json({ error: "Todos los campos son requeridos, por favor completalos" });
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

const busquedaAjeno = async (req, res) => {
  const { userId, sessionID } = req.query; 

  try {
    
    const usuario = await Usuario.findOne({ _id: userId });

    if (!usuario) {
      
      return res.status(404).json({ error: 'Usuario no encontrado', seguidores: 0, seguidos: 0, sigue: 0 });
    }

  
    const seguidores = await Seguidores.countDocuments({ IDSeguido: userId, Estatus: 1 }).catch(() => 0);

    const seguidos = await Seguidores.countDocuments({ IDSeguidor: userId, Estatus: 1 }).catch(() => 0);

    let sigue = await Seguidores.exists({ IDSeguidor: sessionID, IDSeguido: userId });

    if (sigue) {
      
      const relacionSeguimiento = await Seguidores.findOne({ IDSeguidor: sessionID, IDSeguido: userId });

      
      if (relacionSeguimiento.Estatus === 0) {
        
        sigue = 0;
        return res.status(200).json({ usuario, seguidores: 0, seguidos: 0, sigue });
      }else{
        sigue = 1;
        return res.status(200).json({ usuario, seguidores, seguidos, sigue });
      }
    }

    
    res.status(200).json({ usuario, seguidores, seguidos, sigue });
  } catch (error) {
    console.error('Error al buscar usuario:', error);
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
  console.log("Imágenes", req.files);
  console.log("Aquí terminan las imagenes") // Accede a req.files para obtener las imágenes

  const { Titulo, Descripcion, IDPais, IDUsuario } = req.body;

  if(!Titulo){
    return res.status(400).json({ error: "El campo de titulo no puede estar vacio" });
  }
  if(!Descripcion){
    return res.status(400).json({ error: "El campo de descripción no puede estar vacio" });
  }
  if(!IDPais){
    return res.status(400).json({ error: "Por favor selecciona un país" });
  }
  if(!IDUsuario){
    return res.status(400).json({ error: "No se encontró un usuario para agregar a la publicación" });
  }



  const fotos = req.files ? req.files : [];
  let fotoPaths = [];
  
  if (!req.files || !req.files.Fotos1 || !req.files.Fotos1[0] || !req.files.Fotos1[0].filename) {
    return res.status(400).json({ error: "Por favor agrega la primera foto" });
  }
  
  if (!req.files.Fotos2 || !req.files.Fotos2[0] || !req.files.Fotos2[0].filename) {
    return res.status(400).json({ error: "Por favor agrega la segunda foto" });
  }
  
  if (!req.files.Fotos3 || !req.files.Fotos3[0] || !req.files.Fotos3[0].filename) {
    return res.status(400).json({ error: "Por favor agrega la tercer foto" });
  }

  let contador = 0;
  if (fotos.length > 0) {
    try {
      console.log("Entramos a fotos")
                    // Itera sobre los archivos adjuntos para guardarlos y obtener los nombres de archivo
                    fotoPaths = await Promise.all(
                      fotos.map(async (foto) => {
                          const extension = path.extname(foto.originalname);
                          const fotoName = `foto_${uuidv4()}${extension}`;
                          //const fotoPath = path.join(uploadDir, fotoName);
                          contador++;
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

  const { Titulo, Descripcion, IDPais, IDUsuario } = req.body;

  if(!Titulo){
    return res.status(400).json({ error: "El campo de titulo no puede estar vacio" });
  }
  if(!Descripcion){
    return res.status(400).json({ error: "El campo de descripción no puede estar vacio" });
  }
  if(!IDPais){
    return res.status(400).json({ error: "Por favor selecciona un país" });
  }
  if(!IDUsuario){
    return res.status(400).json({ error: "No se encontró un usuario para agregar a la publicación" });
  }



  const fotos = req.files ? req.files : [];
  let fotoPaths = [];
  
  if (!req.files || !req.files.Fotos1 || !req.files.Fotos1[0] || !req.files.Fotos1[0].filename) {
    return res.status(400).json({ error: "Por favor agrega la primera foto" });
  }
  
  if (!req.files.Fotos2 || !req.files.Fotos2[0] || !req.files.Fotos2[0].filename) {
    return res.status(400).json({ error: "Por favor agrega la segunda foto" });
  }
  
  if (!req.files.Fotos3 || !req.files.Fotos3[0] || !req.files.Fotos3[0].filename) {
    return res.status(400).json({ error: "Por favor agrega la tercer foto" });
  }

  if (fotos.length > 0) {
    try {
      console.log("Entramos a fotos")
                    // Itera sobre los archivos adjuntos para guardarlos y obtener los nombres de archivo
                    fotoPaths = await Promise.all(
                      fotos.map(async (foto) => {
                          const extension = path.extname(foto.originalname);
                          const fotoName = `foto_${uuidv4()}${extension}`;
                          //const fotoPath = path.join(uploadDir, fotoName);
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const totalPublicaciones = await Publicaciones.countDocuments({ Estatus: 1 });
    const totalPages = Math.ceil(totalPublicaciones / limit);
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
      { $match: { Estatus: 1 } },
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
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: parseInt(req.params.IDUsuario) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
        }
      },
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
          "usuario._id": 1,
          "usuario.NombreUsuario": 1, 
          "usuario.Foto": 1, 
          "pais.pais": 1, 
          "pais.imagen": 1,
          Tipo: 1,
          Saved: 1,
          // Eliminamos la proyección de Calificado
          PromedioCalificaciones: 1,
          // Incluimos la calificación del usuario
          Calificacion: 1
        }
      },
      { $sort: { FechaPub: -1 } }
    ])
    .skip((page-1)*limit)
    .limit(limit);
    

    const publicacionesConSeguimiento = await Promise.all(publicacionesConUsuariosYPaises.map(async (publicacion) => {
      // Realizar la consulta adicional para verificar el seguimiento
      const sigue = await Seguidores.exists({
        IDSeguidor: req.params._idUsuario,
        IDSeguido: publicacion.usuario._id,
        Estatus: 1
      });

      // Establecer el valor de SigueUsuario basado en el resultado de la consulta adicional
      return {
        ...publicacion,
        SigueUsuario: sigue ? 1 : 0
      };
    }));

    console.log("Publicaciones con seguimiento de usuario:", publicacionesConSeguimiento);

    res.status(200).json({
      publicaciones: publicacionesConSeguimiento,
      totalPages: totalPages
    });
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

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

      // Aquí había una coma extra, la he eliminado
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: parseInt(req.params.IDUsuario) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
        }
      },
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
          "usuario._id": 1,
          "pais.pais": 1,
          "pais.imagen": 1,
          PromedioCalificaciones: 1,
          Calificacion: 1
        }
      }
    ]);

    const publicacionesConSeguimiento = await Promise.all(publicacionesFavoritas.map(async (publicacion) => {
      // Realizar la consulta adicional para verificar el seguimiento
      const sigue = await Seguidores.exists({
        IDSeguidor: req.params._idUsuarioS,
        IDSeguido: publicacion.usuario._id,
        Estatus: 1
      });

      // Establecer el valor de SigueUsuario basado en el resultado de la consulta adicional
      return {
        ...publicacion,
        SigueUsuario: sigue ? 1 : 0
      };
    }));

    // Calcula el índice de inicio y final para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Segmenta las publicaciones según la paginación
    const paginatedPublicaciones = publicacionesConSeguimiento.slice(startIndex, endIndex);

    // Calcula el total de páginas
    const totalPages = Math.ceil(publicacionesConSeguimiento.length / limit);

    res.status(200).json({
      publicaciones: paginatedPublicaciones,
      totalPages: totalPages
    });
  } catch (error) {
    console.error("Error al buscar publicaciones favoritas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const mostrarFavoritosFiltrados = async (req, res) => {
  try {
    const userID = parseInt(req.params.IDUsuario);
    const { pais, fechaInicio, fechaFin } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    let matchPublicaciones = {
      Estatus: 1 // Suponiendo que solo quieres las publicaciones activas
    };

    if (pais) {
      matchPublicaciones['IDPais'] = parseInt(pais);
    }

    if (fechaInicio && fechaFin) {
      matchPublicaciones.FechaPub = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin + 'T23:59:59') };
      console.log("Match: ", matchPublicaciones);
    }

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
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: userID },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
        }
      },
      { $match: matchPublicaciones },
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
          "usuario._id": 1,
          "pais.pais": 1,
          "pais.imagen": 1,
          PromedioCalificaciones: 1,
          Calificacion: 1
        }
      },
      { $sort: { FechaPub: -1 } }
    ]);
    console.log("Publicaciones: " ,publicacionesFiltradas);
    const publicacionesConSeguimiento = await Promise.all(publicacionesFiltradas.map(async (publicacion) => {
      // Realizar la consulta adicional para verificar el seguimiento
      const sigue = await Seguidores.exists({
        IDSeguidor: req.params._idUsuarioS,
        IDSeguido: publicacion.usuario._id,
        Estatus: 1
      });

      // Establecer el valor de SigueUsuario basado en el resultado de la consulta adicional
      return {
        ...publicacion,
        SigueUsuario: sigue ? 1 : 0
      };
    }));

    // Calcula el índice de inicio y final para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Segmenta las publicaciones según la paginación
    const paginatedPublicaciones = publicacionesConSeguimiento.slice(startIndex, endIndex);

    // Calcula el total de páginas
    const totalPages = Math.ceil(publicacionesConSeguimiento.length / limit);

    res.status(200).json({
      publicaciones: paginatedPublicaciones,
      totalPages: totalPages
    });
  } catch (error) {
    console.error("Error al buscar publicaciones favoritas filtradas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



const mostrarMisPublicaciones = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
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
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: parseInt(req.params.IDUsuario) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
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
          Saved: 1,
          PromedioCalificaciones: 1,
          Calificacion: 1
        }
      },
      { $sort: { FechaPub: -1 } }
    ]);

    // Calcula el índice de inicio y final para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Segmenta las publicaciones según la paginación
    const paginatedPublicaciones = publicacionesDelUsuario.slice(startIndex, endIndex);

    // Calcula el total de páginas
    const totalPages = Math.ceil(publicacionesDelUsuario.length / limit);

    // Envía la respuesta JSON con las publicaciones paginadas y el total de páginas
    res.status(200).json({
      publicaciones: paginatedPublicaciones,
      totalPages: totalPages
    });

  } catch (error) {
    console.error("Error al buscar publicaciones del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const mpubAjeno = async (req, res) => {
  try {
    
    // Buscar el usuario por su IDUsuario
    const usuario = await Usuario.findOne({ _id: req.params.IDUsuarioAjeno });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtener el IDUsuario del usuario encontrado
    const userID = usuario.IDUsuario;

    // Realizar la agregación para obtener las publicaciones del usuario
    const publicacionesDelUsuario = await Publicaciones.aggregate([
      // Agrega un filtro para obtener solo las publicaciones del usuario específico
      {
        $match: {
          IDUsuario: userID, // Filtra por el ID del usuario encontrado
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

      // Aquí había una coma extra, la he eliminado
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: parseInt(req.params.IDUsuario) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
        }
      },
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
          Saved: 1,
          PromedioCalificaciones: 1,
          Calificacion: 1
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


  const { Titulo, Descripcion, IDPais, IDUsuario } = req.body;

  if(!Titulo){
    return res.status(400).json({ error: "El campo de titulo no puede estar vacio" });
  }
  if(!Descripcion){
    return res.status(400).json({ error: "El campo de descripción no puede estar vacio" });
  }
  if(!IDPais){
    return res.status(400).json({ error: "Por favor selecciona un país" });
  }
  if(!IDUsuario){
    return res.status(400).json({ error: "No se encontró un usuario para agregar a la publicación" });
  }

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
                          //const fotoPath = path.join(uploadDir, fotoName);
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
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

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


      // Calcula el índice de inicio y final para la paginación
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      // Segmenta las publicaciones según la paginación
      const paginatedPublicaciones = publicacionesDelUsuario.slice(startIndex, endIndex);

      // Calcula el total de páginas
      const totalPages = Math.ceil(publicacionesDelUsuario.length / limit);

      // Envía la respuesta JSON con las publicaciones paginadas y el total de páginas
      res.status(200).json({
        publicaciones: paginatedPublicaciones,
        totalPages: totalPages
      });
    
  } catch (error) {
    console.error("Error al buscar publicaciones del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const editarBorrador = async (req, res) => {
  console.log("Entré");
  
  const idPublicacion = req.body.IDPublicacion; 

  const { Titulo, Descripcion, IDPais, IDUsuario } = req.body;

  if(!Titulo){
    return res.status(400).json({ error: "El campo de titulo no puede estar vacio" });
  }
  if(!Descripcion){
    return res.status(400).json({ error: "El campo de descripción no puede estar vacio" });
  }
  if(!IDPais){
    return res.status(400).json({ error: "Por favor selecciona un país" });
  }
  if(!IDUsuario){
    return res.status(400).json({ error: "No se encontró un usuario para agregar a la publicación" });
  }

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
                          //const fotoPath = path.join(uploadDir, fotoName);
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

//Rating Publicaciones
const insertarRating = async (req, res) => {
  console.log("INSERTAR RATING ", req.body);
  const { IDPublicacion, IDUsuario, Calificacion } = req.body;

  try {
    // Verificar si ya existe un registro de guardado para esta publicación y usuario
    let calificacionExistente = await Rating.findOne({ IDPublicacion, IDUsuario });

    if (calificacionExistente) {
      // Si existe un registro, actualiza el campo de estatus
      calificacionExistente.Calificacion = Calificacion;
      await calificacionExistente.save();
      console.log("Calificacion actualizada:", calificacionExistente);
      res.status(200).json(calificacionExistente);
    } else {
      // Si no existe un registro, crea uno nuevo con el estatus 1
      // en Estatus dejare el 1 para publicación, 2 para borrador y 3 para publicación o borrador eliminado --Edgar
      const rating = new Rating({
        IDCalificacion: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        IDUsuario: req.body.IDUsuario,
        IDPublicacion: req.body.IDPublicacion,
        Calificacion: req.body.Calificacion
      });

      console.log("Guardado salvado: ", rating);
      try {
        const calificaciones = await rating.save();
        console.log("Guardado salvado:", calificaciones);
        res.status(201).json(calificaciones);
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


//Seguidores

const insertarSeguimiento = async (req, res) => {
  try {
      const { IDSeguidor, IDSeguido } = req.body;
      console.log("IDSeguidor", IDSeguidor);
      console.log("IDSeguido", IDSeguido);
      
      // Genera un ID de seguimiento aleatorio
      const IDSeguimiento = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;

      // Verifica si ya existe un registro para el IDSeguidor y el IDSeguido
      const existente = await Seguidores.findOne({ IDSeguidor, IDSeguido });

      if (existente) {
          // Si existe un registro, actualiza el estado (Estatus)
          existente.Estatus = existente.Estatus === 0 ? 1 : 0;
          await existente.save();
          return res.status(200).json({ success: true, message: "Se actualizó el estado de seguimiento correctamente." });
      } else {
          // Si no existe un registro, crea uno nuevo con Estatus 1
          const nuevoSeguimiento = new Seguidores({ IDSeguimiento, IDSeguidor, IDSeguido, Estatus: 1 });
          await nuevoSeguimiento.save();
          return res.status(200).json({ success: true, message: "Se insertó un nuevo seguimiento correctamente." });
      }
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
};

const mpubSeguidos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
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
      { $match: { Estatus: 1 } },
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
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: parseInt(req.params.IDUsuario) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
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
          "usuario._id": 1,
          "usuario.NombreUsuario": 1, 
          "usuario.Foto": 1, 
          "pais.pais": 1, 
          "pais.imagen": 1,
          Tipo: 1,
          Saved: 1,
          // Eliminamos la proyección de Calificado
          PromedioCalificaciones: 1,
          // Incluimos la calificación del usuario
          Calificacion: 1
        }
      },
      { $sort: { FechaPub: -1 } }
    ]);

    const publicacionesConSeguimiento = await Promise.all(publicacionesConUsuariosYPaises.map(async (publicacion) => {
      // Realizar la consulta adicional para verificar el seguimiento
      const sigue = await Seguidores.exists({
        IDSeguidor: req.params._idUsuario,
        IDSeguido: publicacion.usuario._id,
        Estatus: 1
      });

      // Establecer el valor de SigueUsuario basado en el resultado de la consulta adicional
      return {
        ...publicacion,
        SigueUsuario: sigue ? 1 : 0
      };
    }));

    // Filtrar las publicaciones donde SigueUsuario = 1
    const publicacionesFiltradas = publicacionesConSeguimiento.filter(publicacion => publicacion.SigueUsuario === 1);

        // Calcular el total de páginas necesarias
        const totalPages = Math.ceil(publicacionesFiltradas.length / limit);

        // Obtener las publicaciones para la página actual
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const publicacionesPaginadas = publicacionesFiltradas.slice(startIndex, endIndex);

    res.status(200).json({
      publicaciones: publicacionesPaginadas,
      totalPages: totalPages
    });
  } catch (error) {
    console.error("Error al buscar publicaciones con usuarios y países:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Filtros
const obtenerTopPais = async (req, res) => {
  try {
      
      const publicaciones = await Publicaciones.find({ Estatus: 1 });

      
      const conteoPaises = {};

      
      publicaciones.forEach(publicacion => {
          const idPais = publicacion.IDPais.toString(); 
          if (conteoPaises[idPais]) {
              conteoPaises[idPais]++;
          } else {
              conteoPaises[idPais] = 1;
          }
      });
      
      const conteoPaisesArray = Object.entries(conteoPaises);
      conteoPaisesArray.sort((a, b) => b[1] - a[1]);
      const top5Ids = conteoPaisesArray.slice(0, 5).map(par => par[0]);
      const top5Paises = await Pais.find({ idPais: { $in: top5Ids } });

      
      const top5Resultados = top5Ids.map(idPais => {
          const pais = top5Paises.find(p => p.idPais.toString() === idPais);
          const cantidad = conteoPaises[idPais];
          return {
              pais: pais.pais,
              imagen: pais.imagen,
              cantidad
          };
      });
      res.status(200).json(top5Resultados);
  } catch (error) {
      console.error('Error al obtener el top de países:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const mostrarMisPublicacionesFiltrados = async (req, res) => {
  try {
    const userID = parseInt(req.params.IDUsuario);
    const { pais, fechaInicio, fechaFin } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    let matchPublicaciones = {
      IDUsuario: userID, // Filtra por el ID del usuario
      Estatus: 1 // Filtra por el estatus de la publicación si es necesario
    };

    if (pais) {
      matchPublicaciones['IDPais'] = parseInt(pais);
    }

    if (fechaInicio && fechaFin) {
      matchPublicaciones.FechaPub = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin + 'T23:59:59') };
    }

    // Utiliza la agregación para realizar un "join" entre las colecciones
    const publicacionesDelUsuario = await Publicaciones.aggregate([
      // Agrega un filtro para obtener solo las publicaciones del usuario específico
      { $match: matchPublicaciones },
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

      // Agrega el filtro adicional según los criterios de consulta
      { $match: matchPublicaciones },

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
      },
      { $sort: { FechaPub: -1 } }
    ]);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        // Segmenta las publicaciones según la paginación
        const paginatedPublicaciones = publicacionesDelUsuario.slice(startIndex, endIndex);
    
        // Calcula el total de páginas
        const totalPages = Math.ceil(publicacionesDelUsuario.length / limit);
    
        // Envía la respuesta JSON con las publicaciones paginadas y el total de páginas
        res.status(200).json({
          publicaciones: paginatedPublicaciones,
          totalPages: totalPages
        });

  } catch (error) {
    console.error("Error al buscar publicaciones del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const mborradoresFiltro = async (req, res) => {
  try {
    const userID = parseInt(req.params.IDUsuario);
    const { pais, fechaInicio, fechaFin } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4; 

    let matchPublicaciones = {
      IDUsuario: userID,
      Estatus: 2 // Filtra por el estatus de la publicación (borradores)
    };

    if (pais) {
      matchPublicaciones['IDPais'] = parseInt(pais);
    }

    if (fechaInicio && fechaFin) {
      matchPublicaciones.FechaPub = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin + 'T23:59:59') };
    }

    // Utiliza la agregación para realizar un "join" entre las colecciones
    const publicacionesDelUsuario = await Publicaciones.aggregate([
      // Agrega un filtro para obtener solo las publicaciones del usuario específico
      {
        $match: matchPublicaciones
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

      // Buscar si el usuario ha guardado la publicación para mandar un Saved en true o false y rellenar el corazón o no
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

    // Calcula el índice de inicio y final para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Segmenta las publicaciones según la paginación
    const paginatedPublicaciones = publicacionesDelUsuario.slice(startIndex, endIndex);

    // Calcula el total de páginas
    const totalPages = Math.ceil(publicacionesDelUsuario.length / limit);

    // Envía la respuesta JSON con las publicaciones paginadas y el total de páginas
    res.status(200).json({
      publicaciones: paginatedPublicaciones,
      totalPages: totalPages
    });

  } catch (error) {
    console.error("Error al buscar publicaciones del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Busquedas
const mostrarPublicacionesPorTexto = async (req, res) => {
  try {
    const textoBusqueda = req.query.textoBusqueda;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

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
      { $match: { Estatus: 1 } },
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
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: parseInt(req.params.IDUsuario) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
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
          "usuario._id": 1,
          "usuario.NombreUsuario": 1, 
          "usuario.Foto": 1, 
          "pais.pais": 1, 
          "pais.imagen": 1,
          Tipo: 1,
          Saved: 1,
          // Eliminamos la proyección de Calificado
          PromedioCalificaciones: 1,
          // Incluimos la calificación del usuario
          Calificacion: 1
        }
      },
      { $sort: { FechaPub: -1 } }
    ]);

    const publicacionesConSeguimiento = await Promise.all(publicacionesConUsuariosYPaises.map(async (publicacion) => {
      // Realizar la consulta adicional para verificar el seguimiento
      const sigue = await Seguidores.exists({
        IDSeguidor: req.params._idUsuario,
        IDSeguido: publicacion.usuario._id,
        Estatus: 1
      });

      // Establecer el valor de SigueUsuario basado en el resultado de la consulta adicional
      return {
        ...publicacion,
        SigueUsuario: sigue ? 1 : 0
      };
    }));

    // Filtra las publicaciones basadas en el texto de búsqueda
    const publicacionesFiltradas = publicacionesConSeguimiento.filter(publicacion => {
      const regex = new RegExp(textoBusqueda, 'i');
      return regex.test(publicacion.Titulo) || regex.test(publicacion.Descripcion);
    });

        // Calcula el índice de inicio y final para la paginación
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        // Segmenta las publicaciones según la paginación
        const paginatedPublicaciones = publicacionesFiltradas.slice(startIndex, endIndex);
    
        // Calcula el total de páginas
        const totalPages = Math.ceil(publicacionesFiltradas.length / limit);

    console.log("Publicaciones filtradas por texto de búsqueda:", paginatedPublicaciones);

    res.status(200).json({
      publicaciones: paginatedPublicaciones,
      totalPages: totalPages
    });
  } catch (error) {
    console.error("Error al buscar publicaciones con usuarios y países:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const busquedaAvanzadaPublic = async (req, res) => {
  try {
    const textoBusqueda = req.query.textoBusqueda;
    const fechaInicio = req.query.fechaInicio; 
    const fechaFin = req.query.fechaFin; 
    const paisSeleccionado = req.query.paisSeleccionado; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4; 


    if (!textoBusqueda || !fechaInicio || !fechaFin || !paisSeleccionado) {
      return res.status(400).json({ error: "Por favor selecciona y llena todos los campos (Texto, Fecha de inicio y fin y país)" });
    }

    let publicacionesConUsuariosYPaises = await Publicaciones.aggregate([
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
      { $match: { Estatus: 1 } },
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
      // Realiza una búsqueda en el documento "calificaciones" para verificar si el usuario ha calificado la publicación
      {
        $lookup: {
          from: "calificaciones",
          let: { pubId: "$IDPublicacion", userId: parseInt(req.params.IDUsuario) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$IDPublicacion", "$$pubId"] },
                    { $eq: ["$IDUsuario", "$$userId"] }
                  ]
                }
              }
            }
          ],
          as: "calificacionUsuario"
        }
      },
      // Obtén la calificación del usuario si existe, de lo contrario, establece Calificacion como 0
      {
        $addFields: {
          Calificacion: {
            $cond: { 
              if: { $gt: [{ $size: "$calificacionUsuario" }, 0] },
              then: { $arrayElemAt: ["$calificacionUsuario.Calificacion", 0] },
              else: 0
            }
          }
        }
      },
      // Realiza una búsqueda en el documento "calificaciones" para calcular el promedio de calificaciones
      {
        $lookup: {
          from: "calificaciones",
          localField: "IDPublicacion",
          foreignField: "IDPublicacion",
          as: "calificaciones"
        }
      },
      // Calcula el promedio de calificaciones
      {
        $addFields: {
          PromedioCalificaciones: { $avg: "$calificaciones.Calificacion" }
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
          "usuario._id": 1,
          "usuario.NombreUsuario": 1, 
          "usuario.Foto": 1, 
          "pais.pais": 1, 
          "pais.imagen": 1,
          "pais.idPais": 1,
          Tipo: 1,
          Saved: 1,
          // Eliminamos la proyección de Calificado
          PromedioCalificaciones: 1,
          // Incluimos la calificación del usuario
          Calificacion: 1,
          IDPais: 1
        }
      },
      { $sort: { FechaPub: -1 } }
    ]);

    const publicacionesConSeguimiento = await Promise.all(publicacionesConUsuariosYPaises.map(async (publicacion) => {
      // Realizar la consulta adicional para verificar el seguimiento
      const sigue = await Seguidores.exists({
        IDSeguidor: req.params._idUsuario,
        IDSeguido: publicacion.usuario._id,
        Estatus: 1
      });
      


      // Establecer el valor de SigueUsuario basado en el resultado de la consulta adicional
      return {
        ...publicacion,
        SigueUsuario: sigue ? 1 : 0
      };
    }));

    console.log("De ayuda: ",textoBusqueda);
    console.log("De ayuda: ",fechaInicio);
    console.log("De ayuda: ",fechaFin);
    console.log("De ayuda: ",paisSeleccionado);

    

    // Filtra las publicaciones basadas en el texto de búsqueda
    let publicacionesFiltradas = publicacionesConSeguimiento.filter(publicacion => {
      const regex = new RegExp(textoBusqueda, 'i');
      return regex.test(publicacion.Titulo) || regex.test(publicacion.Descripcion);
    });

    console.log("De ayuidata hora si", publicacionesFiltradas)

    // Filtra las publicaciones basadas en la fecha de inicio si se proporciona
    if (fechaInicio) {
      console.log("Prueba: ", fechaInicio)
      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => new Date(publicacion.FechaPub) >= new Date(fechaInicio));
    }
    
    if (fechaFin) {

      console.log("De ayuidata hora si 2", fechaFin)
      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => new Date(publicacion.FechaPub) <= new Date(fechaFin));
    }

    console.log("De ayuidata hora si 3", publicacionesFiltradas)

    
    if (paisSeleccionado) {
      console.log("Prueba: ", paisSeleccionado)
      
      publicacionesFiltradas = publicacionesFiltradas.filter(publicacion => publicacion.IDPais == paisSeleccionado);
    }

    console.log("De ayuidata hora si 4", publicacionesFiltradas)

    console.log("Publicaciones filtradas:", publicacionesFiltradas);

    // Calcula el índice de inicio y final para la paginación
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      // Segmenta las publicaciones según la paginación
      const paginatedPublicaciones = publicacionesFiltradas.slice(startIndex, endIndex);

      // Calcula el total de páginas
      const totalPages = Math.ceil(publicacionesFiltradas.length / limit);

    res.status(200).json({
      publicaciones: paginatedPublicaciones,
      totalPages: totalPages
    });
  } catch (error) {
    console.error("Error al buscar publicaciones con usuarios y países:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


//Invitado

const mostrarComoInvitado = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const totalPublicaciones = await Publicaciones.countDocuments({ Estatus: 1 });
    const totalPages = Math.ceil(totalPublicaciones / limit);
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
      { $match: { Estatus: 1 } },
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
          "usuario._id": 1,
          "usuario.NombreUsuario": 1, 
          "usuario.Foto": 1, 
          "pais.pais": 1, 
          "pais.imagen": 1
        }
      },
      { $sort: { FechaPub: -1 } }
    ])


    res.status(200).json({
      publicaciones: publicacionesConUsuariosYPaises,
    });
  } catch (error) {
    console.error("Error al buscar publicaciones con usuarios y países:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
    enviarPublicacion,
    insertarRating,
    busquedaAjeno,
    mpubAjeno,
    insertarSeguimiento,
    mpubSeguidos,
    obtenerTopPais,
    mostrarMisPublicacionesFiltrados,
    mborradoresFiltro,
    mostrarPublicacionesPorTexto,
    busquedaAvanzadaPublic,
    mostrarComoInvitado
}