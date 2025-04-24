const express = require('express');
const cita = express.Router();
const citaController = require('../databaseFunctions/citasController');

cita.use(express.json());

cita.get('/citas', citaController.listarCitas);
cita.get('./citas/search', citaController.verCita);
cita.post('./citas', citaController.crearCita);
cita.put('./citas/:id', citaController.actualizarCita);
cita.delete('./citas/:id', citaController.eliminarCita);

module.exports = cita;