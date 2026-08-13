const Doctor = require('../models/Doctor');

// CREAR
const crearDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            message: 'Doctor creado correctamente',
            doctor
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear doctor',
            error: error.message
        });
    }
};

// OBTENER TODOS
const obtenerDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.find();

        res.json(doctores);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener doctores',
            error: error.message
        });
    }
};

// OBTENER UNO
const obtenerDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                message: 'Doctor no encontrado'
            });
        }

        res.json(doctor);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener doctor',
            error: error.message
        });
    }
};

// ACTUALIZAR
const actualizarDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!doctor) {
            return res.status(404).json({
                message: 'Doctor no encontrado'
            });
        }

        res.json({
            message: 'Doctor actualizado correctamente',
            doctor
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar doctor',
            error: error.message
        });
    }
};

// ELIMINAR
const eliminarDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(
            req.params.id
        );

        if (!doctor) {
            return res.status(404).json({
                message: 'Doctor no encontrado'
            });
        }

        res.json({
            message: 'Doctor eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar doctor',
            error: error.message
        });
    }
};

module.exports = {
    crearDoctor,
    obtenerDoctores,
    obtenerDoctor,
    actualizarDoctor,
    eliminarDoctor
};