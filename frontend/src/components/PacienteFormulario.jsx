import React from 'react';

function PacienteFormulario({ form, manejarCambio, manejarSubmit, editando }) {
  return (
    <form onSubmit={manejarSubmit} className="card card-body shadow-sm mb-4 bg-light">
  <div className="row g-2 mb-2">
    <div className="col-md-4">
      <input type="text" name="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={manejarCambio} required />
    </div>
    <div className="col-md-4">
      <input type="email" name="correo" className="form-control" placeholder="Correo" value={form.correo} onChange={manejarCambio} required />
    </div>
    <div className="col-md-4">
      <input type="text" name="telefono" className="form-control" placeholder="Teléfono" value={form.telefono} onChange={manejarCambio} required />
    </div>
  </div>
  <div className="d-flex justify-content-end">
    <button type="submit" className={`btn ${editando ? 'btn-warning' : 'btn-success'}`}>
      <i className={`bi ${editando ? 'bi-pencil-square' : 'bi-plus-lg'} me-1`}></i>
      {editando ? 'Actualizar' : 'Agregar'}
    </button>
  </div>
</form>

  );
}

export default PacienteFormulario;
