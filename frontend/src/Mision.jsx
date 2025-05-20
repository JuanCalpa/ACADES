import React, { useState, useEffect } from 'react';
import './Mision.css';
// Importamos la imagen directamente en el componente
import misionImg from './img/mision.jpg'; 

function Mision() {
  // Estados para controlar las animaciones
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [hoverQuote, setHoverQuote] = useState(false);
  
  // Efecto para activar animación al cargar
  useEffect(() => {
    setIsVisible(true);
    
    // Configurar observer para animaciones de scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observar elementos para animarlos al hacer scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      // Limpiar observer
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  // Elementos de la misión
  const misionItems = [
    "Proporcionar atención personalizada para cada cliente, reconociendo sus necesidades únicas",
    "Utilizar productos de alta calidad que cuidan tanto la belleza como la salud",
    "Innovar constantemente en técnicas y servicios para estar a la vanguardia",
    "Crear un ambiente acogedor y relajante donde nuestras clientas se sientan especiales"
  ];

  return (
    <section className={`mision ${isVisible ? 'fade-in' : ''}`}>
      {/* Bolitas decorativas rosa pastel */}
      <div className="section-background">
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
        <div className="decorative-dot"></div>
      </div>
      
      {/* Círculos decorativos de fondo */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      <div className="decorative-circle circle-4"></div>
      <div className="decorative-circle circle-5"></div>
      <div className="decorative-circle circle-6"></div>
      
      <div className="mision-container">       
        <div className="mision-content">
          <div 
            className="mision-imagen animate-on-scroll"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${misionImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Capa de overlay para efecto hover */}
            <div className="image-overlay"></div>
          </div>
          
          <div className="mision-texto animate-on-scroll">
            <p
              className={`mision-statement ${hoverQuote ? 'statement-active' : ''}`}
              onMouseEnter={() => setHoverQuote(true)}
              onMouseLeave={() => setHoverQuote(false)}
            >
              <span className="quote-mark left">"</span>
              Somos una empresa dedicada a la comercialización, distribución, educación y prestación de servicios enfocados en la estética y cosmetología integral.
              Contamos con un equipo de profesionales altamente capacitados para cubrir las necesidades de todos nuestros clientes.
              <span className="quote-mark right">"</span>
            </p>
            
            <p className="text-animated">
              En <span className="highlight-text">ACADES</span> nos esforzamos por brindar experiencias transformadoras que realzan la belleza natural de cada persona:
            </p>
            
            <ul className="mision-lista">
              {misionItems.map((item, index) => (
                <li
                  key={index}
                  className={`lista-item ${activeItem === index ? 'item-active' : ''}`}
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                  style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mision;

