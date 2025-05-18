import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="header">
        <div className="logo">ACADES</div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/mision">Misión</Link></li>
            <li><Link to="/vision">Visión</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/Registro">Iniciar Sesión</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;