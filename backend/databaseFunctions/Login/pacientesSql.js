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

async function crearPaciente(nombre, correo, cedula, telefono, contrasena) {
    const query = "INSERT INTO cliente (nombre, correo, cedula, telefono, contrasena) VALUES (?, ?, ?, ?, ?)";
    const [result] = await connection.query(query, [nombre, correo, cedula, telefono, contrasena]);
    return result;
}

async function atualizarPaciente(id_cliente, nombre, correo, cedula, telefono) {
    const query = "UPDATE cliente SET nombre = ?, correo = ?, cedula = ?, telefono = ? WHERE id_cliente = ?";
    const [result] = await connection.query(query, [nombre, correo, cedula, telefono, id_cliente]);
    return result;
}

async function eliminarPaciente(id_cliente) {
    const query = "DELETE FROM cliente WHERE id_cliente = ?";
    const [result] = await connection.query(query, [id_cliente]);
    return result;
}

//para el login 
async function autenticarUsuario(correo, contrasena) {
    const query = "SELECT * FROM cliente WHERE correo = ? AND contrasena = ?";
    const [rows] = await connection.query(query, [correo, contrasena]);
    return rows[0]; 
}
async function autenticarEspecialista(correo, contrasena) {
    const query = "SELECT * FROM especialista WHERE correo = ? AND contrasena = ?";
    const [rows] = await connection.query(query, [correo, contrasena]);
    return rows[0];
}

async function autenticarAdmin(correo, contrasena) {
    const query = "SELECT * FROM administrador WHERE correo = ? AND contrasena = ?";
    const [rows] = await connection.query(query, [correo, contrasena]);
    return rows[0];
}

module.exports = {
    listarPacientes,
    verPaciente,
    crearPaciente,
    atualizarPaciente,
    eliminarPaciente,
    autenticarUsuario,
    autenticarEspecialista,
    autenticarAdmin
};
