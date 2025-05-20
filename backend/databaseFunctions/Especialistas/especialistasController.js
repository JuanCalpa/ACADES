const especialistasSql = require('./especialistaSql');


async function agregarEspecialista(req, res) {
    const { nombre, especialidad, telefono, correo, contrasena } = req.body;
    try {
        const resultado = await especialistasSql.agregarEspecialista(nombre, especialidad, telefono, correo, contrasena);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar especialista.', error: error.message });
    }
}
async function eliminarEspecialista(req, res) {
    const { id } = req.params;
    try {
        const resultado = await especialistasSql.eliminarEspecialista(id);
       
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar especialista.', error: error.message });
    }
}

async function listarEspecialistas(req, res) {
    try {
        const especialistas = await especialistasSql.listarEspecialistas();
        res.status(200).json(especialistas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar especialistas.', error: error.message });
    }
}
async function especialistasPorProcedimiento(req, res) {
    const { id_procedimiento } = req.query;
    try {
        const especialistas = await especialistasSql.especialistasPorProcedimiento(id_procedimiento);
        res.json(especialistas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener especialistas" });
    }
}

async function cambiarEstadoCita(req, res) {
    const { id_cita, id_especialista, nuevoEstado, usuarioEmail } = req.body;
    let asunto = '';
    let mensaje = '';

    // Puedes personalizar el asunto/mensaje según el estado
    if (nuevoEstado === 'Confirmada') {
        asunto = 'Confirmación de cita';
        mensaje = 'Tu cita ha sido confirmada.';
    } else if (nuevoEstado === 'Cancelada') {
        asunto = 'Cancelación de cita';
        mensaje = 'Tu cita ha sido cancelada.';
    } else if (nuevoEstado === 'Realizada') {
        asunto = 'Cita realizada';
        mensaje = 'Tu cita ha sido marcada como realizada.';
    }

    try {
        await especialistasSql.cambiarEstadoCita(id_cita, id_especialista, nuevoEstado);

        // Solo enviar correo si hay email y asunto
        if (usuarioEmail && asunto && mensaje) {
            await especialistasSql.sendConfirmationEmail(usuarioEmail, asunto, mensaje);
        }

        res.status(200).json({ mensaje: `Cita actualizada a estado: ${nuevoEstado}` });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cambiar el estado de la cita.', error: error.message });
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


async function listarCitasPendientesPorEspecialista(req, res) {
    const especialistaId = req.params.id;
    try {
        const citas = await especialistasSql.listarCitasPendientesPorEspecialista(especialistaId);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar citas pendientes.', error: error.message });
    }
}

async function listarCitasConfirmadaPorEspecialista(req, res) {
    const especialistaId = req.params.id;
    try {
        const citas = await especialistasSql.listarCitasConfirmadaPorEspecialista(especialistaId);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar citas confirmadas.', error: error.message });
    }
}

async function editarEspecialista(req, res) {
    const { id_especialista, nombre,especialidad, telefono, correo } = req.body;
    console.log({ id_especialista, nombre, especialidad, telefono, correo });
    try {
        const resultado = await especialistasSql.editarEspecialista(id_especialista, nombre,especialidad, telefono, correo);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al editar especialista.', error: error.message });
    }
}

module.exports = { 
    agregarEspecialista,
    eliminarEspecialista,
    listarEspecialistas,
    especialistasPorProcedimiento,
    cambiarEstadoCita,
    listarCitasPorEspecialista, 
    listarCitasPendientesPorEspecialista,
    listarCitasConfirmadaPorEspecialista,
    editarEspecialista
 };