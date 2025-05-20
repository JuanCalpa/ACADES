// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [activeLink, setActiveLink] = useState('/');
  
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  
  return (
    <header>
      <div className="header">
        <div className="logo">
          <span className="logo-text">ACADES</span>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link 
                to="/" 
                className={activeLink === '/' ? 'active' : ''} 
                onClick={() => handleLinkClick('/')}
              >
                Inicio
              </Link>
            </li>
            <li className="separator">💜</li>
            <li>
              <Link 
                to="/nosotros" 
                className={activeLink === '/nosotros' ? 'active' : ''} 
                onClick={() => handleLinkClick('/nosotros')}
              >
                Nosotros
              </Link>
            </li>
            <li className="separator">🤍</li>
            <li>
              <Link 
                to="/mision" 
                className={activeLink === '/mision' ? 'active' : ''} 
                onClick={() => handleLinkClick('/mision')}
              >
                Misión
              </Link>
            </li>
            <li className="separator">💜</li>
            <li>
              <Link 
                to="/vision" 
                className={activeLink === '/vision' ? 'active' : ''} 
                onClick={() => handleLinkClick('/vision')}
              >
                Visión
              </Link>
            </li>
            <li className="separator">🤍</li>
            <li>
              <Link 
                to="/contacto" 
                className={activeLink === '/contacto' ? 'active' : ''} 
                onClick={() => handleLinkClick('/contacto')}
              >
                Contacto
              </Link>
            </li>
            <li className="separator">💜</li>
            <li>
              <Link 
                to="/Registro" 
                className={`${activeLink === '/Registro' ? 'active' : ''} login-btn`} 
                onClick={() => handleLinkClick('/Registro')}
              >
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;