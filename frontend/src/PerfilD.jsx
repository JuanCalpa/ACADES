import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilD.css';

const PerfilD = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del usuario

  const [userData, setUserData] = useState(null);

  //estado para seleccionar especialistas
  const [especialistas, setEspecialistas] = useState([]);

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
    id_procedimiento: '',
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

  useEffect(() => {
    const storedUserData = localStorage.getItem('userInfo');

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setEditProfileData(parsedUserData);

        // Cargar citas del backend según el id del usuario
        const id_cliente = parsedUserData.id || parsedUserData.id_cliente;
        fetch(`http://localhost:3000/api/citas/paciente/${id_cliente}`)
          .then(res => res.json())
          .then(data => setCitas(data))
          .catch(() => setCitas([]));
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
      setAnimateSections(prevState => ({
        ...prevState,
        citas: true
      }));
    }, 600);
  }, [navigate]);

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
  const handleSubmitCita = async (e) => {
    e.preventDefault();

    // Construye el objeto con los datos del formulario
    const citaData = {
      id_cliente: userData.id || userData.id_cliente,
      id_especialista: formData.doctor,
      id_procedimiento: formData.id_procedimiento,
      notas: formData.motivo,
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
        setShowConfirmationModal(true);
        setFormData({
          id_procedimiento: '',
          doctor: '',
          fecha: '',
          hora: '',
          motivo: ''
        });
        // Opcional: recargar citas o cambiar de tab
        handleTabChange('citas');
      } else {
        alert(data.mensaje || 'Error al crear la cita');
      }
    } catch (error) {
      alert('Error de red al crear la cita');
    }
  };

  //funcion para cambiar el especialista segun el procedimiento
  const handleProcedimientoChange = async (e) => {
    const id_procedimiento = e.target.value;
    setFormData(prev => ({
      ...prev,
      id_procedimiento,
      doctor: '' // <-- Limpia el especialista seleccionado
    }));
    setEspecialistas([]); // <-- Limpia la lista antes de cargar

    if (id_procedimiento) {
      try {
        const res = await fetch(`http://localhost:3000/api/especialistas-por-procedimiento?id_procedimiento=${id_procedimiento}`);
        const data = await res.json();
        setEspecialistas(data);
      } catch {
        setEspecialistas([]);
      }
    }
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
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/citas/${citaToDelete}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        // Recargar citas desde el backend
        const id_cliente = userData.id || userData.id_cliente;
        fetch(`http://localhost:3000/api/citas/paciente/${id_cliente}`)
          .then(res => res.json())
          .then(data => setCitas(data))
          .catch(() => setCitas([]));
        setShowDeleteModal(false);
        setCitaToDelete(null);
      } else {
        alert(data.mensaje || 'Error al cancelar la cita');
      }
    } catch (error) {
      alert('Error de red al cancelar la cita');
    }
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
  const handleSaveProfileChanges = async (e) => {
    e.preventDefault();

    const id = userData.id || userData.id_cliente;
    const updatedData = {
      nombre: editProfileData.nombre,
      correo: editProfileData.correo,     
      telefono: editProfileData.telefono, 
      cedula: editProfileData.cedula

    };

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          ...updatedData
        }));
        setShowEditProfileModal(false);
        alert('Perfil actualizado correctamente');
      } else {
        alert(data.mensaje || 'Error al actualizar el perfil');
      }
    } catch (error) {
      alert('Error de red al actualizar el perfil');
    }
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
  const handleSelectProcedimiento = async (nombre, id) => {
    setFormData(prev => ({
      ...prev,
      id_procedimiento: id,
      procedimiento: nombre,
      doctor: '' // <-- Limpia el especialista seleccionado
    }));
    setEspecialistas([]); // <-- Limpia la lista antes de cargar

    if (id) {
      try {
        const res = await fetch(`http://localhost:3000/api/especialistas-por-procedimiento?id_procedimiento=${id}`);
        const data = await res.json();
        setEspecialistas(data);
      } catch {
        setEspecialistas([]);
      }
    }
  };

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
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Sección Mis Citas */}
        {activeTab === 'citas' && (
          <div className={`animate-on-scroll ${animateSections.citas ? 'animate-in' : ''}`}>
            <h2 className="section-title">Mis Citas</h2>
            {citas.length > 0 ? (
              <div className="citas-list">
                {citas.map(cita => (
                  <div className="cita-card" key={cita.id_cita}>
                    <div className="cita-header">
                      <div className="cita-fecha">
                        <span className="fecha">{cita.fecha}</span>
                        <span className="hora">{cita.hora}</span>
                      </div>
                      <span className="cita-doctor">{cita.doctor}</span>
                    </div>
                    <div className="cita-body">
                      {cita.nombre_procedimiento && (
                        <p className="cita-procedimiento">
                          <span className="procedimiento-icon">💜</span>
                          {cita.nombre_procedimiento}
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
                        onClick={() => handleShowDeleteModal(cita.id_cita)}
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
                    onClick={() => handleSelectProcedimiento(proc.nombre, proc.id)}
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
                    name="id_procedimiento"
                    value={formData.id_procedimiento}
                    onChange={handleProcedimientoChange}
                    required
                  >
                    <option value="">Seleccionar procedimiento</option>
                    {procedimientos.map(proc => (
                      <option key={proc.id} value={proc.id}>
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
                        {esp.nombre}
                      </option>
                    ))}
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
                    <option value="09:00:00">09:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="15:00:00">03:00 PM</option>
                    <option value="16:00:00">04:00 PM</option>
                    <option value="17:00:00">05:00 PM</option>
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
                  <path fill="#a855f7" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm6.93,8.2-6.85,9.29a1,1,0,0,1-1.43.19L5.76,13.77a1,1,0,0,1-.15-1.41A1,1,0,0,1,7,12.21l4.08,3.26L17.32,7a1,1,0,0,1,1.39-.21A1,1,0,0,1,18.93,8.2Z" />
                </svg>
              </div>
              <h3>¡Cita Solicitada!</h3>
              <p>Espera un correo electrónico con los detalles de tu cita.</p>
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
                  <path fill="#ef4444" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,18a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,18Zm1.5-6A1.5,1.5,0,0,1,12,13.5h0A1.5,1.5,0,0,1,10.5,12v-4A1.5,1.5,0,0,1,12,6.5h0A1.5,1.5,0,0,1,13.5,8Z" />
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
                  <div className="detail-value">{selectedCita.nombre_procedimiento}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Especialista:</div>
                  <div className="detail-value">{selectedCita.nombre_especialista}</div>
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
                    <div className="detail-value">{selectedCita.notas}</div>
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
                  handleShowDeleteModal(selectedCita.id_cita);
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
                  <label htmlFor="email">correo</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editProfileData.correo}
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
                  <label htmlFor="celular">telefono</label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    value={editProfileData.telefono}
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


      {/* Boton flotante de WhatsApp */}
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