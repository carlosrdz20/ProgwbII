const express = require('express');
const routers = express.Router();
const multer = require('multer');
const path = require('path');
const controllers = require('../Controllers/controllers');



// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/usuarios');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

routers.post('/insertarUsuario', upload.single('Foto'), controllers.insertarUsuario);
routers.post('/autentUsuario', controllers.autenticarUsuario);

module.exports = [routers];