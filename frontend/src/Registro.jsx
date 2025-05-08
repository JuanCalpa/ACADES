import React, { useState, useEffect } from 'react';
import './Registro.css';

function Login() {
  // Estados para el formulario de login
  const [loginData, setLoginData] = useState({
    correo: '', // Cambiado de email a correo
    contrasena: '', // Cambiado de password a contrasena
  });

  // Estado para controlar errores
  const [errors, setErrors] = useState({});

  // Estado para efecto de aparecer gradualmente
  const [isVisible, setIsVisible] = useState(false);

  // Estado para controlar el campo activo
  const [activeFieldIndex, setActiveFieldIndex] = useState(null);

  // Estado para mostrar/ocultar el modal de registro
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Estado para datos del formulario de registro
  const [registerData, setRegisterData] = useState({
    nombre: '',
    contrasena: '',
    cedula: '',
    correo: '',
    celular: '',
  });

  // Efecto para iniciar animaciones al cargar
  useEffect(() => {
    setIsVisible(true);

    // Observer para animaciones al hacer scroll
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

    // Cerrar modal con Escape
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
    if (name === 'email') {
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

    if (name === 'password') {
      if (!value) {
        setErrors(prev => ({ ...prev, password: 'La contraseña es obligatoria' }));
      } else if (value.length < 6) {
        setErrors(prev => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.password;
          return newErrors;
        });
      }
    }
  };

  // Manejar cambios en el formulario de registro
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario de login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados al backend para login:', loginData);

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        alert('Inicio de sesión exitoso');
      } else {
        console.error('Error al iniciar sesión:', data);
        alert(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al intentar iniciar sesión');
    }
  };

  // Manejar envío del formulario de registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados al backend:', registerData); // Verifica los datos aquí

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro exitoso:', data);
        setShowRegisterModal(false);
        setLoginData({
          email: registerData.correo,
          password: registerData.contrasena,
        });
      } else {
        console.error('Error al registrar usuario:', data);
        alert(data.mensaje || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al intentar registrar el usuario');
    }
  };

  return (
    <section className={`login-section ${isVisible ? 'fade-in' : ''}`}>
      {/* Círculos decorativos de fondo */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      <div className="decorative-circle circle-4"></div>
      <div className="decorative-circle circle-5"></div>
      <div className="decorative-circle circle-6"></div>


      <div className="login-container animate-on-scroll">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className={`form-group ${activeFieldIndex === 0 ? 'input-active' : ''} ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="correo"
              value={loginData.email}
              onChange={handleLoginChange}
              onFocus={() => setActiveFieldIndex(0)}
              onBlur={() => setActiveFieldIndex(null)}
              placeholder="tu@email.com"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`form-group ${activeFieldIndex === 1 ? 'input-active' : ''} ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="contrasena"
              value={loginData.password}
              onChange={handleLoginChange}
              onFocus={() => setActiveFieldIndex(1)}
              onBlur={() => setActiveFieldIndex(null)}
              placeholder="Ingresa tu contraseña"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-login">
            Ingresar
          </button>

          <div className="register-prompt">
            <p>¿No tienes cuenta? <button
              type="button"
              className="btn-show-register"
              onClick={() => setShowRegisterModal(true)}
            >
              Crea la tuya
            </button></p>
          </div>
        </form>
      </div>

      {/* Modal de Registro */}
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
                <label htmlFor="reg-email">Correo electrónico</label>
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
                  name="celular"
                  value={registerData.celular}
                  onChange={handleRegisterChange}
                  placeholder="Número de celular"
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