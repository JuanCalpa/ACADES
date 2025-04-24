const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "acades"
});

async function listarPacientes() {
    const [rows] = await connection.query("SELECT * FROM cliente");
    return rows;
}

async function verPaciente(id_cliente) {
    const query = "SELECT * FROM cliente WHERE id_cliente = ?";
    const [rows] = await connection.query(query, [id_cliente]);
    return rows;
}

async function crearPaciente(nombre, correo, telefono) {
    const query = "INSERT INTO cliente (nombre, correo, telefono) VALUES (?, ?, ?)";
    const [result] = await connection.query(query, [nombre, correo, telefono]);
    return result;
}

async function atualizarPaciente(id_cliente, nombre, correo, telefono) {
    const query = "UPDATE cliente SET nombre = ?, correo = ?, telefono = ? WHERE id_cliente = ?";
    const [result] = await connection.query(query, [nombre, correo, telefono, id_cliente]);
    return result;
}

async function eliminarPaciente(id_cliente) {
    const query = "DELETE FROM cliente WHERE id_cliente = ?";
    const [result] = await connection.query(query, [id_cliente]);
    return result;
}

module.exports = {
    listarPacientes,
    verPaciente,
    crearPaciente,
    atualizarPaciente,
    eliminarPaciente
};
