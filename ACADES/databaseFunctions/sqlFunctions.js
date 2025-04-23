const mysql = require("mysql2/promise");
const connection = mysql.createPool({
    host: "localhost",
    user: "",
    password: "",
    database: ""
});

async function listarPacientes() {
    const [rows] = await connection.query("SELECT * FROM pacientes");
    return result [0];
}

async function verPaciente() {

}

async function adicionarPaciente() {

}

async function atualizarPaciente(id) {

}

async function eliminarPaciente(){

}

module.exports = {
    listarPacientes,
    verPaciente,
    adicionarPaciente,
    atualizarPaciente,
    eliminarPaciente
}