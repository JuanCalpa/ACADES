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

const crearPaciente = async (nombre, correo, cedula, fecha_nacimiento, telefono, contrasena) => {
  const sql = `
    INSERT INTO cliente (nombre, correo, cedula, fecha_nacimiento, telefono, contrasena)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await connection.query(sql, [nombre, correo, cedula, fecha_nacimiento, telefono, contrasena]);
  return result; 
};

async function atualizarPaciente(id_cliente, nombre, correo, cedula, fecha_nacimiento, telefono) {
    const query = "UPDATE cliente SET nombre = ?, correo = ?, cedula = ?, fecha_nacimiento = ?, telefono = ? WHERE id_cliente = ?";
    const [result] = await connection.query(query, [nombre, correo, cedula, fecha_nacimiento, telefono, id_cliente]);
    return result;
}

async function eliminarPaciente(id_cliente) {
  try {
    const foreignKeys = [
      { table: 'citas', key: 'citas_ibfk_1' }, // nombre de la clave foránea por defecto, puede cambiar si la nombraste distinta
    ];

    for (const { table, key } of foreignKeys) {
      const [rows] = await connection.execute(
        `SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
         WHERE TABLE_NAME = ? AND CONSTRAINT_NAME = ?`,
        [table, key]
      );

      if (rows.length > 0) {
        await connection.execute(`ALTER TABLE \`${table}\` DROP FOREIGN KEY \`${key}\``);
      }
    }

    // Agregar de nuevo la restricción con ON DELETE CASCADE
    const cascadedKeys = [
      {
        table: 'citas',
        name: 'fk_citas_cliente',
        column: 'id_cliente'
      },
    ];

    for (const { table, name, column } of cascadedKeys) {
      const [rows] = await connection.execute(
        `SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
         WHERE TABLE_NAME = ? AND CONSTRAINT_NAME = ?`,
        [table, name]
      );

      if (rows.length === 0) {
        await connection.execute(`
          ALTER TABLE \`${table}\`
          ADD CONSTRAINT \`${name}\`
          FOREIGN KEY (\`${column}\`)
          REFERENCES cliente(id_cliente)
          ON DELETE CASCADE
        `);
      }
    }

    const [result] = await connection.execute(
      `DELETE FROM cliente WHERE id_cliente = ?`,
      [id_cliente]
    );

    return result;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
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
