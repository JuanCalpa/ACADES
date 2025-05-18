import React, { useState } from 'react';
import './Contacto.css';

function Contacto() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPromociones, setShowPromociones] = useState(false);

  // Lista de promociones disponibles
  const promociones = [
    {
      id: 1,
      title: "Pack Facial Completo",
      description: "Limpieza facial profunda + hidratación + mascarilla+ tratamiento",
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
      description: "Masaje relajante + facial + manicure + pedicure",
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
      description: "Productos faciales + corporales + suplementos",
      price: "$250.000",
      discount: "15% DCTO",
      originalPrice: "$295.000"
    }
  ];

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const togglePromociones = () => {
    setShowPromociones(!showPromociones);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    // Agregar mensaje del usuario
    setChatMessages([...chatMessages, { sender: 'user', text: newMessage }]);
    setNewMessage('');

    // Simular respuesta después de un breve retraso
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'assistant', 
        text: 'Gracias por contactarnos!! Un asesor se comunicará contigo a la brevedad posible...¿Hay algo más en lo que pueda ayudarte?' 
      }]);
    }, 1000);
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
                <a href="https://facebook.com" className="red-social" target="_blank" rel="noopener noreferrer">
                  <div className="red-icon">𝕗</div>
                  <span>Facebook</span>
                </a>
                <a href="https://instagram.com" className="red-social" target="_blank" rel="noopener noreferrer">
                  <div className="red-icon">📸</div>
                  <span>Instagram</span>
                </a>
                <a href="https://twitter.com" className="red-social" target="_blank" rel="noopener noreferrer">
                  <div className="red-icon">𝕏</div>
                  <span>Twitter</span>
                </a>
                <a href="https://youtube.com" className="red-social" target="_blank" rel="noopener noreferrer">
                  <div className="red-icon">▶️</div>
                  <span>YouTube</span>
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
                <p>Pregunta por nuestras promociones y paquetes exclusivos. Consulta directamente con nuestros asesores para obtener más información.</p>
                <button className="promo-button" onClick={togglePromociones}>Consultar promociones</button>
              </div>
            </div>
          </div>
        </div>

      {/* Ventana  de promociones */}
      {showPromociones && (
        <div className="promociones-overlay" onClick={togglePromociones}>
          <div className="promociones-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-promociones" onClick={togglePromociones}>✕</button>
            <h2>Promociones y Kits Disponibles</h2>
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

      {/* Chat flotante */}
      <div className={`chat-widget ${chatOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <span>Envianos tus recomendaciones</span>
          <button className="chat-close-btn" onClick={toggleChat}>✕</button>
        </div>
        
        {chatOpen && (
          <div className="chat-body">
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="chat-form-container">
              <form className="formulario-chat" onSubmit={handleSendMessage}>
                <div className="form-field">
                  <label htmlFor="nombre-chat">Nombre completo</label>
                  <input type="text" id="nombre-chat" name="nombre" placeholder="Tu nombre" required />
                </div>
                
                <div className="form-field">
                  <label htmlFor="email-chat">Email</label>
                  <input type="email" id="email-chat" name="email" placeholder="Tu email" required />
                </div>
                
                <div className="form-field">
                  <label htmlFor="telefono-chat">Teléfono</label>
                  <input type="tel" id="telefono-chat" name="telefono" placeholder="Tu teléfono" />
                </div>
                
                <div className="form-field">
                  <label htmlFor="servicio-chat">Servicio de interés</label>
                  <select id="servicio-chat" name="servicio">
                    <option value="">Selecciona un servicio</option>
                    <option value="faciales">Tratamientos faciales</option>
                    <option value="corporales">Tratamientos corporales</option>
                    <option value="depilaciones">Depilaciones</option>
                    <option value="masajes">Masajes & Spa</option>
                    <option value="nutricion">Planes nutricionales</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                
                <div className="form-field">
                  <label htmlFor="mensaje-chat">Mensaje</label>
                  <textarea 
                    id="mensaje-chat" 
                    name="mensaje" 
                    placeholder="Tu mensaje" 
                    rows="3" 
                    required
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-chat-submit">Enviar</button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Solo el icono de chat flotante */}
      {!chatOpen && (
        <button className="chat-button" onClick={toggleChat}>
          <span className="chat-icon">💬</span>
        </button>
      )}
    </section>
  );
}

export default Contacto;