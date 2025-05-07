const express = require('express');
const router = express.Router();

router.use(express.json());

// Rutas de pacientes
const pacientesController = require('../databaseFunctions/Login/pacientesController');
router.get('/usuarios', pacientesController.listarPacientes);
router.get('/usuarios/search', pacientesController.verPaciente);
router.post('/usuarios', pacientesController.crearPaciente);
router.put('/usuarios/:id', pacientesController.atualizarPaciente);
router.delete('/usuarios/:id', pacientesController.eliminarPaciente);
router.post('/usuarios/login', pacientesController.login); // http://localhost:3000/api/usuarios/login
router.post('/usuarios/logout', pacientesController.logout); // http://localhost:3000/api/usuarios/logout   

// Rutas para las citas
const citasController = require('../databaseFunctions/Citas/citasController');

router.get('/citas', citasController.listarCitas); // Listar todas las citas
router.get('/citas/:id', citasController.obtenerCita); // Obtener una cita por ID
router.post('/citas', citasController.crearCita); // Crear una nueva cita
router.put('/citas/:id', citasController.actualizarCita); // Actualizar una cita
router.delete('/citas/:id', citasController.eliminarCita); // Eliminar una cita

module.exports = router;