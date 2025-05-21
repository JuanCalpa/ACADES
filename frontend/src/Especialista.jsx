import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Especialista.css';

const Especialista = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del especialista
  const [especialistaData, setEspecialistaData] = useState(null);

  // Estados para las animaciones
  const [fadeIn, setFadeIn] = useState(false);
  const [activeTab, setActiveTab] = useState('citasPendientes');
  const [animateNavbar, setAnimateNavbar] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [animateSections, setAnimateSections] = useState({
  

    perfil: false,
    citasPendientes: false,
    citasConfirmadas: false,
    historialCitas: false,
    disponibilidad: false
  });

  // Estado para mostrar modal de confirmación/rechazo
  const [showActionModal, setShowActionModal] = useState(false);
  const [modalAction, setModalAction] = useState('confirmar');
  const [selectedCita, setSelectedCita] = useState(null);
  const [modalNote, setModalNote] = useState('');

  // Datos para citas
  const [citasPendientes, setCitasPendientes] = useState([]);
  const [citasConfirmadas, setCitasConfirmadas] = useState([]);
  const [historialCitas, setHistorialCitas] = useState([]);

  // Filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('todas');

  // Edición de perfil
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Días y horarios disponibles
  const [disponibilidad, setDisponibilidad] = useState({
    diasDisponibles: {}, // Formato: { '2025-05-20': true, '2025-05-21': false, ... }
    horarioLaboral: {
      inicio: '09:00',
      fin: '17:00'
    },
    diasSemana: {
      lunes: true,
      martes: true,
      miercoles: true,
      jueves: true,
      viernes: true,
      sabado: false,
      domingo: false
    },
    excepcionesFechas: [], // Fechas específicas bloqueadas
    horasExcluidas: [] // Horas específicas bloqueadas
  });

  // Para el calendario
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const fetchCitas = async (tipo, setCitas) => {
      const especialistaInfo = JSON.parse(localStorage.getItem('userInfo')) || JSON.parse(localStorage.getItem('especialistaInfo'));
      const idEspecialista = especialistaInfo?.id_especialista || especialistaInfo?.id;
      if (!idEspecialista) return;

      // Cambia la URL según tu backend
      let url = '';
      if (tipo === 'pendientes') {
        url = `http://localhost:3000/api/especialista/citas/pendientes/${idEspecialista}`;
      } else if (tipo === 'confirmadas') {
        url = `http://localhost:3000/api/especialista/citas/confirmadas/${idEspecialista}`;
      } else if (tipo === 'historial') {
        url = `http://localhost:3000/api/especialista/citas/${idEspecialista}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Citas obtenidas:', data);
        const citasMapeadas = data.map(cita => ({
          id: cita.id_cita,
          paciente: cita.nombre_cliente || 'Paciente',
          especialista: cita.nombre_especialista || '',
          procedimiento: cita.nombre_procedimiento || '',
          fecha: cita.fecha,
          hora: cita.hora,
          estado: cita.estado,
          notas: cita.notas || '',
          estadoHora: cita.estado_hora || '',
          contacto: cita.correo || '',
          celular: cita.telefono || ''
        }));


        console.log('Citas obtenidas2:', citasMapeadas);
        if (tipo === 'pendientes') {
          setCitasPendientes(citasMapeadas);
        } else if (tipo === 'confirmadas') {
          setCitasConfirmadas(citasMapeadas);
        } else if (tipo === 'historial') {
          setHistorialCitas(citasMapeadas);
        }
        setCitas(citasMapeadas);
      } catch {
        setCitas([]);
      }
      const storedEspecialista = localStorage.getItem('userInfo') || localStorage.getItem('especialistaInfo');
      if (storedEspecialista) {
        try {
          const parsed = JSON.parse(storedEspecialista);
          setEspecialistaData(parsed);
          setEditData(parsed); // Si tienes edición de perfil
        } catch (error) {
          console.error('Error al parsear datos del especialista:', error);
          navigate('/Registro');
        }
      } else {
        navigate('/Registro');
      }

    };
  const fetchCitaPorId = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/citas/especialista/${id}`);
      const data = await res.json();
      const cita = {
        id: data.id_cita,
        paciente: data.nombre_cliente || 'Paciente',
        especialista: data.nombre_especialista || '',
        procedimiento: data.nombre_procedimiento || '',
        fecha: data.fecha,
        hora: data.hora,
        estado: data.estado,
        notas: data.notas || '',
        contacto: data.correo || '',
        estadoHora: data.estado_hora || ''
        // Agrega aquí otros campos si tu backend los retorna
      };
      setSelectedCita(cita);
    } catch (error) {
      console.error('Error al obtener la cita:', error);
      setSelectedCita(null);
    }
  };

  // Cargar datos del especialista y citas del localStorage al iniciar
  useEffect(() => {
    


    // Define la función loadDemoCitas dentro del useEffect
    const loadDemoCitas = () => {
      // Citas de ejemplo aqui pondran su logica y conectan con bd 
      const demoPendientes = [

      ];

      // Citas confirmadas aki tambien ponen la logik
      const demoConfirmadas = [

      ];

      // Historial de citas  ya con crud 
      const demoHistorial = [

      ];

      // Actualizar estados y localStorage

    };

    // Intentar obtener los datos del especialista del localStorage
    const storedEspecialistaData = localStorage.getItem('especialistaInfo');

    if (storedEspecialistaData) {
      try {
        const parsedData = JSON.parse(storedEspecialistaData);
        setEspecialistaData(parsedData);
        setEditData(parsedData);


        fetchCitas('pendientes', setCitasPendientes);
        fetchCitas('confirmadas', setCitasConfirmadas);
        fetchCitas('historial', setHistorialCitas);
      } catch (error) {
        console.error('Error al parsear datos del especialista:', error);
        navigate('/login-especialista');
      }
    } else {
      // Si no hay datos de especialista reales, usar datos de ejemplo para demostrrar pero conectan bd 
      const especialistaDemo = {
      };

      setEspecialistaData(especialistaDemo);
      setEditData(especialistaDemo);
      localStorage.setItem('especialistaInfo', JSON.stringify(especialistaDemo));

      // Cargar citas de ejemplo
      loadDemoCitas();
    }

    // Iniciar animaciones
    setFadeIn(true);

    setTimeout(() => {
      setAnimateNavbar(true);
    }, 300);

    setTimeout(() => {
      setAnimateSections(prevState => ({
        ...prevState,
        citasPendientes: true
      }));
    }, 600);
  }, [navigate]);

  useEffect(() => {
  if (!especialistaData) return;

  if (activeTab === 'citasPendientes') {
    fetchCitas('pendientes', setCitasPendientes);
  } else if (activeTab === 'citasConfirmadas') {
    fetchCitas('confirmadas', setCitasConfirmadas);
  } else if (activeTab === 'historialCitas') {
    fetchCitas('historial', setHistorialCitas);
  } else if (activeTab === 'perfil') {
    // Al entrar a perfil, refresca todas las listas
    fetchCitas('pendientes', setCitasPendientes);
    fetchCitas('confirmadas', setCitasConfirmadas);
    fetchCitas('historial', setHistorialCitas);
  }
}, [activeTab, especialistaData]);

  // Función para cambiar de pestaña
  const handleTabChange = (tab) => {

    setAnimateSections({
      perfil: false,
      citasPendientes: false,
      citasConfirmadas: false,
      historialCitas: false,
      disponibilidad: false
    });


    setActiveTab(tab);


    setTimeout(() => {
      setAnimateSections(prevState => ({
        ...prevState,
        [tab]: true
      }));
    }, 300);


    setSearchTerm('');
    setDateFilter('');


    if (isEditing && tab !== 'perfil') {
      setIsEditing(false);
      setEditData(especialistaData);
    }
  };

  // Funcion para abrir el modal de confirmar cita
  const handleConfirmCita = async (cita) => {
    await fetchCitaPorId(cita.id);
    setModalAction('confirmar');
    setModalNote('');
    setShowActionModal(true);
  };

  // Funcion para abrir el modal de rechazar cita
  const handleRejectCita = async (cita) => {
    await fetchCitaPorId(cita.id);
    setModalAction('rechazar');
    setModalNote('');
    setShowActionModal(true);
  };

  // Funcion para marcar cita como completada
  const handleCompleteCita = async (cita) => {
    await fetchCitaPorId(cita.id);
    setModalAction('completar');
    setModalNote('');
    setShowActionModal(true);
  };

  // Funcion para cerrar el modal
  const handleCloseModal = () => {
    setShowActionModal(false);
    setSelectedCita(null);
    setModalNote('');
  };

  // Funcion para manejar el envío del formulario del modal
  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCita) return;

    // Crear copia de la cita con estado actualizado
    const updatedCita = {
      ...selectedCita,
      notas: modalNote
    };
    let nuevoEstado = '';
    let extraData = {};
    if (modalAction === 'confirmar') {
      nuevoEstado = 'Confirmada';
      extraData = { notas: modalNote };
    } else if (modalAction === 'rechazar') {
      nuevoEstado = 'Cancelada';
      extraData = { razonCancelacion: modalNote };
    } else if (modalAction === 'completar') {
      nuevoEstado = 'Finalizada';
      extraData = { resultado: modalNote };
    }

    // Llama al backend para cambiar el estado y enviar correo si aplica
    try {
      console.log("Enviando datos al backend:", selectedCita.contacto);
      const res = await fetch('http://localhost:3000/api/especialista/confirmarCita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_cita: selectedCita.id,
          id_especialista: especialistaData.id_especialista || especialistaData.id,
          nuevoEstado,
          usuarioEmail: selectedCita.contacto, // o el campo correcto de email
          ...extraData
        })

      });
      const data = await res.json();
      if (res.ok) {
        // Actualiza el estado local según la acción
        const updatedCita = { ...selectedCita, estado: nuevoEstado.toLowerCase(), ...extraData };

        if (modalAction === 'confirmar') {
          setCitasPendientes(citasPendientes.filter(c => c.id !== updatedCita.id));
          setCitasConfirmadas([...citasConfirmadas, updatedCita]);
        } else if (modalAction === 'rechazar') {
          setCitasPendientes(citasPendientes.filter(c => c.id !== updatedCita.id));
          setHistorialCitas([...historialCitas, updatedCita]);
        } else if (modalAction === 'completar') {
          setCitasConfirmadas(citasConfirmadas.filter(c => c.id !== updatedCita.id));
          setHistorialCitas([...historialCitas, updatedCita]);
        }

        // Opcional: actualiza localStorage si lo usas
        // ...

        handleCloseModal();
        alert(data.mensaje || 'Cita actualizada');
      } else {
        alert(data.mensaje || 'Error al actualizar la cita');
      }
    } catch (error) {
      alert('Error de red al actualizar la cita', error);
    }

    // Cerrar modal
    handleCloseModal();
  };

  // Funcio para activar modo edición del perfil
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Funcionpara cancelar edición
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(especialistaData);
  };

  // Función para guardar cambios del perfil
const handleSaveProfile = async (e) => {
  if (e) e.preventDefault();
  try {
    const res = await fetch(`http://localhost:3000/api/especialista/editar`, {
      method: 'PUT', // o 'POST' según tu backend
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData)
    });
    const data = await res.json();
    if (res.ok) {
      setEspecialistaData(editData);
      localStorage.setItem('especialistaInfo', JSON.stringify(editData));
      setIsEditing(false);
      alert(data.mensaje || 'Perfil actualizado correctamente');
    } else {
      alert(data.mensaje || 'Error al actualizar el perfil');
    }
  } catch (error) {
    alert('Error de red al actualizar el perfil');
  }
};

  // Funcio para manejar cambios en formulario de edición de perfil
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Funciones para el calendario
  const renderCalendarHeader = () => {
    const dateFormat = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' });

    return (
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={prevMonth}>&lt;</button>
          <span>{dateFormat.format(currentMonth)}</span>
          <button onClick={nextMonth}>&gt;</button>
        </div>
      </div>
    );
  };

  const getDaysInMonth = (date) => {
    // Conseguir todos los días del mes actual
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Obtener el diade la semana del primer día del mes (0 = domingo, 1 = lunes, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Dis del mes anterior para rellenar la primera fila si es necesario
    const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Ajuste para empezar semana en lunes

    // Dis del mes anterior
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const prevMonthDay = new Date(year, month, 1 - i);
      days.push({
        date: prevMonthDay,
        dayOfMonth: prevMonthDay.getDate(),
        isCurrentMonth: false,
        isToday: isSameDay(prevMonthDay, new Date())
      });
    }

    // Dias del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        dayOfMonth: day,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date())
      });
    }

    // Dias del mes siguiente para completar la última fila
    const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();
    const daysFromNextMonth = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;

    // Dias del mes siguiente
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const nextMonthDay = new Date(year, month + 1, i);
      days.push({
        date: nextMonthDay,
        dayOfMonth: nextMonthDay.getDate(),
        isCurrentMonth: false,
        isToday: isSameDay(nextMonthDay, new Date())
      });
    }

    return days;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDayAvailable = (date) => {
    const dateStr = formatDateToString(date);
    const dayOfWeek = date.getDay(); // 0 somigno y asi 

    // Mapeo de dias de la demana
    const dayMap = {
      0: 'domingo',
      1: 'lunes',
      2: 'martes',
      3: 'miercoles',
      4: 'jueves',
      5: 'viernes',
      6: 'sabado'
    };


    const isExcepcion = disponibilidad.excepcionesFechas.includes(dateStr);
    if (isExcepcion) return false;


    if (disponibilidad.diasDisponibles[dateStr] !== undefined) {
      return disponibilidad.diasDisponibles[dateStr];
    }


    return disponibilidad.diasSemana[dayMap[dayOfWeek]] || false;
  };

  const toggleDayAvailability = (date) => {
    const dateStr = formatDateToString(date);

    setDisponibilidad(prev => {
      // Crear una copia del objeto diasDisponibles
      const newDiasDisponibles = { ...prev.diasDisponibles };

      // Invertir el valor de disponibilidad para esta fecha
      newDiasDisponibles[dateStr] = !isDayAvailable(date);

      // Actualizar localStorage con los nuevos datos
      const updatedDisponibilidad = {
        ...prev,
        diasDisponibles: newDiasDisponibles
      };

      localStorage.setItem('disponibilidadEspecialista', JSON.stringify(updatedDisponibilidad));

      return updatedDisponibilidad;
    });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = getDaysInMonth(currentMonth);
    const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    return (
      <div className="calendar-body">
        <div className="weekdays">
          {daysOfWeek.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days-grid">
          {days.map((day, index) => (
            <div
              key={index}
              className={`day ${day.isCurrentMonth ? '' : 'other-month'} 
                          ${day.isToday ? 'today' : ''} 
                          ${isDayAvailable(day.date) ? 'available' : 'unavailable'}`}
              onClick={() => toggleDayAvailability(day.date)}
            >
              {day.dayOfMonth}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Funcion para manejar cambios en los horarios laborales
  const handleHorarioChange = (e) => {
    const { name, value } = e.target;

    setDisponibilidad(prev => {
      const updatedHorario = {
        ...prev.horarioLaboral,
        [name]: value
      };

      const updatedDisponibilidad = {
        ...prev,
        horarioLaboral: updatedHorario
      };

      localStorage.setItem('disponibilidadEspecialista', JSON.stringify(updatedDisponibilidad));

      return updatedDisponibilidad;
    });
  };

  // Funcion para manejar cambios en los días de la semana
  const handleDiaSemanaChange = (dia) => {
    setDisponibilidad(prev => {
      const updatedDiasSemana = {
        ...prev.diasSemana,
        [dia]: !prev.diasSemana[dia]
      };

      const updatedDisponibilidad = {
        ...prev,
        diasSemana: updatedDiasSemana
      };

      localStorage.setItem('disponibilidadEspecialista', JSON.stringify(updatedDisponibilidad));

      return updatedDisponibilidad;
    });
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/usuarios/logout', {
        method: 'POST',
        credentials: 'include', // importante para que la cookie de sesión se envíe
      });

      localStorage.removeItem('userInfo');
      // Limpia datos locales si es necesario
      localStorage.removeItem('especialistaInfo');
      localStorage.removeItem('citasPendientes');
      localStorage.removeItem('citasConfirmadas');
      localStorage.removeItem('historialCitas');
      localStorage.removeItem('disponibilidadEspecialista');
      // Redirige al login de especialista
      navigate('/login-especialista');
    } catch (error) {
      alert('Error al cerrar sesión');
      navigate('/login-especialista');
    }
  };

  // Si no hay datos de especialista, mostrar estado de carga
  if (!especialistaData) {
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

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  };

  // Filtrar citas según terminos de búsqueda y filtros
  const filterCitas = (citas) => {
    return citas.filter(cita => {
      // Filtro de búsqueda
      const searchMatch = searchTerm === '' ||
        cita.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cita.procedimiento.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de fecha
      const dateMatch = dateFilter === '' || cita.fecha === dateFilter;

      // Filtro de estado (usado principalmente en historial)
      const statusMatch = statusFilter === 'todas' || cita.estado === statusFilter;

      return searchMatch && dateMatch && statusMatch;
    });
  };

  // Ordenar citas por fecha y hora
  const sortCitas = (citas) => {
    return [...citas].sort((a, b) => {
      // Primero comparar por fecha
      const dateComparison = new Date(a.fecha) - new Date(b.fecha);
      if (dateComparison !== 0) return dateComparison;

      // Si las fechas son iguales, comparar por hora
      return a.hora.localeCompare(b.hora);
    });
  };

  // Obtener las citas filtradas y ordenadas según la pestaña activa
  const getFilteredCitas = () => {
    switch (activeTab) {
      case 'citasPendientes':
        return sortCitas(filterCitas(citasPendientes));
      case 'citasConfirmadas':
        return sortCitas(filterCitas(citasConfirmadas));
      case 'historialCitas':
        return sortCitas(filterCitas(historialCitas));
      default:
        return [];
    }
  };

  // Obtener título la pestaña activa
  const getActiveTabTitle = () => {
    switch (activeTab) {
      case 'citasPendientes':
        return 'Citas Pendientes';
      case 'citasConfirmadas':
        return 'Citas Confirmadas';
      case 'historialCitas':
        return 'Historial de Citas';
      case 'perfil':
        return 'Mi Perfil';
      case 'disponibilidad':
        return 'Gestionar Disponibilidad';
      default:
        return '';
    }
  };

  // Obtener texto del modal la acción
  const getModalTitle = () => {
    switch (modalAction) {
      case 'confirmar':
        return '¿Confirmar esta cita?';
      case 'rechazar':
        return '¿Rechazar esta cita?';
      case 'completar':
        return 'Completar Cita';
      default:
        return '';
    }
  };

  // Obtener texto para el placeholder del modal la acción
  const getModalPlaceholder = () => {
    switch (modalAction) {
      case 'confirmar':
        return 'Notas o instrucciones para el paciente (opcional)';
      case 'rechazar':
        return 'Motivo del rechazo (requerido)';
      case 'completar':
        return 'Resultados del procedimiento, notas y recomendaciones (requerido)';
      default:
        return '';
    }
  };

  // Filtrar las citas para mostrar
  const filteredCitas = getFilteredCitas();

  return (
    <div className={`perfil-especialista-container ${fadeIn ? 'fade-in' : ''}`}>
      {/* Circulos decorativos */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      <div className="decorative-circle circle-4"></div>

      {/* Navbar */}
      <nav className={`navbar-especialista ${animateNavbar ? 'animate-in' : ''}`}>
        <div className="logo">
          <h1>ACADES</h1>
          <span className="especialista-tag">Panel de Especialista</span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-link ${activeTab === 'citasPendientes' ? 'active' : ''}`}
            onClick={() => handleTabChange('citasPendientes')}
          >
            Pendientes
            {citasPendientes.length > 0 && (
              <span className="badge">{citasPendientes.length}</span>
            )}
          </button>
          <button
            className={`nav-link ${activeTab === 'citasConfirmadas' ? 'active' : ''}`}
            onClick={() => handleTabChange('citasConfirmadas')}
          >
            Confirmadas
            {citasConfirmadas.length > 0 && (
              <span className="badge">{citasConfirmadas.length}</span>
            )}
          </button>
          <button
            className={`nav-link ${activeTab === 'historialCitas' ? 'active' : ''}`}
            onClick={() => handleTabChange('historialCitas')}
          >
            Historial
          </button>
          {}
          <button
            className={`nav-link ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => handleTabChange('perfil')}
          >
            Mi Perfil
          </button>
        </div>
        <div className="user-menu">
          <div className="especialista-mini-avatar">
            {especialistaData?.imagen ? (
              <img src={especialistaData.imagen} alt={especialistaData.nombre} />
            ) : (
              getInitials(especialistaData?.nombre)
            )}
          </div>
          <span className="especialista-name">{especialistaData.nombre}</span>
          <button className="btn-logout" onClick={() => setShowLogoutModal(true)}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="main-content">
        <h2 className="section-title">{getActiveTabTitle()}</h2>

        {/* Filtros y busqueda - visible solo en tabs de citas */}
        {(activeTab === 'citasPendientes' || activeTab === 'citasConfirmadas' || activeTab === 'historialCitas') && (
          <div className="filters-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar por nombre o procedimiento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="search-icon">🔍</i>
            </div>
            <div className="date-filter">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              {dateFilter && (
                <button
                  className="clear-filter"
                  onClick={() => setDateFilter('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filtro de estado - solo visible en historial */}
            {activeTab === 'historialCitas' && (
              <div className="status-filter">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todas">Todos los estados</option>
                  <option value="realizada">Realizadas</option>
                  <option value="cancelada">Canceladas</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Nueva sección: Gestionar Disponibilidad */}
        {activeTab === 'disponibilidad' && (
          <div className={`animate-on-scroll ${animateSections.disponibilidad ? 'animate-in' : ''}`}>
            <div className="disponibilidad-container">
              <div className="disponibilidad-card">
                <h3>Calendario de Disponibilidad</h3>
                <p className="disponibilidad-info">
                  Haga clic en las fechas para marcarlas como disponibles (azul) o no disponibles (gris).
                  Los usuarios solo podrán agendar citas en días marcados como disponibles en el calendario.
                </p>

                <div className="calendar-container">
                  {renderCalendarHeader()}
                  {renderCalendarDays()}
                </div>

                <div className="calendar-legend">
                  <div className="legend-item">
                    <div className="legend-color available"></div>
                    <span>Disponible</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color unavailable"></div>
                    <span>No Disponible</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color today"></div>
                    <span>Hoy</span>
                  </div>
                </div>
              </div>

              <div className="disponibilidad-settings">
                <div className="horario-laboral">
                  <h3>Horario de Atención</h3>
                  <div className="horario-container">
                    <div className="horario-input">
                      <label htmlFor="inicio">Hora de inicio:</label>
                      <input
                        type="time"
                        id="inicio"
                        name="inicio"
                        value={disponibilidad.horarioLaboral.inicio}
                        onChange={handleHorarioChange}
                      />
                    </div>
                    <div className="horario-input">
                      <label htmlFor="fin">Hora de finalización:</label>
                      <input
                        type="time"
                        id="fin"
                        name="fin"
                        value={disponibilidad.horarioLaboral.fin}
                        onChange={handleHorarioChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="dias-semana">
                  <h3>Días laborables</h3>
                  <p className="disponibilidad-info">
                    Seleccione los días de la semana en que suele atender.
                  </p>
                  <div className="dias-container">
                    {Object.entries(disponibilidad.diasSemana).map(([dia, disponible]) => (
                      <div
                        key={dia}
                        className={`dia-semana ${disponible ? 'activo' : ''}`}
                        onClick={() => handleDiaSemanaChange(dia)}
                      >
                        {dia.charAt(0).toUpperCase() + dia.slice(1, 3)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="configuracion-info">
                  <h3>Información para pacientes</h3>
                  <p>
                    Su horario de atención se muestra como: <strong>{especialistaData.diasAtencion}, {especialistaData.horasAtencion}</strong>
                  </p>
                  <p>
                    Para actualizar esta información, vaya a la pestaña "Mi Perfil" y edite los campos correspondientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sección Citas Pendientes */}
        {activeTab === 'citasPendientes' && (
          <div className={`animate-on-scroll ${animateSections.citasPendientes ? 'animate-in' : ''}`}>
            {(() => {
              // Depuración: muestra en consola el array de citas pendientes
              console.log('citasPendientes:', citasPendientes);
              return null;
            })()}

            {filteredCitas.length > 0 ? (
              <div className="citas-grid">
                {citasPendientes.map(cita => (
                  <div className="cita-card" key={cita.id}>
                    <div className="cita-header">
                      <div className="cita-fecha">
                        <span className="fecha">{formatDate(cita.fecha)}</span>
                        <span className="hora">{cita.hora}</span>
                      </div>
                      <span className="badge pendiente">Pendiente</span>
                    </div>
                    <div className="cita-body">
                      <div className="cita-paciente">
                        <span className="paciente-nombre">
                          <i className="icon-user">👤</i> {cita.paciente}
                        </span>
                        <div className="paciente-contacto">
                          <small><i className="icon-mail">✉️</i> {cita.contacto}</small>
                          <small><i className="icon-phone">📱</i> {cita.celular}</small>
                        </div>
                      </div>
                      <p className="cita-procedimiento">
                        <span className="procedimiento-icon">💜</span>
                        {cita.procedimiento}
                      </p>
                      {cita.motivo && (
                        <p className="cita-motivo">{cita.motivo}</p>
                      )}
                    </div>
                    <div className="cita-actions">
                      <button
                        className="btn-reject"
                        onClick={() => handleRejectCita(cita)}
                      >
                        Rechazar
                      </button>
                      <button
                        className="btn-confirm"
                        onClick={() => handleConfirmCita(cita)}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-citas">
                <div className="no-citas-icon">📅</div>
                <p>No hay citas pendientes</p>
              </div>
            )}
          </div>
        )}

        {/* Sección Citas Confirmadas */}
        {activeTab === 'citasConfirmadas' && (
          <div className={`animate-on-scroll ${animateSections.citasConfirmadas ? 'animate-in' : ''}`}>
            {filteredCitas.length > 0 ? (
              <div className="citas-grid">
                {filteredCitas.map(cita => (
                  <div className="cita-card" key={cita.id}>
                    <div className="cita-header">
                      <div className="cita-fecha">
                        <span className="fecha">{formatDate(cita.fecha)}</span>
                        <span className="hora">{cita.hora}</span>
                      </div>
                      <span className="badge confirmada">Confirmada</span>
                    </div>
                    <div className="cita-body">
                      <div className="cita-paciente">
                        <span className="paciente-nombre">
                          <i className="icon-user">👤</i> {cita.paciente}
                        </span>
                        <div className="paciente-contacto">
                          <small><i className="icon-mail">✉️</i> {cita.contacto}</small>
                          <small><i className="icon-phone">📱</i> {cita.celular}</small>
                        </div>
                      </div>
                      <p className="cita-procedimiento">
                        <span className="procedimiento-icon">💜</span>
                        {cita.procedimiento}
                      </p>
                      {cita.motivo && (
                        <p className="cita-motivo">{cita.motivo}</p>
                      )}
                      {cita.notas && (
                        <div className="cita-notas">
                          <h4>Notas:</h4>
                          <p>{cita.notas}</p>
                        </div>
                      )}
                    </div>
                    <div className="cita-actions">
                      <button
                        className="btn-complete"
                        onClick={() => handleCompleteCita(cita)}
                      >
                        Marcar como Realizada
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-citas">
                <div className="no-citas-icon">📅</div>
                <p>No hay citas confirmadas</p>
              </div>
            )}
          </div>
        )}

        {/* Sección Historial de Citas */}
        {activeTab === 'historialCitas' && (
          <div className={`animate-on-scroll ${animateSections.historialCitas ? 'animate-in' : ''}`}>
            {filteredCitas.length > 0 ? (
              <div className="citas-grid">
                {filteredCitas.map(cita => (
                  <div className="cita-card" key={cita.id}>
                    <div className="cita-header">
                      <div className="cita-fecha">
                        <span className="fecha">{formatDate(cita.fecha)}</span>
                        <span className="hora">{cita.hora}</span>
                      </div>
                      <span className={`badge ${cita.estado === 'realizada' ? 'realizada' : 'cancelada'}`}>
                        {cita.estado === 'realizada' ? 'Realizada' : 'Cancelada'}
                      </span>
                    </div>
                    <div className="cita-body">
                      <div className="cita-paciente">
                        <span className="paciente-nombre">
                          <i className="icon-user">👤</i> {cita.paciente}
                        </span>
                      </div>
                      <p className="cita-procedimiento">
                        <span className="procedimiento-icon">💜</span>
                        {cita.procedimiento}
                      </p>
                      {cita.motivo && (
                        <p className="cita-motivo">{cita.motivo}</p>
                      )}

                      {cita.estado === 'realizada' && cita.resultado && (
                        <div className="cita-resultado">
                          <h4>Resultado:</h4>
                          <p>{cita.resultado}</p>
                        </div>
                      )}

                      {cita.estado === 'cancelada' && cita.razonCancelacion && (
                        <div className="cita-cancelacion">
                          <h4>Razón de cancelación:</h4>
                          <p>{cita.razonCancelacion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-citas">
                <div className="no-citas-icon">📋</div>
                <p>No hay citas en el historial</p>
              </div>
            )}
          </div>
        )}

        {/* Sección Perfil */}
        {activeTab === 'perfil' && (
          <div className={`animate-on-scroll ${animateSections.perfil ? 'animate-in' : ''}`}>
            <div className="perfil-especialista-card">
              {!isEditing ? (
                /* Modo visualización */
                <>
                  <div className="perfil-header">
                    <div className="perfil-avatar">
                      {especialistaData?.imagen ? (
                        <img src={especialistaData.imagen} alt={especialistaData.nombre} />
                      ) : (
                        getInitials(especialistaData?.nombre)
                      )}
                    </div>
                    <h3 className="perfil-name">{especialistaData?.nombre}</h3>
                    <span className="perfil-especialidad">{especialistaData?.especialidad}</span>
                  </div>
                  <div className="perfil-info">
                    <div className="info-section">
                      <h4>Información de Contacto</h4>
                      <div className="info-item">
                        <div className="info-label">
                          <i className="icon-mail">✉️</i> Email:
                        </div>
                        <div className="info-value">{especialistaData.correo}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">
                          <i className="icon-phone">📱</i> Teléfono:
                        </div>
                        <div className="info-value">{especialistaData.telefono}</div>
                      </div>
                    </div>
                    {/* Eliminado: días, horas y acerca de mí */}
                  </div>
                  <div className="perfil-actions">
                    <button
                      className="btn-edit"
                      onClick={handleEditProfile}
                    >
                      Editar Perfil
                    </button>
                  </div>
                </>
              ) : (
                /* Modo edición */
                <>
                  <div className="perfil-header">
                    <div className="perfil-avatar">
                      {getInitials(editData.nombre)}
                    </div>
                    <h3 className="perfil-title">Editar Perfil</h3>
                  </div>
                  <div className="perfil-form">
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={editData.nombre}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="especialidad">Especialidad</label>
                      <input
                        type="text"
                        id="especialidad"
                        name="especialidad"
                        value={editData.especialidad}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="correo">Email</label>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={editData.correo}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefono">Teléfono</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={editData.telefono}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    {}
                  </div>
                  <div className="perfil-actions edit-actions">
                    <button
                      className="btn-cancel"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn-save"
                      onClick={handleSaveProfile}
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Resumen de citas */}
            <div className="perfil-stats">
              <div className="stat-card">
                <div className="stat-icon pendientes-icon">📋</div>
                <div className="stat-value">{citasPendientes.length}</div>
                <div className="stat-label">Citas Pendientes</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon confirmadas-icon">✅</div>
                <div className="stat-value">{citasConfirmadas.length}</div>
                <div className="stat-label">Citas Confirmadas</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon realizadas-icon">🎯</div>
                <div className="stat-value">
                  {historialCitas.length-citasPendientes.length-citasConfirmadas.length}
                </div>
                <div className="stat-label">Citas Realizadas</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon total-icon">📊</div>
                <div className="stat-value">
                  {historialCitas.length}
                </div>
                <div className="stat-label">Total de Citas</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para confirmar/rechazar/completar citas */}
      {showActionModal && selectedCita && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{getModalTitle()}</h3>
              <button
                className="modal-close"
                onClick={handleCloseModal}
              >
                
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-cita-info">
                <p><strong>Paciente:</strong> {selectedCita.paciente}</p>
                <p><strong>Procedimiento:</strong> {selectedCita.procedimiento}</p>
                <p><strong>Fecha:</strong> {formatDate(selectedCita.fecha)} - {selectedCita.hora}</p>
              </div>

              <form onSubmit={handleModalSubmit}>
                <div className="form-group">
                  <label>
                    {modalAction === 'confirmar' ? 'Notas para el paciente' :
                      modalAction === 'rechazar' ? 'Motivo del rechazo' :
                        'Resultados y recomendaciones'}
                  </label>
                  <textarea
                    value={modalNote}
                    onChange={(e) => setModalNote(e.target.value)}
                    placeholder={getModalPlaceholder()}
                    required={modalAction !== 'confirmar'} // Solo opcional para confirmar
                  ></textarea>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`btn-modal-confirm ${modalAction}`}
                  >
                    {modalAction === 'confirmar' ? 'Confirmar' :
                      modalAction === 'rechazar' ? 'Rechazar' :
                        'Completar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de csecionn */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-container logout-modal">
            <div className="modal-header">
              <h3>¿Cerrar sesión?</h3>
              <button className="modal-close" onClick={() => setShowLogoutModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro que deseas cerrar sesión?</p>
              <div className="modal-actions">
                <button className="btn-modal-cancel" onClick={() => setShowLogoutModal(false)}>
                  Cancelar
                </button>
                <button className="btn-modal-confirm" style={{ background: "#f472b6", color: "#fff" }} onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Especialista;