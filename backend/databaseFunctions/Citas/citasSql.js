const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "acades"
});

async function listarCitas() {
  const query = `
        SELECT
            c.id_cita,
            cl.nombre AS nombre_cliente,
            e.nombre AS nombre_especialista,
            p.nombre AS nombre_procedimiento,
            c.notas,
            c.fecha,
            c.hora,
            c.estado
        FROM
            citas c
        JOIN cliente cl ON c.id_cliente = cl.id_cliente
        JOIN especialista e ON c.id_especialista = e.id_especialista
        LEFT JOIN procedimientos p ON c.id_procedimiento = p.id_procedimiento
    `;
  const [rows] = await connection.query(query);
  return rows;
}

async function obtenerCitaPorId(id) {
  const query = `
        SELECT
            c.id_cita,
            cl.nombre AS nombre_cliente,
            e.nombre AS nombre_especialista,
            p.nombre AS nombre_procedimiento,
            c.notas,
            c.fecha,
            c.hora,
            c.estado
        FROM
            citas c
        JOIN cliente cl ON c.id_cliente = cl.id_cliente
        JOIN especialista e ON c.id_especialista = e.id_especialista
        LEFT JOIN procedimientos p ON c.id_procedimiento = p.id_procedimiento
        WHERE
    c.id_cita = ?
    `;
  const [rows] = await connection.query(query, [id]);
  return rows[0];
}

async function obtenerCitaPorIdCompleta(id) {
  const query = `
        SELECT
            c.id_cita,
            cl.nombre AS nombre_cliente,
            e.nombre AS nombre_especialista,
            p.nombre AS nombre_procedimiento,
            c.notas,
            c.fecha,
            c.hora,
            cl.correo,
            c.estado,
            c.estado_hora
        FROM citas c
        JOIN cliente cl ON c.id_cliente = cl.id_cliente
        JOIN especialista e ON c.id_especialista = e.id_especialista
        LEFT JOIN procedimientos p ON c.id_procedimiento = p.id_procedimiento
        WHERE c.id_cita = ?
    `;
  const [rows] = await connection.query(query, [id]);
  return rows[0];
}
async function obtenerCitasPorPaciente(id_cliente) {
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
    WHERE c.id_cliente = ?
  `;
  const [rows] = await connection.query(query, [id_cliente]);
  return rows;
}

async function crearCita({ id_cliente, id_especialista, id_procedimiento, notas, fecha, hora, estado }) {
  const query = `
      INSERT INTO citas (id_cliente, id_especialista, id_procedimiento, notas, fecha, hora, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const [result] = await connection.query(query, [
    id_cliente,
    id_especialista,
    id_procedimiento,
    notas,
    fecha,
    hora,
    estado
  ]);
  return result;
}

async function actualizarCita(id, id_cliente, id_especialista, descripcion, fecha, hora, estado, estado_hora) {
  const query = "UPDATE citas SET id_cliente = ?, id_especialista = ?, notas = ?, fecha = ?, hora = ?, estado = ?, estado_hora = ? WHERE id_cita = ?";
  const [result] = await connection.query(query, [id_cliente, id_especialista, descripcion, fecha, hora, estado, estado_hora, id]);
  return result;
}

async function eliminarCita(id) {
  const query = "DELETE FROM citas WHERE id_cita = ?";
  const [result] = await connection.query(query, [id]);
  return result;
}

module.exports = {
  listarCitas,
  obtenerCitaPorId,
  obtenerCitasPorPaciente,
  obtenerCitaPorIdCompleta,
  crearCita,
  actualizarCita,
  eliminarCita
};