const express = require('express');
const routers = express.Router();

const controllers = require('../Controllers/controllers');

routers.post('/insertarUsuario', controllers.insertarUsuario);
routers.post('/autentUsuario', controllers.autenticarUsuario);

module.exports = [routers];