const express = require('express');
const cors = require('cors');
const session = require('express-session');
const rutas = require('./routes/rutas.js');

const app = express();
app.use(session({
  secret:'Acades123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 } 
}));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api', rutas);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
