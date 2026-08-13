const Paciente = require('../models/Paciente');

// CREAR
const crearPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.create(req.body);

        res.status(201).json({
            message: 'Paciente creado correctamente',
            paciente
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear paciente',
            error: error.message
        });
    }
};

// OBTENER TODOS
const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();

        res.json(pacientes);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener pacientes',
            error: error.message
        });
    }
};

// OBTENER UNO
const obtenerPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);

        if (!paciente) {
            return res.status(404).json({
                message: 'Paciente no encontrado'
            });
        }

        res.json(paciente);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener paciente',
            error: error.message
        });
    }
};

// ACTUALIZAR
const actualizarPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!paciente) {
            return res.status(404).json({
                message: 'Paciente no encontrado'
            });
        }

        res.json({
            message: 'Paciente actualizado correctamente',
            paciente
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar paciente',
            error: error.message
        });
    }
};

// ELIMINAR
const eliminarPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(
            req.params.id
        );

        if (!paciente) {
            return res.status(404).json({
                message: 'Paciente no encontrado'
            });
        }

        res.json({
            message: 'Paciente eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar paciente',
            error: error.message
        });
    }
};

module.exports = {
    crearPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};
