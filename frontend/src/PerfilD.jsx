import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilD.css';

const PerfilD = () => {
  const navigate = useNavigate();
  
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState(null);
  
  // Estados para las animaciones
  const [fadeIn, setFadeIn] = useState(false);
  const [activeTab, setActiveTab] = useState('citas'); 
  const [animateNavbar, setAnimateNavbar] = useState(false);
  const [animateSections, setAnimateSections] = useState({
    perfil: false,
    citas: false,
    pedirCita: false
  });

  // Estado para mostrar modal de confirmación
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // Estados para los nuevos modales
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [citaToDelete, setCitaToDelete] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  
  // Estado para el formulario de edición de perfil
  const [editProfileData, setEditProfileData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    celular: '',
    fechaNacimiento: ''
  });

  // Datos para citas
  const [citas, setCitas] = useState([]);

  // Formulario para pedir cita
  const [formData, setFormData] = useState({
    procedimiento: '',
    doctor: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

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
        
        // También inicializar el formulario de edición con los datos actuales
        setEditProfileData(parsedUserData);
        
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
      navigate('/');
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
  }, [navigate]); // Solo navigate como dependencia

  // Función para cambiar de pestaña
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
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar cambios en el formulario de edición de perfil
  const handleEditProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData({
      ...editProfileData,
      [name]: value
    });
  };

  // Enviar formulario de cita
  const handleSubmitCita = (e) => {
    e.preventDefault();
    
    // Crear nueva cita
    const newCita = {
      id: Date.now(), // Usar timestamp como ID único
      procedimiento: formData.procedimiento,
      fecha: formData.fecha,
      hora: formData.hora,
      doctor: formData.doctor,
      motivo: formData.motivo
    };
    
    // Actualizar estado
    const updatedCitas = [...citas, newCita];
    setCitas(updatedCitas);
    
    // Guardar en localStorage
    localStorage.setItem('userCitas', JSON.stringify(updatedCitas));
    
    // Mostrar modal de confirmación
    setShowConfirmationModal(true);
    
    // Cerrar el modal después de 4 segundos y cambiar a pestaña de citas
    setTimeout(() => {
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
    }, 4000);
  };

  // Función para cerrar el modal de confirmación
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

  // Función para mostrar modal de eliminación
  const handleShowDeleteModal = (id) => {
    setCitaToDelete(id);
    setShowDeleteModal(true);
  };

  // Función para cancelar cita desde el modal de confirmación
  const handleConfirmDelete = () => {
    const updatedCitas = citas.filter(cita => cita.id !== citaToDelete);
    setCitas(updatedCitas);
    localStorage.setItem('userCitas', JSON.stringify(updatedCitas));
    setShowDeleteModal(false);
  };

  // Función para cerrar modal de eliminación
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCitaToDelete(null);
  };

  // Función para mostrar detalles de la cita
  const handleVerDetalleCita = (cita) => {
    setSelectedCita(cita);
  };
  
  // Función para cerrar detalle de cita
  const handleCloseDetalleCita = () => {
    setSelectedCita(null);
  };

  // Función para mostrar formulario de edición de perfil
  const handleShowEditProfileModal = () => {
    setEditProfileData(userData);
    setShowEditProfileModal(true);
  };

  // Función para cerrar modal de edición de perfil
  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  // Función para guardar cambios en el perfil
  const handleSaveProfileChanges = (e) => {
    e.preventDefault();
    
    // Actualizar datos de usuario
    setUserData(editProfileData);
    
    // Guardar en localStorage
    localStorage.setItem('userInfo', JSON.stringify(editProfileData));
    
    // Cerrar modal
    setShowEditProfileModal(false);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar sólo la info de la sesión, manteniendo otros datos si es necesario
    localStorage.removeItem('userInfo');
    // Redireccionar al login
    navigate('/login');
  };

  // Función para abrir WhatsApp
  const handleWhatsAppClick = () => {
    // Reemplaza este número con el número real de ACADES
    const phoneNumber = "573012345678"; 
    const message = encodeURIComponent("Hola, me gustaría obtener más información sobre los servicios de ACADES.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Si no hay datos de usuario, mostrar estado de carga
  if (!userData) {
    return <div className="loading">Cargando perfil...</div>;
  }

  // Obtener iniciales para el avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Función para seleccionar procedimiento
  const handleSelectProcedimiento = (nombre) => {
    setFormData({
      ...formData,
      procedimiento: nombre
    });
  };
{showLogoutModal && (
  <div className="logout-modal-overlay">
    <div className="logout-modal-box">
      <div className="logout-modal-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#f9a8d4"/>
          <path d="M9 9L15 15M15 9L9 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="logout-modal-title">¿Cerrar sesión?</div>
      <div className="logout-modal-text">¿Estás seguro que deseas cerrar sesión?</div>
      <div className="logout-modal-actions">
        <button className="logout-btn-cancel" onClick={() => setShowLogoutModal(false)}>
          Cancelar
        </button>
        <button className="logout-btn-confirm" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
)}
  return (
    <div className={`perfil-container ${fadeIn ? 'fade-in' : ''}`}>
      {/* Círculos decorativos */}
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
            <button
              className="btn-logout"
               onClick={() => setShowLogoutModal(true)}
           >
                Cerrar Sesión
              </button>
        </div>
      </nav>
 {/* MODAL DE CERRAR SESIÓN */}
    {showLogoutModal && (
      <div className="logout-modal-overlay">
        <div className="logout-modal-box">
          <div className="logout-modal-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#f9a8d4"/>
              <path d="M9 9L15 15M15 9L9 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="logout-modal-title">¿Cerrar sesión?</div>
          <div className="logout-modal-text">¿Estás seguro que deseas cerrar sesión?</div>
          <div className="logout-modal-actions">
            <button className="logout-btn-cancel" onClick={() => setShowLogoutModal(false)}>
              Cancelar
            </button>
            <button className="logout-btn-confirm" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    )}
      {/* Contenido principal */}
      <div className="main-content">
        {/* Sección Mis Citas */}
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
                        className="btn-ver-detalle" 
                        onClick={() => handleVerDetalleCita(cita)}
                      >
                        Ver Detalle
                      </button>
                      <button 
                        className="btn-cancel" 
                        onClick={() => handleShowDeleteModal(cita.id)}
                      >
                        Cancelar
                      </button>
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

        {/* Sección Pedir Cita */}
        {activeTab === 'pedirCita' && (
          <div className={`animate-on-scroll ${animateSections.pedirCita ? 'animate-in' : ''}`}>
            <h2 className="section-title">Pedir Cita</h2>
            
            {/* Procedimientos disponibles */}
            <div className="procedimientos-container">
              <h3 className="procedimientos-title">Nuestros Procedimientos</h3>
              <div className="procedimientos-grid">
                {procedimientos.map(proc => (
                  <div 
                    className="procedimiento-card" 
                    key={proc.id} 
                    onClick={() => handleSelectProcedimiento(proc.nombre)}
                  >
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
                    <option value="Dra. García">Dra. García</option>
                    <option value="Dr. Martínez">Dr. Martínez</option>
                    <option value="Dra. López">Dra. López</option>
                    <option value="Dr. Rodríguez">Dr. Rodríguez</option>
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
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="15:00 PM">15:00 PM</option>
                    <option value="16:00 PM">16:00 PM</option>
                    <option value="17:00 PM">17:00 PM</option>
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

        {/* Sección Perfil */}
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
                  <div className="info-value">{userData.email}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Cédula:</div>
                  <div className="info-value">{userData.cedula}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Teléfono:</div>
                  <div className="info-value">{userData.celular}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Fecha de nacimiento:</div>
                  <div className="info-value">{userData.fechaNacimiento}</div>
                </div>
              </div>
              <div className="profile-actions">
                <button className="btn-edit" onClick={handleShowEditProfileModal}>
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de confirmación de cita */}
      {showConfirmationModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-content">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" width="70" height="70">
                  <path fill="#a855f7" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm6.93,8.2-6.85,9.29a1,1,0,0,1-1.43.19L5.76,13.77a1,1,0,0,1-.15-1.41A1,1,0,0,1,7,12.21l4.08,3.26L17.32,7a1,1,0,0,1,1.39-.21A1,1,0,0,1,18.93,8.2Z"/>
                </svg>
              </div>
              <h3>¡Cita Confirmada!</h3>
              <p>Te hemos enviado un correo electrónico con los detalles de tu cita.</p>
              <div className="appointment-details">
                <span>Procedimiento: {formData.procedimiento}</span>
                <span>Fecha: {formData.fecha}</span>
                <span>Hora: {formData.hora}</span>
                <span>Especialista: {formData.doctor}</span>
              </div>
              <button className="modal-ok-btn" onClick={handleCloseModal}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal delete-modal">
            <div className="modal-content">
              <div className="warning-icon">
                <svg viewBox="0 0 24 24" width="70" height="70">
                  <path fill="#ef4444" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,18a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,18Zm1.5-6A1.5,1.5,0,0,1,12,13.5h0A1.5,1.5,0,0,1,10.5,12v-4A1.5,1.5,0,0,1,12,6.5h0A1.5,1.5,0,0,1,13.5,8Z"/>
                </svg>
              </div>
              <h3>Confirmar Cancelación</h3>
              <p>¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.</p>
              <div className="modal-actions">
                <button className="modal-cancel-btn" onClick={handleCancelDelete}>
                  No, Mantener
                </button>
                <button className="modal-confirm-btn" onClick={handleConfirmDelete}>
                  Sí, Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal detalle de cita */}
      {selectedCita && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal detail-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Detalle de Cita</h3>
                <button className="modal-close" onClick={handleCloseDetalleCita}>×</button>
              </div>
              <div className="cita-detail">
                <div className="detail-item">
                  <div className="detail-label">Procedimiento:</div>
                  <div className="detail-value">{selectedCita.procedimiento}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Especialista:</div>
                  <div className="detail-value">{selectedCita.doctor}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Fecha:</div>
                  <div className="detail-value">{selectedCita.fecha}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Hora:</div>
                  <div className="detail-value">{selectedCita.hora}</div>
                </div>
                {selectedCita.motivo && (
                  <div className="detail-item">
                    <div className="detail-label">Notas adicionales:</div>
                    <div className="detail-value">{selectedCita.motivo}</div>
                  </div>
                )}
                <div className="detail-item location">
                  <div className="detail-label">Ubicación:</div>
                  <div className="detail-value">
                    Centro Médico ACADES<br />
                    Calle Principal #123, Piso 3<br />
                    Referencia: Frente al Parque Central
                  </div>
                </div>
                <div className="detail-item recommendations">
                  <div className="detail-label">Recomendaciones:</div>
                  <div className="detail-value">
                    <ul>
                      <li>Llegar 15 minutos antes de la hora programada</li>
                      <li>Traer documento de identidad</li>
                      <li>Usar ropa cómoda</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="cita-actions">
                <button className="btn-cancel" onClick={() => {
                  handleCloseDetalleCita();
                  handleShowDeleteModal(selectedCita.id);
                }}>
                  Cancelar Cita
                </button>
                <button className="btn-close" onClick={handleCloseDetalleCita}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de edición de perfil */}
      {showEditProfileModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal edit-profile-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Editar Perfil</h3>
                <button className="modal-close" onClick={handleCloseEditProfileModal}>×</button>
              </div>
              <form className="edit-profile-form" onSubmit={handleSaveProfileChanges}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={editProfileData.nombre}
                    onChange={handleEditProfileInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">g,ail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editProfileData.email}
                    onChange={handleEditProfileInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cedula">Cedula</label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={editProfileData.cedula}
                    onChange={handleEditProfileInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="celular">celar</label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    value={editProfileData.celular}
                    onChange={handleEditProfileInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={editProfileData.fechaNacimiento}
                    onChange={handleEditProfileInputChange}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={handleCloseEditProfileModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      
      {}
      
    </div>
  );
};

export default PerfilD;