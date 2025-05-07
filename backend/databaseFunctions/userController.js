const funcionesSql = require('./sqlFunctions');

async function listarPacientes(req, res) {
    try {
        const pacientes = await funcionesSql.listarPacientes();
        res.status(200).json(pacientes);
    } catch (error) {
        console.error("Error al listar pacientes:", error);
        res.status(500).json({ mensaje: "Error al obtener los pacientes" });
    }
}

async function verPaciente(req, res) {
    try {
        const { id_cliente } = req.query;
        if (!id_cliente) {
            return res.status(400).json({ mensaje: "Falta el parámetro id_cliente" });
        }
        const paciente = await funcionesSql.verPaciente(id_cliente);
        res.status(200).json(paciente);
    } catch (error) {
        console.error("Error al ver paciente:", error);
        res.status(500).json({ mensaje: "Error al obtener el paciente" });
    }
}

async function crearPaciente(req, res) {
    try {
        const { nombre, correo, telefono } = req.body;
        if (!nombre || !correo || !telefono) {
            return res.status(400).json({ mensaje: "Faltan datos requeridos" });
        }
        const resultado = await funcionesSql.crearPaciente(nombre, correo, telefono);
        res.status(201).json({ mensaje: "Paciente creado correctamente", id: resultado.insertId });
    } catch (error) {
        console.error("Error al crear paciente:", error);
        res.status(500).json({ mensaje: "Error al crear paciente" });
    }
}

async function atualizarPaciente(req, res) {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono } = req.body;
        const resultado = await funcionesSql.atualizarPaciente(id, nombre, correo, telefono);
        res.status(200).json({ mensaje: "Paciente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar paciente:", error);
        res.status(500).json({ mensaje: "Error al actualizar paciente" });
    }
}

async function eliminarPaciente(req, res) {
    try {
        const { id } = req.params;
        const resultado = await funcionesSql.eliminarPaciente(id);
        res.status(200).json({ mensaje: "Paciente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar paciente:", error);
        res.status(500).json({ mensaje: "Error al eliminar paciente" });
    }
}

module.exports = {
    listarPacientes,
    verPaciente,
    crearPaciente,
    atualizarPaciente,
    eliminarPaciente
};
