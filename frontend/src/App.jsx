import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api/usuarios';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' });
  const [editId, setEditId] = useState(null);

  const obtenerPacientes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPacientes(data);
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ nombre: '', correo: '', telefono: '' });
    setEditId(null);
    obtenerPacientes();
  };

  const manejarEditar = (paciente) => {
    setForm({ nombre: paciente.nombre, correo: paciente.correo, telefono: paciente.telefono });
    setEditId(paciente.id_cliente);
  };

  const manejarEliminar = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    obtenerPacientes();
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Pacientes</h1>
      <form onSubmit={manejarSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={manejarCambio} required />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={manejarCambio} required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={manejarCambio} required />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id_cliente}>
              <td>{p.id_cliente}</td>
              <td>{p.nombre}</td>
              <td>{p.correo}</td>
              <td>{p.telefono}</td>
              <td>
                <button onClick={() => manejarEditar(p)}>Editar</button>
                <button onClick={() => manejarEliminar(p.id_cliente)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
