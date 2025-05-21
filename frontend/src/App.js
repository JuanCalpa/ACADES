import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ['/perfil', '/especialista', '/admin'];
  const shouldHideHeader = hideHeaderRoutes.some(route =>
    location.pathname.toLowerCase().startsWith(route)
  );

  return (
    <div className="App">
      <BubbleBackground />
      {!shouldHideHeader && <Header />}
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
        <Route path="/especialista" element={<Especialista />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
