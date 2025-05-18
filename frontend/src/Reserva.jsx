import React, { useState } from 'react';
import './Reserva.css';

function Reserva() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    servicio: '',
    comentarios: ''
  });
  
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!formData.nombre || !formData.telefono || !formData.email || !formData.fecha || !formData.hora || !formData.servicio) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }
    
    // aqui es la logica si quitamos lo otro pa conectar a base de datos
    console.log('Datos de reserva:', formData);
    
    // aki es pa probar
    setEnviado(true);
    setError('');
  };
  
  const servicios = [
    { id: 'corte', nombre: 'Corte de cabello', precio: '$250' },
    { id: 'manicure', nombre: 'Manicure', precio: '$200' },
    { id: 'tratamiento', nombre: 'Tratamientos faciales', precio: 'Desde $350' },
    { id: 'maquillaje', nombre: 'Maquillaje profesional', precio: '$400' }
  ];

  // horas disponibles para la reserva y si algo las corregimos
  const horasDisponibles = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];
  
  // la fecha minima es de el mismo dia pq no puede pedir pa dias anteriores 
  const hoy = new Date().toISOString().split('T')[0];
  
  // aki es lo de fecha max de 3 meses 
  const tresMesesDespues = new Date();
  tresMesesDespues.setMonth(tresMesesDespues.getMonth() + 3);
  const maxDate = tresMesesDespues.toISOString().split('T')[0];

  // aqui es lo de la cita q me decias q kite
  if (enviado) {
    return (
      <section className="reserva">
        <div className="reserva-container">
          <div className="confirmation-card">
            <div className="check-icon">✓</div>
            <h2>¡Reserva Confirmada!</h2>
            <p>Gracias por reservar con ACADES, {formData.nombre}!!</p>
            <p>Hemos recibido tu solicitud para el servicio de <strong>{
              servicios.find(s => s.id === formData.servicio)?.nombre
            }</strong> el día <strong>{new Date(formData.fecha).toLocaleDateString()}</strong> a las <strong>{formData.hora}</strong>.</p>
            <p>Te enviaremos un recordatorio a <strong>{formData.email}</strong> 24 horas antes de tu cita.</p>
            <p>Si necesitas modificar o cancelar tu reserva, por favor contáctanos al menos con 24 horas de anticipación.</p>
            <button className="btn-nueva-reserva" onClick={() => setEnviado(false)}>Hacer otra reserva</button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="reserva">
      <div className="reserva-container">
        <h2 className="reserva-title">Reserva tu cita</h2>
        
        <div className="reserva-content">
          <div className="reserva-info">
            <h3>Información importante! </h3>
            <ul>
              <li>Las reservas están sujetas a disponibilidad</li>
              <li>Se requiere confirmación por celular o correo</li>
              <li>En caso de cancelación, por favor notificar con 24 horas de anticipación</li>
            </ul>
            
            <div className="servicios-destacados">
              <h3>Nuestros servicios</h3>
              <ul className="servicios-lista">
                {servicios.map((servicio) => (
                  <li key={servicio.id}>
                    <span className="servicio-nombre">{servicio.nombre}</span>
                    <span className="servicio-precio">{servicio.precio}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <form className="formulario-reserva" onSubmit={handleSubmit}>
            <h3>Tus datos</h3>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input 
                  type="text" 
                  id="apellido" 
                  name="apellido" 
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido" 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">Celular*</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  name="telefono" 
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Tu número de teléfono" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Correo *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Tu email" 
                  required 
                />
              </div>
            </div>
            
            <h3>Detalles de la cita</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fecha">Fecha *</label>
                <input 
                  type="date" 
                  id="fecha" 
                  name="fecha" 
                  value={formData.fecha}
                  onChange={handleChange}
                  min={hoy}
                  max={maxDate}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="hora">Hora *</label>
                <select 
                  id="hora" 
                  name="hora" 
                  value={formData.hora}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="servicio">Servicio *</label>
              <select 
                id="servicio" 
                name="servicio" 
                value={formData.servicio}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar servicio</option>
                {servicios.map(servicio => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre} ({servicio.precio})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="comentarios">Comentarios adicionales</label>
              <textarea 
                id="comentarios" 
                name="comentarios" 
                value={formData.comentarios}
                onChange={handleChange}
                placeholder="Información adicional o requerimientos especiales"
                rows="4"
              ></textarea>
            </div>
            
            <button type="submit" className="btn-reservar">Confirmar Reserva</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Reserva;