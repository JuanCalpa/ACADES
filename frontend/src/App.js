import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Nosotros from './Nosotros';
import Registro from './Registro';
import Mision from './Mision';
import Vision from './Vision';
import Contacto from './Contacto';
import Reserva from './Reserva';
import BubbleBackground from './BubbleBackground';

function App() {
  return (
    <Router>
      <div className="App">
        <BubbleBackground />
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/mision" element={<Mision />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/iniciarSesion" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;