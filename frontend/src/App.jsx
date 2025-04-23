import React, { useEffect, useState } from 'react';
import PacienteFormulario from './components/PacienteFormulario';
import PacienteTabla from './components/PacienteTabla';

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
        <div className="container py-4">
            <h2 className="mb-4 text-center">🩺 Gestión de Pacientes</h2>
            <PacienteFormulario
                form={form}
                manejarCambio={manejarCambio}
                manejarSubmit={manejarSubmit}
                editando={!!editId}
            />
            <PacienteTabla
                pacientes={pacientes}
                onEditar={manejarEditar}
                onEliminar={manejarEliminar}
            />
        </div>

    );
}

export default App;
