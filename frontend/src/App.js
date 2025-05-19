import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Nosotros from './Nosotros';
import Mision from './Mision';
import Vision from './Vision';
import Contacto from './Contacto';
import Reserva from './Reserva';
import BubbleBackground from './BubbleBackground';
import PerfilD from './PerfilD';
import Registro from './Registro';
import Especialista from './Especialista';
import Admin from './Admin';


function App() {
  return (
    <Router>
      <div className="App">
        <BubbleBackground />
        {/* Mostrar el Header solo si no estamos en la pagina de perfil o especialista */}
        {window.location.pathname !== '/perfil' && 
         window.location.pathname !== '/especialista' && <Header />}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/mision" element={<Mision />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<PerfilD />} />
          <Route path="/especialista" element={<Especialista />} /> {/* Ruta corregida */}
        
          {/* rutas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;