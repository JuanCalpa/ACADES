const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "acades"
});

async function especialistasPorProcedimiento(procedimiento) {
    const query = `
        SELECT e.id_especialista, e.nombre, e.especialidad, e.telefono
        FROM procedimientos p
        JOIN especialista_procedimiento ep ON p.id_procedimiento = ep.id_procedimiento
        JOIN especialista e ON ep.id_especialista = e.id_especialista
        WHERE p.nombre = ?
        ORDER BY e.nombre
    `;
    const [rows] = await connection.query(query, [procedimiento]);
    return rows;
}

module.exports = { especialistasPorProcedimiento };