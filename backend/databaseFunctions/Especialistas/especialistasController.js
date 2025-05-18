const especialistasSql = require('./especialistaSql');

async function especialistasPorProcedimiento(req, res) {
    const { procedimiento } = req.query;
    try {
        const especialistas = await especialistasSql.especialistasPorProcedimiento(procedimiento);
        res.json(especialistas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener especialistas" });
    }
}

module.exports = { especialistasPorProcedimiento };