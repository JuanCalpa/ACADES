const express = require('express');
const user = express.Router();
const pacientesController = require('../databaseFunctions/Login/pacientesController');

user.use(express.json());

// Rutas de pacientes
user.get('/usuarios', pacientesController.listarPacientes);
user.get('/usuarios/search', pacientesController.verPaciente);
user.post('/usuarios', pacientesController.crearPaciente);
user.put('/usuarios/:id', pacientesController.atualizarPaciente);
user.delete('/usuarios/:id', pacientesController.eliminarPaciente);
user.post('/usuarios/login', pacientesController.login); // http://localhost:3000/api/usuarios/login



module.exports = user;