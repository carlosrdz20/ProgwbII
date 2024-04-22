const express = require('express');
const routers = express.Router();
const multer = require('multer');
const path = require('path');
const controllers = require('../Controllers/controllers');
const jwt_helper = require('../helpers/jwt_helper')



// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Imagenes');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

routers.post('/insertarUsuario', upload.single('Foto'), controllers.insertarUsuario);
routers.post('/autentUsuario', controllers.autenticarUsuario);
routers.get('/tpaises', controllers.buscarPaises); 
routers.post('/insertarPublicacion', upload.single('Foto'), jwt_helper.verifyToken , controllers.insertarPublicacion);
routers.get('/tpublicaciones/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarPublicaciones);
routers.post('/insertarBorrador', upload.single('Foto'),jwt_helper.verifyToken, controllers.insertarBorrador);
routers.post('/insertarGuardado',jwt_helper.verifyToken, controllers.insertarGuardado); 
routers.get('/misfavoritos/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarFavoritos);
routers.get('/misfavoritosfiltrados/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarFavoritosFiltrados);
routers.put('/editarPerfil', upload.single('Foto'),jwt_helper.verifyToken, controllers.editarUsuario);
routers.get('/mispublicaciones/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarMisPublicaciones);
routers.get('/bpID/:IDPublicacion',jwt_helper.verifyToken, controllers.buscarPublicacionPorID);
routers.put('/editarPublicacion', upload.single('Foto'), jwt_helper.verifyToken , controllers.editarPublicacion);
routers.put('/borrarPublicacion/:IDPublicacion',jwt_helper.verifyToken, controllers.borrarPublicacion);
routers.get('/misborradores/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarMisBorradores);
routers.put('/editarBorrador', upload.single('Foto'), jwt_helper.verifyToken , controllers.editarBorrador);
routers.put('/enviarPublicacion/:IDPublicacion',jwt_helper.verifyToken, controllers.enviarPublicacion);

module.exports = [routers];