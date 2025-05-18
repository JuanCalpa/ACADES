import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilD.css';

const PerfilD = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState(null);

  // Estados para las animaciones
  const [fadeIn, setFadeIn] = useState(false);
  const [activeTab, setActiveTab] = useState('citas'); // pag principal dentro de usuario
  const [animateNavbar, setAnimateNavbar] = useState(false);
  const [animateSections, setAnimateSections] = useState({
    perfil: false,
    citas: false,
    pedirCita: false
  });

  // Estado para mostrar modal de confirmación
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Datos para citas
  const [citas, setCitas] = useState([]);

  // Formulario para pedir cita
  const [formData, setFormData] = useState({
    procedimiento: '',
    doctor: '', // aquí guardarás el id_especialista
    fecha: '',
    hora: '',
    motivo: ''
  });

  const [especialistas, setEspecialistas] = useState([]);

  useEffect(() => {
    if (formData.procedimiento) {
      fetch(`http://localhost:3000/api/especialistas-por-procedimiento?procedimiento=${encodeURIComponent(formData.procedimiento)}`)
        .then(res => res.json())
        .then(data => setEspecialistas(data))
        .catch(err => setEspecialistas([]));
    } else {
      setEspecialistas([]);
    }
  }, [formData.procedimiento]);

  // Lista de procedimientos
  const procedimientos = [
    { id: 1, nombre: "Tratamientos Faciales", descripcion: "Limpieza facial, microdermoabrasión y más", icono: "😊" },
    { id: 2, nombre: "Tratamientos Corporales", descripcion: "Reducción de medidas y tonificación", icono: "💪" },
    { id: 3, nombre: "Yesoterapia Lipolítica", descripcion: "Definición y tonificación con fines estéticos", icono: "✨" },
    { id: 4, nombre: "Limpieza Facial", descripcion: "Purificación e hidratación profunda", icono: "💆‍♀️" },
    { id: 5, nombre: "Facial con Dermapen", descripcion: "Rejuvenecimiento y tratamiento anti-acné", icono: "🌟" },
    { id: 6, nombre: "Cursos de Capacitación", descripcion: "Estética, Cosmetología y Maquillaje Profesional", icono: "📚" }
  ];

  // Cargar datos del usuario del localStorage al iniciar
  useEffect(() => {
    // Intentar obtener los datos de usuario del localStorage
    const storedUserData = localStorage.getItem('userInfo');

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);

        // Cargar citas desde localStorage si existen
        const storedCitas = localStorage.getItem('userCitas');
        if (storedCitas) {
          setCitas(JSON.parse(storedCitas));
        }
      } catch (error) {
        console.error('Error al parsear datos del usuario:', error);
      }
    } else {
      // Si no hay datos de usuario, redirigir al login
      navigate('/login');
    }

    // Iniciar animaciones
    setFadeIn(true);

    setTimeout(() => {
      setAnimateNavbar(true);
    }, 300);

    setTimeout(() => {
      // Uso de actualización funcional para evitar la dependencia
      setAnimateSections(prevState => ({
        ...prevState,
        citas: true // Modificado a citas
      }));
    }, 600);
  }, [navigate]); // dependencia de navigate para evitar bucles infinitos

  useEffect(() => {
    // Solo cargar si el usuario está logueado y la pestaña activa es "citas"
    if (userData && activeTab === 'citas') {
      const id_cliente = userData.id || userData.id_cliente;
      fetch(`http://localhost:3000/api/citas/paciente/${id_cliente}`)
        .then(res => res.json())
        .then(data => setCitas(data))
        .catch(() => setCitas([]));
    }

  }, [userData, activeTab]);

  // Funcion para cambiar de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Animar la sección seleccionada
    setTimeout(() => {
      // Uso de actualización funcional para mantener consistencia
      setAnimateSections(prevState => ({
        ...prevState,
        [tab]: true
      }));
    }, 300);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enviar formulario de cita
  const handleSubmitCita = async (e) => {
    e.preventDefault();

    // Obtén el id_cliente del usuario logueado (por ejemplo, desde localStorage)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const id_cliente = userInfo?.id || userInfo?.id_cliente; // Ajusta según tu backend

    // Prepara los datos para el backend
    const citaData = {
      id_cliente,
      id_especialista: formData.doctor,
      descripcion: formData.motivo,
      fecha: formData.fecha,
      hora: formData.hora,
      estado: 'Pendiente'
    };

    try {
      const response = await fetch('http://localhost:3000/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citaData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cita creada exitosamente');
        // Limpia el formulario o actualiza el estado según necesites
      } else {
        alert(data.mensaje || 'Error al crear la cita');
      }
    } catch (error) {
      alert('Error de red al crear la cita');
    }
  };

  // Funcion para cerrar el modal de confirmación
  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    // Resetear formulario
    setFormData({
      procedimiento: '',
      doctor: '',
      fecha: '',
      hora: '',
      motivo: ''
    });

    // Cambiar a la pestaña de citas para mostrar la nueva cita
    handleTabChange('citas');
  };

  // Funcion para cancelar cita
  const handleCancelCita = (id) => {
    const updatedCitas = citas.filter(cita => cita.id !== id);
    setCitas(updatedCitas);
    localStorage.setItem('userCitas', JSON.stringify(updatedCitas));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/logout', {
        method: 'POST',
        credentials: 'include', // Importante para enviar la cookie de sesión
      });

      const data = await response.json();

      if (response.ok) {
        // Limpia el usuario del localStorage y redirige al login
        localStorage.removeItem('userInfo');
        navigate('/login');
      } else {
        alert(data.mensaje || 'Error al cerrar sesión');
      }
    } catch (error) {
      alert('Error de red al cerrar sesión');
    }
  };

  // Función para abrir WhatsApp
  const handleWhatsAppClick = () => {
    // numero de akades
    const phoneNumber = "573163418557";
    const message = encodeURIComponent("Hola, me gustaría obtener más información sobre los servicios de ACADES!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Si no hay datos de usuario, mostrar estado de carga
  if (!userData) {
    return <div className="loading">Cargando perfil...</div>;
  }


  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`perfil-container ${fadeIn ? 'fade-in' : ''}`}>
      {/* animacion */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      <div className="decorative-circle circle-4"></div>
      <div className="decorative-circle circle-5"></div>
      <div className="decorative-circle circle-6"></div>

      {/* Navbar */}
      <nav className={`navbar ${animateNavbar ? 'animate-in' : ''}`}>
        <div className="logo">
          <h1>ACADES</h1>
        </div>
        <div className="nav-links">
          <button
            className={`nav-link ${activeTab === 'citas' ? 'active' : ''}`}
            onClick={() => handleTabChange('citas')}
          >
            Mis Citas
          </button>
          <button
            className={`nav-link ${activeTab === 'pedirCita' ? 'active' : ''}`}
            onClick={() => handleTabChange('pedirCita')}
          >
            Pedir Cita
          </button>
          <button
            className={`nav-link ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => handleTabChange('perfil')}
          >
            Mi Perfil
          </button>
        </div>
        <div className="user-menu">
          <span className="user-name">{userData.nombre}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Seccion citas pedidas*/}
        {activeTab === 'citas' && (
          <div className={`animate-on-scroll ${animateSections.citas ? 'animate-in' : ''}`}>
            <h2 className="section-title">Mis Citas</h2>
            {citas.length > 0 ? (
              <div className="citas-list">
                {citas.map(cita => (
                  <div className="cita-card" key={cita.id}>
                    <div className="cita-header">
                      <div className="cita-fecha">
                        <span className="fecha">{cita.fecha}</span>
                        <span className="hora">{cita.hora}</span>
                      </div>
                      <span className="cita-doctor">{cita.doctor}</span>
                    </div>
                    <div className="cita-body">
                      {cita.procedimiento && (
                        <p className="cita-procedimiento">
                          <span className="procedimiento-icon">💜</span>
                          {cita.procedimiento}
                        </p>
                      )}
                      <p className="cita-motivo">{cita.motivo}</p>
                    </div>
                    <div className="cita-actions">
                      <button
                        className="btn-cancel"
                        onClick={() => handleCancelCita(cita.id)}
                      >
                        Cancelar
                      </button>
                      <button className="btn-reschedule">Reprogramar</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-citas">
                <p>No tienes citas programadas</p>
                <button
                  className="btn-primary"
                  onClick={() => handleTabChange('pedirCita')}
                >
                  Pedir una cita
                </button>
              </div>
            )}
          </div>
        )}

        {/* Seccion */}
        {activeTab === 'pedirCita' && (
          <div className={`animate-on-scroll ${animateSections.pedirCita ? 'animate-in' : ''}`}>
            <h2 className="section-title">Pedir Cita</h2>

            {/* Procedimientos */}
            <div className="procedimientos-container">
              <h3 className="procedimientos-title">Nuestros Procedimientos</h3>
              <div className="procedimientos-grid">
                {procedimientos.map(proc => (
                  <div className="procedimiento-card" key={proc.id} onClick={() => {
                    setFormData({ ...formData, procedimiento: proc.nombre });
                    document.getElementById('procedimiento').value = proc.nombre;
                  }}>
                    <div className="procedimiento-icon">{proc.icono}</div>
                    <h4 className="procedimiento-name">{proc.nombre}</h4>
                    <p className="procedimiento-desc">{proc.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="cita-form-container">
              <form className="cita-form" onSubmit={handleSubmitCita}>
                <div className="form-group">
                  <label htmlFor="procedimiento">Procedimiento</label>
                  <select
                    id="procedimiento"
                    name="procedimiento"
                    value={formData.procedimiento}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar procedimiento</option>
                    {procedimientos.map(proc => (
                      <option key={proc.id} value={proc.nombre}>
                        {proc.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="doctor">Especialista</label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar especialista</option>
                    {especialistas.map(esp => (
                      <option key={esp.id_especialista} value={esp.id_especialista}>
                        {esp.nombre} ({esp.especialidad})
                      </option>
                    ))}valeria123
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hora">Hora</label>
                  <select
                    id="hora"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar hora</option>
                    <option value="09:00:00">09:00</option>
                    <option value="10:00:00">10:00</option>
                    <option value="11:00:00">11:00</option>
                    <option value="12:00:00">12:00</option>
                    <option value="15:00:00">15:00</option>
                    <option value="16:00:00">16:00</option>
                    <option value="17:00:00">17:00</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="motivo">Notas adicionales</label>
                  <textarea
                    id="motivo"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleInputChange}
                    placeholder="Cualquier detalle adicional que desees mencionar..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  Confirmar Cita
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Seccion */}
        {activeTab === 'perfil' && (
          <div className={`animate-on-scroll ${animateSections.perfil ? 'animate-in' : ''}`}>
            <h2 className="section-title">Mi Perfil</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {getInitials(userData.nombre)}
                </div>
                <h3 className="profile-name">{userData.nombre}</h3>
              </div>
              <div className="profile-info">
                <div className="info-item">
                  <div className="info-label">Email:</div>
                  <div className="info-value">{userData.correo}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Cédula:</div>
                  <div className="info-value">{userData.cedula}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Teléfono:</div>
                  <div className="info-value">{userData.telefono}</div>
                </div>
                {userData.fechaNacimiento && (
                  <div className="info-item">
                    <div className="info-label">Fecha de nacimiento:</div>
                    <div className="info-value">{userData.fechaNacimiento}</div>
                  </div>
                )}
              </div>
              <div className="profile-actions">
                <button className="btn-edit" onClick={() => {

                  // logik
                  alert('Funcionalidad de edición de perfil en desarrollo');
                }}>Editar Perfil</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmar */}
      {showConfirmationModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-content">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" width="70" height="70">
                  <path fill="#a855f7" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm6.93,8.2-6.85,9.29a1,1,0,0,1-1.43.19L5.76,13.77a1,1,0,0,1-.15-1.41A1,1,0,0,1,7,12.21l4.08,3.26L17.32,7a1,1,0,0,1,1.39-.21A1,1,0,0,1,18.93,8.2Z" />
                </svg>
              </div>
              <h3>¡Cita Confirmada!</h3>
              <p>Te hemos enviado un correo electrónico con los detalles de tu cita.</p>
              <p className="appointment-details">
                <span>Procedimiento: {formData.procedimiento}</span>
                <span>Fecha: {formData.fecha}</span>
                <span>Hora: {formData.hora}</span>
                <span>Especialista: {formData.doctor}</span>
              </p>
              <button className="modal-ok-btn" onClick={handleCloseModal}>Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante de WhatsApp */}
      <div className="whatsapp-button" onClick={handleWhatsAppClick}>
        <div className="whatsapp-icon">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="#FFFFFF" d="M17.6 6.2c-1.5-1.5-3.4-2.3-5.5-2.3-4.3 0-7.8 3.5-7.8 7.8 0 1.4 0.4 2.7 1 3.9l-1.1 4 4.1-1.1c1.1 0.6 2.4 0.9 3.7 0.9 4.3 0 7.8-3.5 7.8-7.8 0.1-2-0.7-3.9-2.2-5.4zm-5.5 12c-1.2 0-2.3-0.3-3.3-0.9l-0.2-0.1-2.4 0.6 0.6-2.3-0.1-0.2c-0.6-1-1-2.2-1-3.4 0-3.6 2.9-6.5 6.5-6.5 1.7 0 3.3 0.7 4.6 1.9 1.2 1.2 1.9 2.8 1.9 4.6 0 3.5-2.9 6.3-6.6 6.3zm3.5-4.9c-0.2-0.1-1.1-0.6-1.3-0.6-0.2-0.1-0.3-0.1-0.4 0.1-0.1 0.2-0.4 0.6-0.5 0.8-0.1 0.1-0.2 0.1-0.3 0.1-0.2 0-0.7-0.3-1.3-0.8-0.5-0.4-0.8-1-0.9-1.1-0.1-0.2 0-0.3 0.1-0.4 0.1-0.1 0.2-0.2 0.2-0.3 0.1-0.1 0.1-0.2 0.2-0.3 0.1-0.1 0-0.2 0-0.3 0-0.1-0.4-1.1-0.6-1.4-0.2-0.4-0.3-0.3-0.4-0.3h-0.4c-0.1 0-0.3 0.1-0.5 0.2-0.2 0.2-0.6 0.6-0.6 1.4s0.6 1.6 0.7 1.7c0.1 0.1 1 1.6 2.5 2.2 0.3 0.1 0.6 0.2 0.8 0.3 0.3 0.1 0.6 0.1 0.9 0.1 0.3 0 0.8-0.3 0.9-0.6 0.1-0.3 0.1-0.6 0.1-0.7-0.1-0.1-0.2-0.1-0.4-0.2z" />
          </svg>
        </div>
        <span>Contáctanos</span>
      </div>

    </div>
  );
};

export default PerfilD;