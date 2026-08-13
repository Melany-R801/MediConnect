const Cita = require('../models/Cita');

// CREAR
const crearCita = async (req, res) => {
    try {
        const cita = await Cita.create(req.body);

        const citaCompleta = await Cita.findById(cita._id)
            .populate('paciente')
            .populate('doctor')
            .populate('especialidad');

        res.status(201).json({
            message: 'Cita creada correctamente',
            cita: citaCompleta
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear cita',
            error: error.message
        });
    }
};

// OBTENER TODAS
const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find()
            .populate('paciente')
            .populate('doctor')
            .populate('especialidad');

        res.json(citas);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener citas',
            error: error.message
        });
    }
};

// OBTENER UNA
const obtenerCita = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id)
            .populate('paciente')
            .populate('doctor')
            .populate('especialidad');

        if (!cita) {
            return res.status(404).json({
                message: 'Cita no encontrada'
            });
        }

        res.json(cita);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener cita',
            error: error.message
        });
    }
};

// ACTUALIZAR
const actualizarCita = async (req, res) => {
    try {
        const cita = await Cita.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate('paciente')
            .populate('doctor')
            .populate('especialidad');

        if (!cita) {
            return res.status(404).json({
                message: 'Cita no encontrada'
            });
        }

        res.json({
            message: 'Cita actualizada correctamente',
            cita
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar cita',
            error: error.message
        });
    }
};

// ELIMINAR
const eliminarCita = async (req, res) => {
    try {
        const cita = await Cita.findByIdAndDelete(
            req.params.id
        );

        if (!cita) {
            return res.status(404).json({
                message: 'Cita no encontrada'
            });
        }

        res.json({
            message: 'Cita eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar cita',
            error: error.message
        });
    }
};

module.exports = {
    crearCita,
    obtenerCitas,
    obtenerCita,
    actualizarCita,
    eliminarCita
};