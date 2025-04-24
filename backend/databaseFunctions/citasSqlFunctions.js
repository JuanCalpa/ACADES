const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "acades"
});

async function listarCitas() {

}

async function verCita() {

}

async function crearCita() {

}

async function actualizarCita() {

}

async function eliminarCita() {

}

module.exports = {
    listarCitas,
    verCita,
    crearCita,
    actualizarCita,
    eliminarCita
};