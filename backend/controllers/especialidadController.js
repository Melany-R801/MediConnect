const Especialidad = require('../models/Especialidad');

// CREAR
const crearEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.create(req.body);

        res.status(201).json({
            message: 'Especialidad creada correctamente',
            especialidad
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear especialidad',
            error: error.message
        });
    }
};

// OBTENER TODAS
const obtenerEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.find();

        res.json(especialidades);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener especialidades',
            error: error.message
        });
    }
};

// OBTENER UNA
const obtenerEspecialidad = async (req, res) => {
    try {
        const especialidad = await Especialidad.findById(
            req.params.id
        );

        if (!especialidad) {
            return res.status(404).json({
                message: 'Especialidad no encontrada'
            });
        }

        res.json(especialidad);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener especialidad',
            error: error.message
        });
    }
};

// ACTUALIZAR
const actualizarEspecialidad = async (req, res) => {
    try {
        const especialidad =
            await Especialidad.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!especialidad) {
            return res.status(404).json({
                message: 'Especialidad no encontrada'
            });
        }

        res.json({
            message: 'Especialidad actualizada correctamente',
            especialidad
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar especialidad',
            error: error.message
        });
    }
};

// ELIMINAR
const eliminarEspecialidad = async (req, res) => {
    try {
        const especialidad =
            await Especialidad.findByIdAndDelete(
                req.params.id
            );

        if (!especialidad) {
            return res.status(404).json({
                message: 'Especialidad no encontrada'
            });
        }

        res.json({
            message: 'Especialidad eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar especialidad',
            error: error.message
        });
    }
};

module.exports = {
    crearEspecialidad,
    obtenerEspecialidades,
    obtenerEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
};