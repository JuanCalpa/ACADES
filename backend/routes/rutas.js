const express = require('express');
const router = express.Router();

router.use(express.json());

//controladores
const pacientesController = require('../databaseFunctions/Login/pacientesController');
const citasController = require('../databaseFunctions/Citas/citasController');
const especialistasController = require('../databaseFunctions/Especialistas/especialistasController');

// Rutas de pacientes
router.get('/usuarios', pacientesController.listarPacientes);
router.get('/usuarios/search', pacientesController.verPaciente);
router.post('/usuarios', pacientesController.crearPaciente);
router.put('/usuarios/:id', pacientesController.atualizarPaciente);
router.delete('/usuarios/:id', pacientesController.eliminarPaciente);

//Rutas para el login
router.post('/usuarios/login', pacientesController.login); 
router.post('/usuarios/logout', pacientesController.logout); 

// Rutas para las citas
router.get('/citas', citasController.listarCitas); 
router.get('/citas/:id', citasController.obtenerCita); 
router.get('/citas/paciente/:id_cliente', citasController.obtenerCitasPorPaciente); //http://localhost:3000/api/citas/paciente/ID_DEL_PACIENTE
router.post('/citas', citasController.crearCita); 
router.put('/citas/:id', citasController.actualizarCita); 
router.delete('/citas/:id', citasController.eliminarCita); 

//Rutas para los especialistas
router.get('/especialistas-por-procedimiento', especialistasController.especialistasPorProcedimiento);
router.post('/especialista/confirmarCita', especialistasController.cambiarEstadoCita);
router.get('/especialista/citas/:id', especialistasController.listarCitasPorEspecialista);
router.get('/especialista/citas/pendientes/:id', especialistasController.listarCitasPendientesPorEspecialista);
router.get('/especialista/citas/confirmadas/:id', especialistasController.listarCitasConfirmadaPorEspecialista);

module.exports = router;
