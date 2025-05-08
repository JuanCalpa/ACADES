import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import salonImage from './img/acades.jpg'; 

<div className="hero-image-container">
  <div className="animated-logo-frame">
    <img 
      src={salonImage} 
      alt="Salón de belleza ACADES" 
      className="logo-image"
    />
  </div>
</div>
function Hero() {
  const [counts, setCounts] = useState({
    clients: 0,
    years: 0,
    services: 0
  });
  
  
  const targets = useMemo(() => ({
    clients: 800,
    years: 10,
    services: 20
  }), []);
  
  useEffect(() => {
    
    const duration = 2000; 
    
   
    const intervals = {
      clients: duration / targets.clients,
      years: duration / targets.years,
      services: duration / targets.services
    };
    
    
    const timers = {
      clients: null,
      years: null,
      services: null
    };
    
    
    if (counts.clients < targets.clients) {
      timers.clients = setTimeout(() => {
        setCounts(prev => ({
          ...prev,
          clients: prev.clients + 1
        }));
      }, intervals.clients);
    }
    
    if (counts.years < targets.years) {
      timers.years = setTimeout(() => {
        setCounts(prev => ({
          ...prev,
          years: prev.years + 1
        }));
      }, intervals.years);
    }
    
    if (counts.services < targets.services) {
      timers.services = setTimeout(() => {
        setCounts(prev => ({
          ...prev,
          services: prev.services + 1
        }));
      }, intervals.services);
    }
    
    
    return () => {
      Object.values(timers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [counts, targets]);
  
  return (
    <section id="inicio" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>ACADES<br /><span className="highlight">Estética y Salud Integral</span></h1>
            <p>Descubre la verdadera belleza en cada rincón de tu piel y cuerpo con nuestros cuidados perzonalizados!</p>
            
            <div className="stats-container">
              <div className="stat">
                <div className="stat-number">{counts.clients}+</div>
                <div className="stat-label">Clientes<br />satisfechos</div>
              </div>
              <div className="stat">
                <div className="stat-number">{counts.years}+</div>
                <div className="stat-label">Años de <br />experiencia</div>
              </div>
              <div className="stat">
                <div className="stat-number">{counts.services}+</div>
                <div className="stat-label">Servicios <br />especializados</div>
              </div>
            </div>
            
            <div className="cta-container">
              <Link to="/servicios" className="secondary-button">Ver servicios</Link>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="image-frame">
            <img src={salonImage} alt="Salón de belleza ACADES" className="hero-image" />
          </div>
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-dot dot-1"></div>
          <div className="decoration-dot dot-2"></div>
          <div className="decoration-dot dot-3"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;