import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import AgendaCita from './components/AgendaCita';
import Header from './Header'; // Asegúrate de importar tu Header
import './App.css';

function AppContent() {
  const location = useLocation();
  // Rutas header no
  const hideHeaderRoutes = ['/Especialista', '/Admin', '/Registro', '/perfilD'];
  const shouldHideHeader = hideHeaderRoutes.some(route =>
    location.pathname.startsWith(route)
  );


  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/Especialista" element={<EspecialistaPanel />} />
        <Route path="/Admin" element={<AdminPanel />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/perfilD" element={<PerfilD />} />
      </Routes>
    </>
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