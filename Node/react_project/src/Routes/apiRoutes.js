const express = require('express');
const routers = express.Router();

const controllers = require('../Controllers/controllers');

routers.post('/insertarUsuario', controllers.insertarUsuario);

module.exports = [routers];