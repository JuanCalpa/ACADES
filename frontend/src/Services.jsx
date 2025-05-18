import React, { useState } from 'react';
import './Services.css';


const imgTratamientoF = require('./img/tratamientoF.jpeg');
const imgTratamientoC = require('./img/tratamientoC.jpeg');
const imgYesoterapia = require('./img/yesoterapia.jpeg');
const imgCapacitacion = require('./img/capacitacion.jpg');
const imgLimpiezaF = require('./img/limpiezaF.jpeg');
const imgDermatoto = require('./img/dermafoto.jpg'); 

function Services() {
  const [activeService, setActiveService] = useState(null);

  // Lista de servicios q ofrece
  const services = [
    {
      id: 1,
      name: 'Tratamientos Faciales',
      description: 'Limpieza facial, microdermoabrasión y más',
      icon: '✨',
      image: imgTratamientoF, // ""
      detailedInfo: {
        description: 'Nuestros tratamientos faciales están diseñados para mejorar la salud y apariencia de tu piel. Trabajamos con productos de alta calidad y tecnología avanzada para resultados visibles desde la primera sesión.',
        services: ['Limpieza facial profunda', 'Tratamiento antiarrugas', 'Hidratación intensiva', 'Microdermoabrasión', 'Tratamiento para acné', 'Facial con dermapen'],
        benefits: ['Piel más luminosa', 'Reducción de imperfecciones', 'Efecto rejuvenecedor']
      }
    },
    {
      id: 2,
      name: 'Tratamientos Corporales',
      description: 'Reducción de medidas y tonificación',
      icon: '👗',
      image: imgTratamientoC, // ""
      detailedInfo: {
        description: 'Nuestros tratamientos corporales están diseñados para tonificar, reafirmar y mejorar la apariencia de tu piel. Utilizamos tecnología de vanguardia y productos naturales para resultados óptimos.',
        services: ['Reafirmante corporal', 'Tratamiento anticelulitis', 'Aumento de glúteos', 'Masajes reductivos', 'Tratamiento post-embarazo', 'Mesoterapia'],
        benefits: ['Reducción visible de medidas', 'Piel más firme', 'Disminución de celulitis']
      }
    },
    {
      id: 3,
      name: 'Yesoterapia Lipolítica',
      description: 'Definición y tonificación con fines estéticos',
      icon: '🌟',
      image: imgYesoterapia, // ""
      detailedInfo: {
        description: 'La yesoterapia lipolítica es un tratamiento innovador que ayuda a definir el contorno corporal. Combina componentes activos con una envoltura especial para maximizar sus efectos reductivos y reafirmantes.',
        services: ['Yesoterapia corporal completa', 'Tratamiento localizado', 'Tonificación', 'Definición'],
        benefits: ['Efecto lifting', 'Reducción de volumen', 'Mejora la apariencia de la piel']
      }
    },
    {
      id: 4,
      name: 'Cursos de Capacitación',
      description: 'Estética, Cosmetología y Maquillaje Profesional',
      icon: '📚',
      image: imgCapacitacion, // ""
      detailedInfo: {
        description: 'Formamos profesionales en el campo de la belleza y estética con nuestros cursos completos de cosmetología, estética y maquillaje. Aprende con los mejores profesionales del sector.',
        services: ['Diplomado en Cosmetología', 'Curso de Estética Integral', 'Curso de Maquillaje Profesional', 'Especialización en Tratamientos Faciales'],
        benefits: ['Certificación reconocida', 'Prácticas con casos reales', 'Instructores con amplia experiencia']
      }
    },
    {
      id: 5,
      name: 'Limpieza Facial',
      description: 'Purificación e hidratación profunda',
      icon: '💆‍♀️',
      image: imgLimpiezaF, // ""
      detailedInfo: {
        description: 'Nuestras limpiezas faciales eliminan impurezas, células muertas y exceso de grasa, permitiendo que tu piel respire y absorba mejor los productos de cuidado facial.',
        services: ['Limpieza básica', 'Limpieza profunda', 'Extracción de comedones', 'Hidratación intensiva'],
        benefits: ['Piel más limpia y fresca', 'Reducción de puntos negros', 'Mejora la textura de la piel']
      }
    },
    {
      id: 6,
      name: 'Facial con Dermapen',
      description: 'Rejuvenecimiento y tratamiento anti-acné',
      icon: '✨',
      image: imgDermatoto, //img importada arriba
      detailedInfo: {
        description: 'El tratamiento con Dermapen estimula la producción natural de colágeno mediante microperforaciones, mejorando la apariencia de cicatrices, arrugas y marcas de acné.',
        services: ['Tratamiento facial completo', 'Tratamiento para acné', 'Reducción de cicatrices', 'Rejuvenecimiento'],
        benefits: ['Mejora visible de la textura', 'Reducción de líneas finas', 'Piel más firme y luminosa']
      }
    }
  ];

  
  const openPopup = (id, e) => {
    e.stopPropagation(); 
    setActiveService(id);
    
    document.body.style.overflow = 'hidden';
  };

  
  const closePopup = () => {
    setActiveService(null);
    
    document.body.style.overflow = 'auto';
  };


  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section id="servicios" className="services-section">
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
        <div className="decorative-circle"></div>
        <div className="decorative-circle"></div>
        <div className="decorative-circle"></div>
        <div className="decorative-circle"></div>
      </div>
      
      <div className="services-container">
        <h2 className="section-title">Nuestros Servicios</h2>
        
        <div className="services-grid">
          {services.map(service => (
            <div 
              key={service.id} 
              className="service-card"
              onClick={(e) => openPopup(service.id, e)}
            >
              <div className="service-image">
                <img src={service.image} alt={service.name} />
                <div className="service-overlay">
                  <div className="service-icon">{service.icon}</div>
                </div>
              </div>
              <div className="service-content">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <button className="view-details-btn">Ver detalles</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* animaciones */}
      {activeService && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="service-popup" onClick={handlePopupClick}>
            <button className="close-button" onClick={closePopup}>×</button>
            
            <div className="popup-content">
              <div className="popup-info">
                <h3>{services.find(s => s.id === activeService).name}</h3>
                <p className="popup-description">{services.find(s => s.id === activeService).detailedInfo.description}</p>
                
                <div className="service-details">
                  <div className="service-list">
                    <h4>Servicios incluidos:</h4>
                    <ul>
                      {services.find(s => s.id === activeService).detailedInfo.services.map((item, index) => (
                        <li key={index}><span className="service-bullet">•</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="benefits-list">
                    <h4>Beneficios:</h4>
                    <ul>
                      {services.find(s => s.id === activeService).detailedInfo.benefits.map((item, index) => (
                        <li key={index}><span className="benefit-bullet">✓</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
               
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Services;