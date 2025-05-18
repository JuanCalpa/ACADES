import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // redireccionar
import './Registro.css';

function Login() {

  const navigate = useNavigate();


  const [loginData, setLoginData] = useState({
    correo: '',
    contrasena: ''
  });

  // Estado para controlar errores
  const [errors, setErrors] = useState({});

  // Estado para efecto de aparecer gradualmente
  const [isVisible, setIsVisible] = useState(false);

  // Estado para controlar el campo activo
  const [activeFieldIndex, setActiveFieldIndex] = useState(null);

  // Estado para mostrar/ocultar el modal de registro
  const [showRegisterModal, setShowRegisterModal] = useState(false);


  const [registerData, setRegisterData] = useState({
    nombre: '',
    correo: '',
    contrasena: '', // <-- CAMBIA AQUÍ
    cedula: '',
    telefono: '',
    fechaNacimiento: ''
  });


  useEffect(() => {
    setIsVisible(true);


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

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Cerrar modal 
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowRegisterModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Manejar cambios en el formulario de login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación
    if (name === 'correo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, email: 'El correo es obligatorio' }));
      } else if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Ingrese un correo válido' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    }

    if (name === 'contrasena') {
      if (!value) {
        setErrors(prev => ({ ...prev, contrasena: 'La contraseña es obligatoria' }));
      } else if (value.length < 6) {
        setErrors(prev => ({ ...prev, contrasena: 'La contraseña debe tener al menos 6 caracteres' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.contrasena;
          return newErrors;
        });
      }
    }
  };


  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envio del formulario de login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!loginData.correo || !loginData.contrasena) {
      setErrors({ correo: !loginData.correo ? 'El correo es obligatorio' : '', contrasena: !loginData.contrasena ? 'La contraseña es obligatoria' : '' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data.usuario));
        navigate('/perfil');
      } else {
        alert(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (error) {
      alert('Error de red al intentar iniciar sesión');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cuenta creada exitosamente');
        // Opcional: redirige al login o limpia el formulario
      } else {
        alert(data.mensaje || 'Error al crear la cuenta');
      }
    } catch (error) {
      alert('Error de red al crear la cuenta');
    }
  };

  return (
    <section className={`login-section ${isVisible ? 'fade-in' : ''}`}>
      {/* animacion */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      <div className="decorative-circle circle-4"></div>
      <div className="decorative-circle circle-5"></div>
      <div className="decorative-circle circle-6"></div>

      <div className="login-container animate-on-scroll">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className={`form-group ${activeFieldIndex === 0 ? 'input-active' : ''} ${errors.correo ? 'has-error' : ''}`}>
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={loginData.correo}
              onChange={handleLoginChange}
              onFocus={() => setActiveFieldIndex(0)}
              onBlur={() => setActiveFieldIndex(null)}
              placeholder="tu@email.com"
            />
            {errors.correo && <span className="error-message">{errors.correo}</span>}
          </div>
          <div className={`form-group ${activeFieldIndex === 1 ? 'input-active' : ''} ${errors.contrasena ? 'has-error' : ''}`}>
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={loginData.contrasena}
              onChange={handleLoginChange}
              placeholder="Contraseña"
              required
            />
            {errors.contrasena && <span className="error-message">{errors.contrasena}</span>}
          </div>
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>

          <div className="register-prompt">
            <p>¿No tienes cuenta? <button
              type="button"
              className="btn-show-register"
              onClick={() => setShowRegisterModal(true)}
            >
              Crea la tuya!
            </button></p>
          </div>
        </form>
      </div>

      {/* Modal para reistrar */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="register-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowRegisterModal(false)}>×</button>

            <h2 className="modal-title">Crear Cuenta</h2>

            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={registerData.nombre}
                  onChange={handleRegisterChange}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Correo</label>
                <input
                  type="email"
                  id="reg-email"
                  name="correo"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Contraseña</label>
                <input
                  type="password"
                  id="reg-password"
                  name="contrasena"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Crea una contraseña segura"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cedula">Cédula</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  value={registerData.cedula}
                  onChange={handleRegisterChange}
                  placeholder="Número de cédula"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="celular">Celular</label>
                <input
                  type="tel"
                  id="celular"
                  name="telefono"
                  value={registerData.celular}
                  onChange={handleRegisterChange}
                  placeholder="Número de celular"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={registerData.fechaNacimiento}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <button type="submit" className="btn-register">
                Crear cuenta
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;