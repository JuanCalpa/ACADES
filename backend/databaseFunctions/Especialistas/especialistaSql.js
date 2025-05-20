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

async function cambiarEstadoCita(id_cita, id_especialista, nuevoEstado) {
    const query = 'UPDATE citas SET estado = ? WHERE id_cita = ? AND id_especialista = ?';
    const [result] = await connection.execute(query, [nuevoEstado, id_cita, id_especialista]);
    if (result.affectedRows > 0) {
        const queryCita = 'SELECT * FROM citas WHERE id_cita = ?';
        const [cita] = await connection.execute(queryCita, [id_cita]);
        return cita[0];
    } else {
        throw new Error('No se pudo cambiar el estado de la cita');
    }
}

async function listarCitasPorEspecialista(especialistaId) {
    const query = `
      SELECT
            c.id_cita,
            cl.nombre AS nombre_cliente,
            e.nombre AS nombre_especialista,
            p.nombre AS nombre_procedimiento,
            c.notas,
            c.fecha,
            c.hora,
            c.estado,
            c.estado_hora
        FROM citas c
        JOIN cliente cl ON c.id_cliente = cl.id_cliente
        JOIN especialista e ON c.id_especialista = e.id_especialista
        LEFT JOIN procedimientos p ON c.id_procedimiento = p.id_procedimiento
        WHERE c.id_especialista = ?
    `;
    const [rows] = await connection.execute(query, [especialistaId]);
    return rows;
}

async function listarCitasPendientesPorEspecialista(especialistaId) {
    const query = `
SELECT
    c.id_cita,
    c.hora,
    c.fecha,
    cl.nombre AS nombre_cliente,
    cl.telefono,
    cl.correo,
    p.nombre AS nombre_procedimiento
FROM
    citas c
JOIN cliente cl ON c.id_cliente = cl.id_cliente
LEFT JOIN procedimientos p ON c.id_procedimiento = p.id_procedimiento
WHERE
    c.id_especialista = ? AND c.estado = 'Pendiente';
    `;
    const [rows] = await connection.execute(query, [especialistaId]);
    return rows;
}


async function listarCitasConfirmadaPorEspecialista(especialistaId) {
    const query = `
   SELECT
    c.id_cita,
    c.hora,
    c.fecha,
    cl.nombre AS nombre_cliente,
    cl.telefono,
    cl.correo,
    p.nombre AS nombre_procedimiento,
    c.notas
FROM
    citas c
JOIN cliente cl ON c.id_cliente = cl.id_cliente
LEFT JOIN procedimientos p ON c.id_procedimiento = p.id_procedimiento
        WHERE c.id_especialista = ? AND c.estado = "Confirmada";
    `;
    const [rows] = await connection.execute(query, [especialistaId]);
    return rows;
}
async function editarEspecialista(id,nombre,especialidad,telefono, correo) {
    const query = `
        UPDATE especialista
        SET nombre = ?, especialidad = ?, telefono = ?, correo = ?
        WHERE id_especialista = ?
    `;
    const [result] = await connection.execute(query, [nombre, especialidad, telefono, correo, id]);
    return result;
}
module.exports = { 
    especialistasPorProcedimiento,
    sendConfirmationEmail,
    listarCitasPorEspecialista, 
    listarCitasPendientesPorEspecialista,
    listarCitasConfirmadaPorEspecialista, 
    cambiarEstadoCita,
    editarEspecialista
 };