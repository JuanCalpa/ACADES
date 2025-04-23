const express = require('express');
const cors = require('cors');
const rutas = require('./routes/rutas.js');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api', rutas);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
