const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "acades"
});

// Función para listar todas las citas
async function listarCitas() {
    const query = "SELECT * FROM citas";
    const [rows] = await connection.query(query);
    return rows;
}

// Función para obtener una cita por ID
async function obtenerCitaPorId(id) {
    const query = "SELECT * FROM citas WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    return rows[0];
}

// Función para crear una nueva cita
async function crearCita(descripcion, fecha, estado) {
    const query = "INSERT INTO citas (descripcion, fecha, estado) VALUES (?, ?, ?)";
    const [result] = await connection.query(query, [descripcion, fecha, estado]);
    return result;
}

// Función para actualizar una cita
async function actualizarCita(id, descripcion, fecha, estado) {
    const query = "UPDATE citas SET descripcion = ?, fecha = ?, estado = ? WHERE id = ?";
    const [result] = await connection.query(query, [descripcion, fecha, estado, id]);
    return result;
}

// Función para eliminar una cita
async function eliminarCita(id) {
    const query = "DELETE FROM citas WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    return result;
}

module.exports = {
    listarCitas,
    obtenerCitaPorId,
    crearCita,
    actualizarCita,
    eliminarCita
};