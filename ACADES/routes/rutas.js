const express = require('express');
const usuarios = express.Router();
const usersController = require('../databaseFunctions/usersController.js');

// Rutas correctas
usuarios.get('/', usersController.listarPacientes);
usuarios.get('/:id', usersController.verPaciente);
usuarios.post('/', usersController.adicionarPaciente);
usuarios.put('/:id', usersController.atualizarPaciente);
usuarios.delete('/:id', usersController.eliminarPaciente);

module.exports = usuarios;
