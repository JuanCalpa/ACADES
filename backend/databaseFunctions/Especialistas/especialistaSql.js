const mysql = require("mysql2/promise");
const nodemailer = require('nodemailer');

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "acades"
});

async function especialistasPorProcedimiento(id_procedimiento) {
    const query = `
        SELECT e.id_especialista, e.nombre, e.especialidad, e.telefono
        FROM procedimientos p
        JOIN especialista_procedimiento ep ON p.id_procedimiento = ep.id_procedimiento
        JOIN especialista e ON ep.id_especialista = e.id_especialista
        WHERE p.id_procedimiento = ?
        ORDER BY e.nombre
    `;
    const [rows] = await connection.query(query, [id_procedimiento]);
    return rows;
}

async function sendConfirmationEmail(to, subject, text) {
    // Configura el transporte con tus credenciales
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'acadesrespuestas@gmail.com',
            pass: 'drlb odmn gcrf ennk'
        }
    });

    // Configura el mensaje
    let mailOptions = {
        from: '"ACADES" <acadesrespuestas@gmail.com>',
        to,
        subject,
        text
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);
}


async function listarCitasPorEspecialista(especialistaId) {
    const query = 'SELECT * FROM citas WHERE id_especialista = ?';
    const [rows] = await connection.execute(query, [especialistaId]);
    return rows;
}

async function listarCitasPendientesPorEspecialista(especialistaId) {
    const query = 'SELECT * FROM citas WHERE id_especialista = ? AND estado = "Pendiente"';
    const [rows] = await connection.execute(query, [especialistaId]);
    return rows;
}

async function listarCitasConfirmadaPorEspecialista(especialistaId) {
    const query = 'SELECT * FROM citas WHERE id_especialista = ? AND estado = "Confirmada"';
    const [rows] = await connection.execute(query, [especialistaId]);
    return rows;
}


module.exports = { 
    especialistasPorProcedimiento,
    sendConfirmationEmail,
    listarCitasPorEspecialista, 
    listarCitasPendientesPorEspecialista,
    listarCitasConfirmadaPorEspecialista
 };