import React, { useState, useEffect } from 'react';
import './Vision.css';
// Importar la imagen correctamente para proyectos React
import visionImage from './img/vision.jpg'; // Ajusta esta ruta según la estructura de tu proyecto

function Vision() {
  // Estados para controlar animaciones
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);
  
  // Efecto para iniciar animaciones al cargar
  useEffect(() => {
    setIsVisible(true);
    
    // Configurar observer para animaciones scroll
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
  
  // Datos para los pilares
  const pilares = [
    {
      title: "Excelencia en el Servicio",
      description: "Buscamos superar las expectativas en cada interacción, ofreciendo experiencias que deleiten a nuestros clientes."
    },
    {
      title: "Innovación Constante",
      description: "Nos comprometemos a estar a la vanguardia de las tendencias y técnicas, implementando soluciones creativas."
    },
    {
      title: "Desarrollo Sostenible",
      description: "Aspiramos a crecer de manera responsable, cuidando el impacto que generamos en nuestro entorno."
    },
    {
      title: "Crecimiento Profesional",
      description: "Fomentamos el desarrollo de nuestro equipo, creando oportunidades para su crecimiento y realización."
    }
  ];
  
  // Datos para metas
  const metas = [
    "Expandir nuestra presencia a nuevas localidades, manteniendo la calidad que nos caracteriza",
    "Desarrollar nuestra propia línea de productos de belleza eco-amigables y de alta eficacia",
    "Crear una academia de formación para nuevos talentos en la industria de la belleza",
    "Implementar tecnologías avanzadas para mejorar la experiencia de nuestros clientes",
    "Establecer programas de responsabilidad social que tengan un impacto positivo en nuestra comunidad"
  ];

  return (
    <section className={`vision ${isVisible ? 'fade-in' : ''}`}>
      {/*circulos q hacen parte de la dekoracion*/}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      <div className="decorative-circle circle-4"></div>
      <div className="decorative-circle circle-5"></div>
      <div className="decorative-circle circle-6"></div>
      
      <div className="vision-container">
        <h2 className="section-title animate-on-scroll">Nuestra Visión</h2>
        
        <div className="vision-statement-box animate-on-scroll">
          <p className="vision-statement">
            Tenemos como propósito convertirnos en una empresa altamente reconocida a nivel regional y expandirnos a nivel nacional, con el fin de ampliar nuestra gama de servicios ofreciendo siempre tratamientos, productos y cursos novedosos para cada uno de nuestros clientes.
          </p>
        </div>
        
        <div className="vision-content">
          <div className="vision-pilares animate-on-scroll">
            <h3>Pilares de nuestra visión</h3>
            <div className="pilares-grid">
              {pilares.map((pilar, index) => (
                <div 
                  key={index}
                  className={`pilar ${activeItem === index ? 'pilar-active' : ''}`}
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                  style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                >
                  <div className="pilar-icon">
                    <div className="icon-circle"></div>
                    <div className="icon-inner"></div>
                  </div>
                  <h4>{pilar.title}</h4>
                  <p>{pilar.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="vision-metas animate-on-scroll">
            <h3>Objetivos a futuro</h3>
            <ul className="metas-lista">
              {metas.map((meta, index) => (
                <li 
                  key={index}
                  className={`meta-item ${activeMeta === index ? 'meta-active' : ''}`}
                  onMouseEnter={() => setActiveMeta(index)}
                  onMouseLeave={() => setActiveMeta(null)}
                  style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                >
                  {meta}
                </li>
              ))}
            </ul>
            
            {/* Imagen con animación debajo de objetivos q puse */}
            <div className="vision-image-container animate-on-scroll">
              <img 
                src={visionImage} 
                alt="Visión de ACADES" 
                className="vision-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vision;