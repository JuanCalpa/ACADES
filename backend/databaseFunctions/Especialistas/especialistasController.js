const especialistasSql = require('./especialistaSql');

async function especialistasPorProcedimiento(req, res) {
    const { id_procedimiento } = req.query;
    try {
        const especialistas = await especialistasSql.especialistasPorProcedimiento(id_procedimiento);
        res.json(especialistas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener especialistas" });
    }
}

async function confirmarCita(req, res) {
   
    const usuarioEmail = req.body.usuarioEmail;
    const asunto = 'Confirmación de cita';
    const mensaje = 'Tu cita ha sido confirmada por el especialista.';

    try {
        await especialistasSql.sendConfirmationEmail(usuarioEmail, asunto, mensaje);
        res.status(200).json({ mensaje: 'Cita confirmada y correo enviado.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al enviar el correo.', error: error.message });
    }
}

async function listarCitasPorEspecialista(req, res) {
    const especialistaId = req.params.id;

    try {
        const citas = await especialistasSql.listarCitasPorEspecialista(especialistaId);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar citas.', error: error.message });
    }
}

module.exports = { 
    especialistasPorProcedimiento,
    confirmarCita,
    listarCitasPorEspecialista
 };