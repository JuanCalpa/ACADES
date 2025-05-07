const citasSql = require('./citasSql');

// Controlador para listar todas las citas
async function listarCitas(req, res) {
    try {
        const citas = await citasSql.listarCitas();
        res.status(200).json(citas);
    } catch (error) {
        console.error("Error al listar citas:", error);
        res.status(500).json({ mensaje: "Error al obtener las citas" });
    }
}

// Controlador para obtener una cita por ID
async function obtenerCita(req, res) {
    const { id } = req.params;
    try {
        const cita = await citasSql.obtenerCitaPorId(id);
        if (cita) {
            res.status(200).json(cita);
        } else {
            res.status(404).json({ mensaje: "Cita no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener la cita:", error);
        res.status(500).json({ mensaje: "Error al obtener la cita" });
    }
}

// Controlador para crear una nueva cita
async function crearCita(req, res) {
    const { descripcion, fecha, estado } = req.body;
    try {
        const resultado = await citasSql.crearCita(descripcion, fecha, estado);
        res.status(201).json({ mensaje: "Cita creada exitosamente", id: resultado.insertId });
    } catch (error) {
        console.error("Error al crear la cita:", error);
        res.status(500).json({ mensaje: "Error al crear la cita" });
    }
}

// Controlador para actualizar una cita
async function actualizarCita(req, res) {
    const { id } = req.params;
    const { descripcion, fecha, estado } = req.body;
    try {
        const resultado = await citasSql.actualizarCita(id, descripcion, fecha, estado);
        if (resultado.affectedRows > 0) {
            res.status(200).json({ mensaje: "Cita actualizada exitosamente" });
        } else {
            res.status(404).json({ mensaje: "Cita no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar la cita:", error);
        res.status(500).json({ mensaje: "Error al actualizar la cita" });
    }
}

// Controlador para eliminar una cita
async function eliminarCita(req, res) {
    const { id } = req.params;
    try {
        const resultado = await citasSql.eliminarCita(id);
        if (resultado.affectedRows > 0) {
            res.status(200).json({ mensaje: "Cita eliminada exitosamente" });
        } else {
            res.status(404).json({ mensaje: "Cita no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la cita:", error);
        res.status(500).json({ mensaje: "Error al eliminar la cita" });
    }
}

module.exports = {
    listarCitas,
    obtenerCita,
    crearCita,
    actualizarCita,
    eliminarCita
};