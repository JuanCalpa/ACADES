const mysql = require("mysql2/promise");
const nodemailer = require('nodemailer');

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "acades"
});

async function agregarEspecialista(nombre, especialidad, telefono, correo, contrasena) {
    const query = `
        INSERT INTO especialista (nombre, especialidad, telefono, correo, contrasena)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await connection.execute(query, [nombre, especialidad, telefono, correo, contrasena]);
    return result;
}

async function eliminarEspecialista(id_especialista) {
  try {

    await connection.execute(`ALTER TABLE citas DROP FOREIGN KEY citas_ibfk_3`);
    await connection.execute(`ALTER TABLE horarios_especialista DROP FOREIGN KEY horarios_especialista_ibfk_1`);
    await connection.execute(`ALTER TABLE especialista_procedimiento DROP FOREIGN KEY especialista_procedimiento_ibfk_1`);
    await connection.execute(`
      ALTER TABLE citas
      ADD CONSTRAINT fk_citas_especialista
      FOREIGN KEY (id_especialista)
      REFERENCES especialista(id_especialista)
      ON DELETE CASCADE
    `);
    await connection.execute(`
      ALTER TABLE horarios_especialista
      ADD CONSTRAINT fk_horario_especialista
      FOREIGN KEY (id_especialista)
      REFERENCES especialista(id_especialista)
      ON DELETE CASCADE
    `);
    await connection.execute(`
      ALTER TABLE especialista_procedimiento
      ADD CONSTRAINT fk_especialista_procedimiento
      FOREIGN KEY (id_especialista)
      REFERENCES especialista(id_especialista)
      ON DELETE CASCADE
    `);
    const [result] = await connection.execute(`DELETE FROM especialista WHERE id_especialista = ?`, [id_especialista]);
    return result;

  } catch (error) {
    console.error("Error al eliminar especialista:", error);
    throw error;
  }
}

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
async function listarEspecialistas() {
    const query = `
        SELECT id_especialista, nombre, especialidad, telefono, correo,contrasena
        FROM especialista
        ORDER BY nombre
    `;
    const [rows] = await connection.execute(query);
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
async function editarEspecialista(id, nombre, especialidad, telefono, correo, contrasena) {
    const query = `
        UPDATE especialista
        SET nombre = ?, especialidad = ?, telefono = ?, correo = ?, contrasena = ?
        WHERE id_especialista = ?
    `;
    const [result] = await connection.execute(query, [nombre, especialidad, telefono, correo, contrasena, id]);
    return result;
}
module.exports = { 
    agregarEspecialista,
    eliminarEspecialista,
    listarEspecialistas,
    especialistasPorProcedimiento,
    sendConfirmationEmail,
    listarCitasPorEspecialista, 
    listarCitasPendientesPorEspecialista,
    listarCitasConfirmadaPorEspecialista, 
    cambiarEstadoCita,
    editarEspecialista
 };