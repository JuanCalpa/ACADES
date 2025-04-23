const express = require('express');
const cors = require('cors');

const app = express();

//configurar cors
app.use(cors({
  origin: 'http://localhost:5173'
}));

//configurar body parsing
app.use(express.json());

//importar y usar rutas
const rutasUsuarios = require('./routes/rutas');
app.use('/ACADES/usuarios', rutasUsuarios);

//iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
