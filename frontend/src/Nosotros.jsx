import React, { useState, useEffect } from 'react';
import './Nosotros.css';

function Nosotros() {
  // Estados para controlar las animaciones
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(null);
 
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
 
  // Función para manejar hover en valores
  const handleValueHover = (index) => {
    setActiveValue(index);
  };
 
  // Función para quitar hover
  const handleValueLeave = () => {
    setActiveValue(null);
  };
 
  // Array de valores para facilitar la animación secuencial
  const valores = [
    { titulo: 'Excelencia', descripcion: 'Nos esforzamos por superar expectativas en cada servicio' },
    { titulo: 'Innovación', descripcion: 'Constantemente nos actualizamos con las últimas tendencias' },
    { titulo: 'Integridad', descripcion: 'Honestidad y transparencia en todo lo que hacemos' },
    { titulo: 'Pasión', descripcion: 'Amamos nuestro trabajo y se refleja en los resultados' }
  ];

  return (
    <section className={`nosotros ${isVisible ? 'fade-in' : ''}`}>
      {/* Puntos decorativos morados */}
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

      <div className="nosotros-container">
        <h2 className="section-title animate-on-scroll">Sobre Nosotros</h2>
       
        <div className="nosotros-content">
          <div className="nosotros-texto animate-on-scroll">
            <p className="text-animated">Somos <span className="highlight-text">ACADES</span>, una estética con la misión de transformar la experiencia de belleza y bienestar en nuestra comunidad!</p>
            <p className="text-animated-delay">Desde nuestra apertura, nos hemos dedicado a ofrecer servicios de la más alta calidad, utilizando productos de primera línea y técnicas innovadoras que garantizan resultados excepcionales para cada uno de nuestros clientes!</p>
          </div>
         
          <div className="nosotros-valores animate-on-scroll">
            <h3 className="valores-title">Nuestros Valores</h3>
            <ul>
              {valores.map((valor, index) => (
                <li
                  key={index}
                  className={`valor-item ${activeValue === index ? 'valor-active' : ''}`}
                  onMouseEnter={() => handleValueHover(index)}
                  onMouseLeave={handleValueLeave}
                  style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                >
                  <span className="valor-title">{valor.titulo}</span> - {valor.descripcion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
     
      {/* Elementos decorativos animados circulares */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
    </section>
  );
}

export default Nosotros;