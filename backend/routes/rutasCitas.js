const express = require('express');
const router = express.Router();
const citasController = require('../databaseFunctions/Citas/citasController');

// Rutas para las citas
router.get('/citas', citasController.listarCitas); // Listar todas las citas
router.get('/citas/:id', citasController.obtenerCita); // Obtener una cita por ID
router.post('/citas', citasController.crearCita); // Crear una nueva cita
router.put('/citas/:id', citasController.actualizarCita); // Actualizar una cita
router.delete('/citas/:id', citasController.eliminarCita); // Eliminar una cita

module.exports = router;