import React from 'react';

function PacienteTabla({ pacientes, onEditar, onEliminar }) {
  return (
    <table className="table table-hover table-bordered shadow-sm">
  <thead className="table-dark">
    <tr>
      <th scope="col">ID</th>
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
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-warning" onClick={() => onEditar(p)}>
              <i className="bi bi-pencil-square"></i>
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(p.id_cliente)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  );
}

export default PacienteTabla;
