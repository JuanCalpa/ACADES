import React, { useState, useEffect } from 'react';
import './Admin.css';

const especialistasDataInicial = [
  { id: 1, nombre: 'Dr. Juan Pérez', email: 'juanperez@ejemplo.com', telefono: '555-456-789', especialidad: 'Dermatología' },
  { id: 2, nombre: 'Dra. María González', email: 'mariag@ejemplo.com', telefono: '555-987-654', especialidad: 'Nutrición' },
  { id: 3, nombre: 'Dr. Carlos Rodríguez', email: 'carlosr@ejemplo.com', telefono: '555-222-333', especialidad: 'Estética' }
];

//ejemplos eso pondran en la bd 
const usuariosDataInicial = [
  {
    id: 1,
    cedula: '12345678',
    contrasena: '1234',
    celular: '555-123-456',
    email: 'ana@ejemplo.com',
    nombreCompleto: 'Ana Martínez',
    fechaNacimiento: '1990-05-10',
    fechaRegistro: '2025-01-15'
  },
  {
    id: 2,
    cedula: '87654321',
    contrasena: 'abcd',
    celular: '555-789-123',
    email: 'pedro@ejemplo.com',
    nombreCompleto: 'Pedro Sánchez',
    fechaNacimiento: '1985-09-22',
    fechaRegistro: '2025-02-22'
  }
];

const AdminDashboard = () => {
  // Estados
  const [activeSection, setActiveSection] = useState('usuarios');
  const [loading, setLoading] = useState(true);
  const [usuariosData, setUsuariosData] = useState(usuariosDataInicial);
  const [especialistasData, setEspecialistasData] = useState(especialistasDataInicial);
  const [citasData, setCitasData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/citas')
      .then(res => res.json())
      .then(data => setCitasData(data))
      .catch(() => setCitasData([]));
  }, []);

  useEffect(() => {
  fetch('http://localhost:3000/api/especialistas')
    .then(res => res.json())
    .then(data => {
      const especialistas = data.map(e => ({
        id: e.id_especialista,
        nombre: e.nombre,
        email: e.correo,
        contrasena:e.contrasena,
        telefono: e.telefono,
        especialidad: e.especialidad
      }));
      setEspecialistasData(especialistas);
    })
    .catch(() => setEspecialistasData([]));
}, []);


  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddEspecialistaModal, setShowAddEspecialistaModal] = useState(false);
  const [showAddCitaModal, setShowAddCitaModal] = useState(false);

  // Usuarios
  const [newUser, setNewUser] = useState({
    id: 0,
    cedula: '',
    contrasena: '',
    celular: '',
    email: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    fechaRegistro: new Date().toISOString().split('T')[0]
  });
  const [viewUsuario, setViewUsuario] = useState(null);
  const [editUsuario, setEditUsuario] = useState(null);
  const [deleteUsuario, setDeleteUsuario] = useState(null);

  // Especialistas
  const [newEspecialista, setNewEspecialista] = useState({
    id: 0, nombre: '', email: '', telefono: '', especialidad: ''
  });
  const [viewEspecialista, setViewEspecialista] = useState(null);
  const [editEspecialista, setEditEspecialista] = useState(null);
  const [deleteEspecialista, setDeleteEspecialista] = useState(null);


  // Citas
  const [newCita, setNewCita] = useState({
    id: 0,
    cliente: '',
    especialista: '',
    procedimiento: '',
    notas: '',
    fecha: '',
    hora: '',
    estado: 'pendiente'
  });
  const [viewCita, setViewCita] = useState(null);
  const [editCita, setEditCita] = useState(null);
  const [deleteCita, setDeleteCita] = useState(null);

  //estados para la edicion de citas

  //mapeo citas
  const citasFormateadas = citasData.map(cita => ({
    id: cita.id_cita,
    cliente: cita.nombre_cliente,
    especialista: cita.nombre_especialista,
    procedimiento: cita.nombre_procedimiento,
    notas: cita.notas,
    fecha: cita.fecha,
    hora: cita.hora,
    estado: cita.estado
  }));

  //funcion para ver la cita
  const handleViewCita = async (citaId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/citas/${citaId}`);
      const data = await response.json();
      if (response.ok) {
        // Mapea los nombres de las propiedades
        const citaFormateada = {
          id: data.id_cita,
          cliente: data.nombre_cliente,
          especialista: data.nombre_especialista,
          procedimiento: data.nombre_procedimiento,
          notas: data.notas,
          fecha: data.fecha,
          hora: data.hora,
          estado: data.estado
        };
        setViewCita(citaFormateada);
      } else {
        alert(data.mensaje || 'No se pudo obtener la cita');
      }
    } catch (error) {
      alert('Error de red al obtener la cita');
    }
  };



  // Perfil
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [adminData, setAdminData] = useState({
    nombre: 'Administrador',
    email: 'admin@acades.com',
    telefono: '300-111-2222',
    imagen: null,
    rol: 'Administrador',
    biografia: 'Encargado de la gestión general de la plataforma ACADES.'
  });
  const [editData, setEditData] = useState({});

  // Logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Estado para mostrar/ocultar contraseña en formularios de usuario
  const [showPassword, setShowPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  // Estado para errores de validación en usuarios
  const [userError, setUserError] = useState('');
  const [editUserError, setEditUserError] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  // Helpers
  const getInitials = name => !name ? 'A' : name.split(' ').map(p => p.charAt(0)).join('').toUpperCase();

  // Validación de fecha de nacimiento
  function validarFechaNacimiento(fecha) {
    if (!fecha) return false;
    const fechaNac = new Date(fecha);
    const hoy = new Date();
    const year = fechaNac.getFullYear();
    const edad = hoy.getFullYear() - year - (hoy < new Date(hoy.getFullYear(), fechaNac.getMonth(), fechaNac.getDate()) ? 1 : 0);
    if (year >= 2025) return 'La fecha de nacimiento no puede ser en 2025 o posterior.';
    if (edad < 14) return 'El usuario debe tener al menos 14 años.';
    return '';
  }

  // Usuarios CRUD
  const handleUserInputChange = e => {
    // Limitar la cédula a 10 dígitos
    if (e.target.name === "cedula") {
      const value = e.target.value.replace(/\D/g, '').slice(0, 10); // solo números y máximo 10 dígitos
      setNewUser({ ...newUser, cedula: value });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const handleAddUser = e => {
    e.preventDefault();
    // Validación de longitud de 10 digitos la cedula 
    if (newUser.cedula.length > 10) {
      setUserError('La cédula no puede tener más de 10 digitos');
      return;
    }
    // Validación de unicidad
    if (
      usuariosData.some(u => u.cedula === newUser.cedula) ||
      usuariosData.some(u => u.celular === newUser.celular) ||
      usuariosData.some(u => u.email === newUser.email)
    ) {
      setUserError('No se permiten cédulas, celulares o correos repetidos');
      return;
    }
    // Validación de fecha de nacimiento
    const fechaError = validarFechaNacimiento(newUser.fechaNacimiento);
    if (fechaError) {
      setUserError(fechaError);
      return;
    }
    const newId = usuariosData.length > 0 ? Math.max(...usuariosData.map(u => u.id)) + 1 : 1;
    const userToAdd = { ...newUser, id: newId };
    setUsuariosData([...usuariosData, userToAdd]);
    setShowAddUserModal(false);
    setNewUser({
      id: 0,
      cedula: '',
      contrasena: '',
      celular: '',
      email: '',
      nombreCompleto: '',
      fechaNacimiento: '',
      fechaRegistro: new Date().toISOString().split('T')[0]
    });
    setUserError('');
  };
  const handleEditUsuario = user => {
    setEditUsuario({ ...user });
    setEditUserError('');
  };
  const handleEditUsuarioChange = e => {
    // Limitar la cédula a 10 dígitos
    if (e.target.name === "cedula") {
      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
      setEditUsuario({ ...editUsuario, cedula: value });
    } else {
      setEditUsuario({ ...editUsuario, [e.target.name]: e.target.value });
    }
  };
  const handleUpdateUsuario = e => {
    e.preventDefault();
    // Validación de longitud de la cc
    if (editUsuario.cedula.length > 10) {
      setEditUserError('La cédula no puede tener más de 10 dígitos.');
      return;
    }
    // Validación para q ninguno de estos sea =
    if (
      usuariosData.some(u => u.id !== editUsuario.id && u.cedula === editUsuario.cedula) ||
      usuariosData.some(u => u.id !== editUsuario.id && u.celular === editUsuario.celular) ||
      usuariosData.some(u => u.id !== editUsuario.id && u.email === editUsuario.email)
    ) {
      setEditUserError('No se permiten cédulas, celulares o correos repetidos.');
      return;
    }
    // validacion de fecha de nacimiento
    const fechaError = validarFechaNacimiento(editUsuario.fechaNacimiento);
    if (fechaError) {
      setEditUserError(fechaError);
      return;
    }
    setUsuariosData(usuariosData.map(u => u.id === editUsuario.id ? editUsuario : u));
    setEditUsuario(null);
    setEditUserError('');
  };
  const handleDeleteUsuario = user => setDeleteUsuario(user);
  const confirmDeleteUsuario = () => {
    setUsuariosData(usuariosData.filter(u => u.id !== deleteUsuario.id));
    setDeleteUsuario(null);
  };

  // Especialistas CRUD
  const handleEspecialistaInputChange = e => setNewEspecialista({ ...newEspecialista, [e.target.name]: e.target.value });
  const handleAddEspecialista = async (e) => {
    e.preventDefault();
    // Ajusta los nombres de los campos para que coincidan con el backend
    const especialistaToAdd = {
      nombre: newEspecialista.nombre,
      especialidad: newEspecialista.especialidad,
      telefono: newEspecialista.telefono,
      correo: newEspecialista.email,
      contrasena: newEspecialista.contrasenia
    };
    try {
      const response = await fetch('http://localhost:3000/api/especialistas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(especialistaToAdd)
      });
      const data = await response.json();
      if (response.ok) {
        // Opcional: recarga la lista desde el backend o agrega el nuevo especialista al estado
        setEspecialistasData([...especialistasData, { ...especialistaToAdd, id: data.insertId || Date.now() }]);
        setShowAddEspecialistaModal(false);
        setNewEspecialista({ id: 0, nombre: '', email: '', telefono: '', especialidad: '', contrasena: '' });
      } else {
        alert(data.mensaje || 'No se pudo agregar el especialista');
      }
    } catch (error) {
      alert('Error de red al agregar especialista');
    }
  };
  const handleEditEspecialista = esp => setEditEspecialista({ ...esp });
  const handleEditEspecialistaChange = e => setEditEspecialista({ ...editEspecialista, [e.target.name]: e.target.value });
const handleUpdateEspecialista = async (e) => {
  e.preventDefault();
  // Prepara los datos para el backend
  const especialistaToUpdate = {
    id_especialista: editEspecialista.id,
    nombre: editEspecialista.nombre,
    especialidad: editEspecialista.especialidad,
    telefono: editEspecialista.telefono,
    correo: editEspecialista.email,
    contrasena: editEspecialista.contrasena
  };
  try {
    const response = await fetch('http://localhost:3000/api/especialista/editar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(especialistaToUpdate)
    });
    const data = await response.json();
    if (response.ok) {
      // Actualiza el estado local con los cambios
      setEspecialistasData(especialistasData.map(esp =>
        esp.id === editEspecialista.id ? { ...esp, ...editEspecialista } : esp
      ));
      setEditEspecialista(null);
    } else {
      alert(data.mensaje || 'No se pudo actualizar el especialista');
    }
  } catch (error) {
    alert('Error de red al actualizar especialista');
  }
};
  const handleDeleteEspecialista = esp => setDeleteEspecialista(esp);
  const confirmDeleteEspecialista = async() => {
   if (!deleteEspecialista) return;
  try {
    const response = await fetch(`http://localhost:3000/api/especialistas/${deleteEspecialista.id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (response.ok) {
      setEspecialistasData(especialistasData.filter(esp => esp.id !== deleteEspecialista.id));
      setDeleteEspecialista(null);
    } else {
      alert(data.mensaje || 'No se pudo eliminar el especialista');
    }
  } catch (error) {
    alert('Error de red al eliminar especialista');
  }
  };

  // Citas CRUD
  const handleCitaInputChange = e => setNewCita({ ...newCita, [e.target.name]: e.target.value });
  const handleAddCita = e => {
    e.preventDefault();
    const newId = citasData.length > 0 ? Math.max(...citasData.map(c => c.id)) + 1 : 1;
    const citaToAdd = { ...newCita, id: newId };
    setCitasData([...citasData, citaToAdd]);
    setShowAddCitaModal(false);
    setNewCita({ id: 0, cliente: '', especialista: '', procedimiento: '', notas: '', fecha: '', hora: '', estado: 'pendiente' });
  };
  const handleEditCita = cita => setEditCita({ ...cita });
  const handleEditCitaChange = e => setEditCita({ ...editCita, [e.target.name]: e.target.value });




  //funcion para eliminar cita
  const handleDeleteCita = async (cita) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/citas/${cita.id_cita || cita.id}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (response.ok) {
        // Actualiza la lista de citas después de eliminar
        setCitasData(prev => prev.filter(c => (c.id_cita || c.id) !== (cita.id_cita || cita.id)));
        alert('Cita eliminada correctamente');
      } else {
        alert(data.mensaje || 'No se pudo eliminar la cita');
      }
    } catch (error) {
      alert('Error de red al eliminar la cita');
    }
  };


  const confirmDeleteCita = () => {
    setCitasData(citasData.filter(c => c.id !== deleteCita.id));
    setDeleteCita(null);
  };

  // Perfil
  const openProfileModal = () => { setEditData({ ...adminData }); setShowProfileModal(true); };
  const closeProfileModal = () => setShowProfileModal(false);
  const saveProfileChanges = () => { setAdminData({ ...editData }); setShowProfileModal(false); };

  // Logout
  const handleLogoutClick = () => setShowLogoutModal(true);
  const cancelLogout = () => setShowLogoutModal(false);
  const confirmLogout = () => {
    setShowLogoutModal(false);
    window.location.href = '/registro'; // esta lleva a registro no le van a cambiar la ruta
  };

  // Render helpers
  const renderUsuarios = () => (
    <div className="admin-table-container">
      <div className="table-header">
        <h3>Pacientes Acades </h3>
        <button className="btn-add" onClick={() => setShowAddUserModal(true)}>+ Añadir Usuario</button>
      </div>
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cédula</th>
              <th>Contraseña</th>
              <th>Celular</th>
              <th>Email</th>
              <th>Nombre Completo</th>
              <th>Fecha Nacimiento</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.cedula}</td>
                <td>{user.contrasena}</td>
                <td>{user.celular}</td>
                <td>{user.correo}</td>
                <td>{user.nombreCompleto}</td>
                <td>{user.fechaNacimiento}</td>
                <td>{user.fechaRegistro}</td>
                <td className="acciones">
                  <button className="btn-accion ver" title="Ver" onClick={() => setViewUsuario(user)}>👁️</button>
                  <button className="btn-accion editar" title="Editar" onClick={() => handleEditUsuario(user)}>✏️</button>
                  <button className="btn-accion eliminar" title="Eliminar" onClick={() => handleDeleteUsuario(user)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEspecialistas = () => (
    <div className="admin-table-container">
      <div className="table-header">
        <h3>Especialistas de Acades</h3>
        <button className="btn-add" onClick={() => setShowAddEspecialistaModal(true)}>+ Añadir Especialista</button>
      </div>
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Especialidad</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialistasData.map(esp => (
              <tr key={esp.id}>
                <td>{esp.id}</td>
                <td>{esp.nombre}</td>
                <td>{esp.email}</td>
                <td>{esp.telefono}</td>
                <td>{esp.especialidad}</td>
                <td className="acciones">
                  <button className="btn-accion ver" title="Ver" onClick={() => setViewEspecialista(esp)}>👁️</button>
                  <button className="btn-accion editar" title="Editar" onClick={() => handleEditEspecialista(esp)}>✏️</button>
                  <button className="btn-accion eliminar" title="Eliminar" onClick={() => handleDeleteEspecialista(esp)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCitas = () => (
    <div className="admin-table-container">
      <div className="table-header">
        <h3>Todas las Citas</h3>
      </div>
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID Cita</th>
              <th>Cliente</th>
              <th>Especialista</th>
              <th>Procedimiento</th>
              <th>Notas</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFormateadas.map(cita => (
              <tr key={cita.id}>
                <td>{cita.id}</td>
                <td>{cita.cliente}</td>
                <td>{cita.especialista}</td>
                <td>{cita.procedimiento}</td>
                <td>{cita.notas}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.estado}</td>
                <td className="acciones">
                  <button
                    className="btn-accion ver"
                    title="Ver"
                    onClick={() => handleViewCita(cita.id_cita || cita.id)}
                  >
                    👁️
                  </button>

                  <button
                    className="btn-accion eliminar"
                    title="Eliminar"
                    onClick={() => handleDeleteCita(cita)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render principal según sección
  const renderMainContent = () => {
    switch (activeSection) {
      case 'usuarios':
        return (
          <div className="usuarios-section animate-on-scroll animate-in">
            <h2 className="section-title">Gestión de Usuarios</h2>
            {renderUsuarios()}
          </div>
        );
      case 'especialistas':
        return (
          <div className="especialistas-section animate-on-scroll animate-in">
            <h2 className="section-title">Gestión de Especialistas</h2>
            {renderEspecialistas()}
          </div>
        );
      case 'citas':
        return (
          <div className="citas-section animate-on-scroll animate-in">
            <h2 className="section-title">Gestión de Citas</h2>
            {renderCitas()}
          </div>
        );
      case 'perfil':
        return (
          <div className="perfil-admin-section animate-on-scroll animate-in">
            <h2 className="section-title">Mi Perfil</h2>
            <div className="perfil-admin-container">
              <div className="perfil-card">
                <div className="perfil-header">
                  <div className="perfil-avatar">
                    {adminData.imagen ? (
                      <img src={adminData.imagen} alt={adminData.nombre} />
                    ) : (
                      getInitials(adminData.nombre)
                    )}
                  </div>
                  <h3 className="perfil-name">{adminData.nombre}</h3>
                  <span className="perfil-role">{adminData.rol}</span>
                </div>
                <div className="perfil-info">
                  <div className="info-section">
                    <h4>Información de Contacto</h4>
                    <div className="info-item">
                      <div className="info-label"><i className="icon-mail">✉️</i> Email:</div>
                      <div className="info-value">{adminData.email}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label"><i className="icon-phone">📱</i> Teléfono:</div>
                      <div className="info-value">{adminData.telefono}</div>
                    </div>
                  </div>
                  <div className="info-section">
                    <h4>Acerca de Mí</h4>
                    <p className="biografia">{adminData.biografia}</p>
                  </div>
                </div>
                <div className="perfil-actions">
                  <button className="btn-edit" onClick={openProfileModal}>Editar Perfil</button>
                </div>
              </div>
              <div className="perfil-stats">
                <div className="stat-card"><div className="stat-icon usuarios-icon">🤍</div><div className="stat-value">{usuariosData.length}</div><div className="stat-label">Usuarios</div></div>
                <div className="stat-card"><div className="stat-icon especialistas-icon">🩵</div><div className="stat-value">{especialistasData.length}</div><div className="stat-label">Especialistas</div></div>
                <div className="stat-card"><div className="stat-icon citas-icon"></div>🤍<div className="stat-value">{citasData.length}</div><div className="stat-label">Citas</div></div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span className="loading-text">Cargando panel de administración...</span>
      </div>
    );
  }

  // Render principal
  return (
    <div className="admin-dashboard-container fade-in">
      {/* Navbar */}
      <div className="navbar-admin animate-in">
        <div className="logo">
          <h1>ACADES</h1>
          <div className="admin-tag">Panel de Administración</div>
        </div>
        <div className="nav-links">
          <button className={`nav-link ${activeSection === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveSection('usuarios')}>Pacientes</button>
          <button className={`nav-link ${activeSection === 'especialistas' ? 'active' : ''}`} onClick={() => setActiveSection('especialistas')}>Especialistas</button>
          <button className={`nav-link ${activeSection === 'citas' ? 'active' : ''}`} onClick={() => setActiveSection('citas')}>Citas</button>
          <button className={`nav-link ${activeSection === 'perfil' ? 'active' : ''}`} onClick={() => setActiveSection('perfil')}>Mi Perfil</button>
        </div>
        <div className="user-menu">
          <div className="admin-mini-avatar" onClick={() => setActiveSection('perfil')}>
            {adminData.imagen ? (
              <img src={adminData.imagen} alt={adminData.nombre} />
            ) : (
              getInitials(adminData.nombre)
            )}
          </div>
          <span className="admin-name">{adminData.nombre}</span>
          <button className="btn-logout" onClick={handleLogoutClick}>Cerrar sesión</button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        {renderMainContent()}
      </div>

      {/* Modales */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-container logout-modal">
            <div className="modal-header">
              <h3>Cerrar Sesión</h3>
              <button className="modal-close" onClick={cancelLogout}>✕</button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro que deseas cerrar sesión?</p>
              <div className="modal-actions">
                <button className="btn-modal-cancel" onClick={cancelLogout}>Cancelar</button>
                <button className="btn-modal-confirm" onClick={confirmLogout}>Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="modal-overlay">
          <div className="modal-container profile-modal">
            <div className="modal-header">
              <h3>Editar Perfil</h3>
              <button className="modal-close" onClick={closeProfileModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="perfil-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={editData.nombre} onChange={e => setEditData({ ...editData, nombre: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input type="tel" id="telefono" name="telefono" value={editData.telefono} onChange={e => setEditData({ ...editData, telefono: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="rol">Rol</label>
                  <input type="text" id="rol" name="rol" value={editData.rol} onChange={e => setEditData({ ...editData, rol: e.target.value })} />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="biografia">Biografía</label>
                  <textarea id="biografia" name="biografia" rows="4" value={editData.biografia} onChange={e => setEditData({ ...editData, biografia: e.target.value })}></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-modal-cancel" onClick={closeProfileModal}>Cancelar</button>
                <button className="btn-modal-confirm save" onClick={saveProfileChanges}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRUD PACIENTES (antes USUARIOS) */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal-container form-modal">
            <div className="modal-header">
              <h3>Añadir Nuevo Paciente</h3>
              <button className="modal-close" onClick={() => setShowAddUserModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddUser}>
                <div className="form-group">
                  <label htmlFor="new-cedula">Cédula</label>
                  <input type="text" id="new-cedula" name="cedula" value={newUser.cedula} onChange={handleUserInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="new-contrasena">Contraseña</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="new-contrasena"
                      name="contrasena"
                      value={newUser.contrasena}
                      onChange={handleUserInputChange}
                      required
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'none', border: 'none', marginLeft: 8, cursor: 'pointer' }}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="new-celular">Celular</label>
                  <input type="text" id="new-celular" name="celular" value={newUser.celular} onChange={handleUserInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="new-email">Correo</label>
                  <input type="email" id="new-email" name="email" value={newUser.email} onChange={handleUserInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="new-nombreCompleto">Nombre Completo</label>
                  <input type="text" id="new-nombreCompleto" name="nombreCompleto" value={newUser.nombreCompleto} onChange={handleUserInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="new-fechaNacimiento">Fecha Nacimiento</label>
                  <input type="date" id="new-fechaNacimiento" name="fechaNacimiento" value={newUser.fechaNacimiento} onChange={handleUserInputChange} required />
                </div>
                {userError && (
                  <div style={{ color: 'red', marginBottom: 10 }}>{userError}</div>
                )}
                <div className="modal-actions">
                  <button type="button" className="btn-modal-cancel" onClick={() => setShowAddUserModal(false)}>Cancelar</button>
                  <button type="submit" className="btn-modal-confirm add">Añadir Usuario</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {editUsuario && (
        <div className="modal-overlay">
          <div className="modal-container form-modal small-modal">
            <div className="modal-header">
              <h3>Editar Paciente</h3>
              <button className="modal-close" onClick={() => setEditUsuario(null)}>✕</button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleUpdateUsuario}>
                <div className="form-group">
                  <label>Cédula</label>
                  <input type="text" name="cedula" value={editUsuario.cedula} onChange={handleEditUsuarioChange} required />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type={showEditPassword ? "text" : "password"}
                      name="contrasena"
                      value={editUsuario.contrasena}
                      onChange={handleEditUsuarioChange}
                      required
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowEditPassword(!showEditPassword)}
                      style={{ background: 'none', border: 'none', marginLeft: 8, cursor: 'pointer' }}
                      aria-label={showEditPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showEditPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Celular</label>
                  <input type="text" name="celular" value={editUsuario.celular} onChange={handleEditUsuarioChange} required />
                </div>
                <div className="form-group">
                  <label>Correo</label>
                  <input type="email" name="email" value={editUsuario.email} onChange={handleEditUsuarioChange} required />
                </div>
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" name="nombreCompleto" value={editUsuario.nombreCompleto} onChange={handleEditUsuarioChange} required />
                </div>
                <div className="form-group">
                  <label>Fecha Nacimiento</label>
                  <input type="date" name="fechaNacimiento" value={editUsuario.fechaNacimiento} onChange={handleEditUsuarioChange} required />
                </div>
                {editUserError && (
                  <div style={{ color: 'red', marginBottom: 10 }}>{editUserError}</div>
                )}
                <div className="modal-actions">
                  <button type="button" className="btn-modal-cancel" onClick={() => setEditUsuario(null)}>Cancelar</button>
                  <button type="submit" className="btn-modal-confirm save">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {deleteUsuario && (
        <div className="modal-overlay">
          <div className="modal-container logout-modal small-modal">
            <div className="modal-header">
              <h3>Eliminar Paciente</h3>
              <button className="modal-close" onClick={() => setDeleteUsuario(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>¿Seguro que deseas eliminar el paciente <strong>{deleteUsuario.nombreCompleto}</strong>?</p>
              <div className="modal-actions">
                <button className="btn-modal-cancel" onClick={() => setDeleteUsuario(null)}>Cancelar</button>
                <button className="btn-modal-confirm" onClick={confirmDeleteUsuario}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRUD ESPECIALISTAS */}
      {showAddEspecialistaModal && (
        <div className="modal-overlay">
          <div className="modal-container form-modal">
            <div className="modal-header">
              <h3>Añadir Nuevo Especialista</h3>
              <button className="modal-close" onClick={() => setShowAddEspecialistaModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddEspecialista}>
                <div className="form-group">
                  <label htmlFor="esp-nombre">Nombre</label>
                  <input type="text" id="esp-nombre" name="nombre" value={newEspecialista.nombre} onChange={handleEspecialistaInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="esp-telefono">Teléfono</label>
                  <input type="tel" id="esp-telefono" name="telefono" value={newEspecialista.telefono} onChange={handleEspecialistaInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="esp-especialidad">Especialidad</label>
                  <input type="text" id="esp-especialidad" name="especialidad" value={newEspecialista.especialidad} onChange={handleEspecialistaInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="esp-email">Email</label>
                  <input type="email" id="esp-email" name="email" value={newEspecialista.email} onChange={handleEspecialistaInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="esp-contrasenia">Contraseña</label>
                  <input type="text" id="esp-contrasenia" name="contrasenia" value={newEspecialista.contrasenia} onChange={handleEspecialistaInputChange} required />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-modal-cancel" onClick={() => setShowAddEspecialistaModal(false)}>Cancelar</button>
                  <button type="submit" className="btn-modal-confirm add">Añadir Especialista</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {viewEspecialista && (
        <div className="modal-overlay">
          <div className="modal-container form-modal">
            <div className="modal-header">
              <h3>Detalles del Especialista</h3>
              <button className="modal-close" onClick={() => setViewEspecialista(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p><strong>Nombre:</strong> {viewEspecialista.nombre}</p>
              <p><strong>Email:</strong> {viewEspecialista.email}</p>
              <p><strong>Teléfono:</strong> {viewEspecialista.telefono}</p>
              <p><strong>Especialidad:</strong> {viewEspecialista.especialidad}</p>
            </div>
          </div>
        </div>
      )}
      {editEspecialista && (
        <div className="modal-overlay">
          <div className="modal-container form-modal">
            <div className="modal-header">
              <h3>Editar Especialista</h3>
              <button className="modal-close" onClick={() => setEditEspecialista(null)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateEspecialista}>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" name="nombre" value={editEspecialista.nombre} onChange={handleEditEspecialistaChange} required />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" name="telefono" value={editEspecialista.telefono} onChange={handleEditEspecialistaChange} required />
                </div>
                <div className="form-group">
                  <label>Especialidad</label>
                  <input type="text" name="especialidad" value={editEspecialista.especialidad} onChange={handleEditEspecialistaChange} required />
                </div>
                 <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={editEspecialista.email} onChange={handleEditEspecialistaChange} required />
                </div>
                 <div className="form-group">
                  <label>Contraseña</label>
                  <input type="contrasena" name="contrasena" value={editEspecialista.contrasena} onChange={handleEditEspecialistaChange} required />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-modal-cancel" onClick={() => setEditEspecialista(null)}>Cancelar</button>
                  <button type="submit" className="btn-modal-confirm save">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {deleteEspecialista && (
        <div className="modal-overlay">
          <div className="modal-container logout-modal">
            <div className="modal-header">
              <h3>Eliminar Especialista</h3>
              <button className="modal-close" onClick={() => setDeleteEspecialista(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>
                <strong>¡Atención!</strong> Esta acción es <span style={{ color: 'red', fontWeight: 'bold' }}>irreversible</span>.<br />
                Si eliminas al especialista <strong>{deleteEspecialista.nombre}</strong>, <u>se eliminarán también todas las citas y registros asociados a este especialista</u>.<br /><br />
                ¿Estás completamente seguro de que deseas continuar?
              </p>
              <div className="modal-actions">
                <button className="btn-modal-cancel" onClick={() => setDeleteEspecialista(null)}>Cancelar</button>
                <button className="btn-modal-confirm" onClick={confirmDeleteEspecialista}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRUD CITAS */}

      {viewCita && (
        <div className="modal-overlay">
          <div className="modal-container form-modal">
            <div className="modal-header">
              <h3>Detalles de la Cita</h3>
              <button className="modal-close" onClick={() => setViewCita(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p><strong>ID Cita:</strong> {viewCita.id}</p>
              <p><strong>Cliente:</strong> {viewCita.cliente}</p>
              <p><strong>Especialista:</strong> {viewCita.especialista}</p>
              <p><strong>Procedimiento:</strong> {viewCita.procedimiento}</p>
              <p><strong>Notas:</strong> {viewCita.notas}</p>
              <p><strong>Fecha:</strong> {viewCita.fecha && viewCita.fecha.split('T')[0]}</p>
              <p><strong>Hora:</strong> {viewCita.hora}</p>
              <p><strong>Estado:</strong> {viewCita.estado}</p>
            </div>
          </div>
        </div>
      )}
      {editCita && (
        <div className="modal-overlay">
          <div className="modal-container form-modal">
            <div className="modal-header">
              <h3>Editar Cita</h3>
              <button className="modal-close" onClick={() => setEditCita(null)}>✕</button>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <label>Cliente</label>
                  <input type="text" name="cliente" value={editCita.cliente} onChange={handleEditCitaChange} required />
                </div>
                <div className="form-group">
                  <label>Especialista</label>
                  <input type="text" name="especialista" value={editCita.especialista} onChange={handleEditCitaChange} required />
                </div>
                <div className="form-group">
                  <label>Procedimiento</label>
                  <input type="text" name="procedimiento" value={editCita.procedimiento} onChange={handleEditCitaChange} required />
                </div>
                <div className="form-group">
                  <label>Notas</label>
                  <input type="text" name="notas" value={editCita.notas} onChange={handleEditCitaChange} />
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" name="fecha" value={editCita.fecha} onChange={handleEditCitaChange} required />
                </div>
                <div className="form-group">
                  <label>Hora</label>
                  <input type="time" name="hora" value={editCita.hora} onChange={handleEditCitaChange} required />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select name="estado" value={editCita.estado} onChange={handleEditCitaChange}>
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-modal-cancel" onClick={() => setEditCita(null)}>Cancelar</button>
                  <button type="submit" className="btn-modal-confirm save">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {deleteCita && (
        <div className="modal-overlay">
          <div className="modal-container logout-modal">
            <div className="modal-header">
              <h3>Eliminar Cita</h3>
              <button className="modal-close" onClick={() => setDeleteCita(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>¿Seguro que deseas eliminar la cita de <strong>{deleteCita.usuario}</strong> con <strong>{deleteCita.especialista}</strong>?</p>
              <div className="modal-actions">
                <button className="btn-modal-cancel" onClick={() => setDeleteCita(null)}>Cancelar</button>
                <button className="btn-modal-confirm" onClick={confirmDeleteCita}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {viewUsuario && (
        <div className="modal-overlay">
          <div className="modal-container form-modal small-modal">
            <div className="modal-header">
              <h3>Detalles del Paciente</h3>
              <button className="modal-close" onClick={() => setViewUsuario(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p><strong>Cédula:</strong> {viewUsuario.cedula}</p>
              <p><strong>Contraseña:</strong> {viewUsuario.contrasena}</p>
              <p><strong>Celular:</strong> {viewUsuario.celular}</p>
              <p><strong>Email:</strong> {viewUsuario.email}</p>
              <p><strong>Nombre Completo:</strong> {viewUsuario.nombreCompleto}</p>
              <p><strong>Fecha Nacimiento:</strong> {viewUsuario.fechaNacimiento}</p>
              <p><strong>Fecha Registro:</strong> {viewUsuario.fechaRegistro}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;