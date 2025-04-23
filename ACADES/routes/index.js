const express = require('express');
const app = express();
const rutasUsuarios = require('./routes/rutas');
const cors = require('cors');

app.use(cors()); // permite todas las peticiones desde cualquier origen

app.use(express.json());
app.use('/ACADES/usuarios', rutasUsuarios);

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});


