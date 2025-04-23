const express = require('express');
const user = express.Router();
const userController = require('../databaseFunctions/userController');

user.use(express.json());

user.get('/usuarios', userController.listarPacientes); // http://localhost:3000/api/usuarios
user.get('/usuarios/search', userController.verPaciente); // http://localhost:3000/api/usuarios/search?id_cliente=1
user.post('/usuarios', userController.crearPaciente);
user.put('/usuarios/:id', userController.atualizarPaciente);
user.delete('/usuarios/:id', userController.eliminarPaciente);
module.exports = user;