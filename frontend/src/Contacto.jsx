import React, { useState } from 'react';
import './Contacto.css';

function Contacto() {
  // Estado para mostrar/ocultar modal de promociones
  const [showPromociones, setShowPromociones] = useState(false);

  // Datos de promociones
  const promociones = [
    {
      id: 1,
      title: "Pack Facial Completo",
      description: "Limpieza facial profunda + hidratación + mascarilla + tratamiento especializado",
      price: "$150.000",
      discount: "20% DCTO",
      originalPrice: "$190.000"
    },
    {
      id: 2,
      title: "Kit Corporal Premium",
      description: "4 sesiones de masaje reductor + 2 envolturas corporales en yeso",
      price: "$280.000",
      discount: "15% DCTO",
      originalPrice: "$330.000"
    },
    {
      id: 3,
      title: "Dia de Spa 2x1",
      description: "Masaje relajante + facial express + manicure + pedicure",
      price: "$220.000",
      discount: "25% DCTO",
      originalPrice: "$295.000"
    },
    {
      id: 4,
      title: "Plan Nutricional Mensual",
      description: "Evaluación inicial + plan personalizado + 3 seguimientos mensuales",
      price: "$180.000",
      discount: "10% DCTO",
      originalPrice: "$200.000"
    },
    {
      id: 5,
      title: "Pack Depilación",
      description: "Depilación de piernas + axilas + diseño de cejas",
      price: "$120.000",
      discount: "30% DCTO",
      originalPrice: "$170.000"
    },
    {
      id: 6,
      title: "Kit ACADES Completo",
      description: "Productos faciales + corporales + suplementos para cuidado integral",
      price: "$250.000",
      discount: "15% DCTO",
      originalPrice: "$295.000"
    }
  ];

  // Función para abrir/cerrar modal de promociones
  const togglePromociones = () => {
    setShowPromociones(!showPromociones);
  };
  
  // Función para redireccionar a WhatsApp
  const redirectToWhatsApp = () => {
    // Número de teléfono con código de país (reemplazar con el número correcto)
    const phoneNumber = "573213087029";
    // Mensaje predeterminado (opcional)
    const message = "Hola, me gustaría obtener información sobre los servicios de ACADES!! 💜";
    // URL de WhatsApp con el número y mensaje
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Abrir en una nueva pestaña
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="contacto">
      {/* Puntos decorativos animados */}
      <div className="background-decorations">
        {/* Puntos más grandes */}
        <div className="floating-dot large" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
        <div className="floating-dot large" style={{ top: '70%', right: '8%', animationDelay: '2.3s' }}></div>
        <div className="floating-dot large" style={{ top: '40%', right: '15%', animationDelay: '1.1s' }}></div>
        <div className="floating-dot large" style={{ bottom: '15%', left: '12%', animationDelay: '0.7s' }}></div>
        
        {/* Puntos medianos */}
        <div className="floating-dot medium" style={{ top: '25%', left: '18%', animationDelay: '1.5s' }}></div>
        <div className="floating-dot medium" style={{ top: '15%', right: '25%', animationDelay: '0.5s' }}></div>
        <div className="floating-dot medium" style={{ bottom: '30%', left: '30%', animationDelay: '2s' }}></div>
        <div className="floating-dot medium" style={{ top: '55%', right: '5%', animationDelay: '1.8s' }}></div>
        <div className="floating-dot medium" style={{ bottom: '10%', right: '28%', animationDelay: '3.2s' }}></div>
        
        {/* Puntos pequeños */}
        <div className="floating-dot small" style={{ top: '8%', left: '30%', animationDelay: '0.3s' }}></div>
        <div className="floating-dot small" style={{ top: '20%', right: '40%', animationDelay: '1.2s' }}></div>
        <div className="floating-dot small" style={{ top: '45%', left: '10%', animationDelay: '2.7s' }}></div>
        <div className="floating-dot small" style={{ bottom: '25%', right: '18%', animationDelay: '1.4s' }}></div>
        <div className="floating-dot small" style={{ top: '35%', left: '40%', animationDelay: '0.9s' }}></div>
        <div className="floating-dot small" style={{ bottom: '40%', right: '35%', animationDelay: '2.2s' }}></div>
        <div className="floating-dot small" style={{ top: '60%', left: '22%', animationDelay: '1.6s' }}></div>
        <div className="floating-dot small" style={{ top: '80%', right: '45%', animationDelay: '0.2s' }}></div>
        
        {/* Círculos decorativos */}
        <div className="decorative-bubble bubble1"></div>
        <div className="decorative-bubble bubble2"></div>
        <div className="decorative-bubble bubble3"></div>
      </div>

      <div className="contacto-container">
        <h2 className="section-title">Contacto</h2>
        
        <div className="contacto-content">
          <div className="contacto-left">
            <div className="contacto-card">
              <h3>Información de Contacto</h3>
              <div className="info-item">
                <span className="info-icon">📱</span>
                <p>Teléfono: 3213087029</p>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <p>Email: esteticaacades@gmail.com</p>
              </div>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <p>Dirección: Calle 22#10-48 Parque Bolivar, Pasto, Nariño</p>
              </div>
              <div className="info-item">
                <span className="info-icon">🕒</span>
                <p>Horario: Lunes a Sábado, 8:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="contacto-card">
              <h3>Redes Sociales</h3>
              <div className="redes-sociales">
                <a href="https://facebook.com/acades" className="red-social" target="_blank" rel="noopener noreferrer">
                  <div className="red-icon">𝕗</div>
                  <span>Facebook</span>
                </a>
                <a href="https://instagram.com/acades" className="red-social" target="_blank" rel="noopener noreferrer">
                  <div className="red-icon">📸</div>
                  <span>Instagram</span>
                </a>
                <a href="https://tiktok.com/@acades" className="red-social" target="_blank" rel="noopener noreferrer">
                  <div className="red-icon">🎵</div>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contacto-right">
            <div className="mapa-container">
              <div className="contacto-card mapa">
                <h3>Ubicación</h3>
                <div className="mapa-interactivo">
                  <iframe
                    title="Ubicación de ACADES"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8270454376454!2d-77.28252918524793!3d1.2137207621348196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed4865555555%3A0xa43d322a36489000!2sCalle%2022%20%2310-48%2C%20Pasto%2C%20Nari%C3%B1o!5e0!3m2!1ses!2sco!4v1651234567890!5m2!1ses!2sco"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
              
            <div className="promo-card">
              <div className="promo-icon">🎁</div>
              <h3>Promociones especiales</h3>
              <p>Descubre nuestras increíbles promociones y paquetes exclusivos. Tenemos opciones diseñadas especialmente para realzar tu belleza y bienestar a precios increíbles.</p>
              <button className="promo-button" onClick={togglePromociones}>Ver promociones</button>
            </div>
          </div>
        </div>
      </div>

      {/* Ventana emergente de promociones mejorada */}
      {showPromociones && (
        <div className="promociones-overlay" onClick={togglePromociones}>
          <div className="promociones-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-promociones" onClick={togglePromociones}>✕</button>
            <h2>Promociones y Kits Especiales</h2>
            
            {/* Puntos decorativos dentro del modal */}
            <div className="modal-dots">
              <div className="modal-dot large"></div>
              <div className="modal-dot medium"></div>
              <div className="modal-dot small"></div>
            </div>
            
            <div className="promociones-container">
              {promociones.map(promo => (
                <div key={promo.id} className="promo-item">
                  <div className="promo-badge">{promo.discount}</div>
                  <h3>{promo.title}</h3>
                  <p>{promo.description}</p>
                  <div className="promo-precio">
                    <span className="precio-actual">{promo.price}</span>
                    <span className="precio-original">{promo.originalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Botón de WhatsApp flotante */}
      <button className="whatsapp-button" onClick={redirectToWhatsApp}>
        <span className="whatsapp-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </span>
      </button>
    </section>
  );
}

export default Contacto;