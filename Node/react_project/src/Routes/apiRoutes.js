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
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

routers.post('/insertarUsuario', upload.single('Foto'), controllers.insertarUsuario);
routers.post('/autentUsuario', controllers.autenticarUsuario);
routers.get('/tpaises', controllers.buscarPaises); 
routers.post(
  '/insertarPublicacion', 
  upload.fields([
    { name: 'Fotos1', maxCount: 1 }, 
    { name: 'Fotos2', maxCount: 1 }, 
    { name: 'Fotos3', maxCount: 1 }
  ]), 
  jwt_helper.verifyToken, 
  controllers.insertarPublicacion
);
routers.get('/tpublicaciones/:IDUsuario/:_idUsuario',jwt_helper.verifyToken, controllers.mostrarPublicaciones);
routers.post('/insertarBorrador', upload.fields([
  { name: 'Fotos1', maxCount: 1 }, 
  { name: 'Fotos2', maxCount: 1 }, 
  { name: 'Fotos3', maxCount: 1 }
]), jwt_helper.verifyToken, controllers.insertarBorrador);
routers.post('/insertarGuardado',jwt_helper.verifyToken, controllers.insertarGuardado); 
routers.get('/misfavoritos/:IDUsuario/:_idUsuarioS',jwt_helper.verifyToken, controllers.mostrarFavoritos);
routers.get('/misfavoritosfiltrados/:IDUsuario/:_idUsuarioS',jwt_helper.verifyToken, controllers.mostrarFavoritosFiltrados);
routers.put('/editarPerfil', upload.single('Foto'),jwt_helper.verifyToken, controllers.editarUsuario);
routers.get('/mispublicaciones/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarMisPublicaciones);
routers.get('/bpID/:IDPublicacion',jwt_helper.verifyToken, controllers.buscarPublicacionPorID);
routers.put('/editarPublicacion', upload.fields([
  { name: 'Fotos1', maxCount: 1 }, 
  { name: 'Fotos2', maxCount: 1 }, 
  { name: 'Fotos3', maxCount: 1 }
]), jwt_helper.verifyToken , controllers.editarPublicacion);
routers.put('/borrarPublicacion/:IDPublicacion',jwt_helper.verifyToken, controllers.borrarPublicacion);
routers.get('/misborradores/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarMisBorradores);
routers.put('/editarBorrador', upload.fields([
  { name: 'Fotos1', maxCount: 1 }, 
  { name: 'Fotos2', maxCount: 1 }, 
  { name: 'Fotos3', maxCount: 1 }
]), jwt_helper.verifyToken , controllers.editarBorrador);
routers.put('/enviarPublicacion/:IDPublicacion',jwt_helper.verifyToken, controllers.enviarPublicacion);
routers.post('/insertarCalificacion',jwt_helper.verifyToken, controllers.insertarRating);
routers.get('/usuarioAjeno',jwt_helper.verifyToken, controllers.busquedaAjeno);
routers.get('/mpubAjeno/:IDUsuarioAjeno/:IDUsuario/:_idUsuario', controllers.mpubAjeno);
routers.post('/insertarSeguimiento',jwt_helper.verifyToken, controllers.insertarSeguimiento);
routers.get('/mpubSeguidos/:IDUsuario/:_idUsuario',jwt_helper.verifyToken, controllers.mpubSeguidos);
routers.get('/topPaises', jwt_helper.verifyToken,controllers.obtenerTopPais);
routers.get('/mpubFiltrado/:IDUsuario',jwt_helper.verifyToken, controllers.mostrarMisPublicacionesFiltrados);
routers.get('/mborradoresFiltro/:IDUsuario',jwt_helper.verifyToken, controllers.mborradoresFiltro);
routers.get('/busquedaPublicaciones/:IDUsuario/:_idUsuario',jwt_helper.verifyToken, controllers.mostrarPublicacionesPorTexto);
routers.get('/busquedaAvanzada/:IDUsuario/:_idUsuario',jwt_helper.verifyToken, controllers.busquedaAvanzadaPublic);
routers.get('/invitado', controllers.mostrarComoInvitado);



module.exports = [routers];