const express = require('express');
const app = express();
const user = express.Router();
const userController = require('../databaseFunctions/userController');
app.use(express.json());

user.get('/usuarios', userController.listarPacientes);
user.get('/usuarios/:id', userController.listarPacientes);
user.post('/usuarios', userController.crearPaciente);
user.put('./usuarios/:id', userController.atualizarPaciente);
user.put('./usuarios/:id', userController.eliminarPaciente);


app.use('/ACADES', user);

app.listen(3003, () => {
    console.log('corriendo en el puerto 3003');
});