const Receta = require('../models/Receta');

// CREAR
const crearReceta = async (req, res) => {
    try {
        const receta = await Receta.create(req.body);

        const recetaCompleta = await Receta.findById(receta._id)
            .populate('paciente')
            .populate('doctor');

        res.status(201).json({
            message: 'Receta creada correctamente',
            receta: recetaCompleta
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear receta',
            error: error.message
        });
    }
};

// OBTENER TODAS
const obtenerRecetas = async (req, res) => {
    try {
        const recetas = await Receta.find()
            .populate('paciente')
            .populate('doctor');

        res.json(recetas);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener recetas',
            error: error.message
        });
    }
};

// OBTENER UNA
const obtenerReceta = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id)
            .populate('paciente')
            .populate('doctor');

        if (!receta) {
            return res.status(404).json({
                message: 'Receta no encontrada'
            });
        }

        res.json(receta);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener receta',
            error: error.message
        });
    }
};

// ACTUALIZAR
const actualizarReceta = async (req, res) => {
    try {
        const receta = await Receta.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate('paciente')
            .populate('doctor');

        if (!receta) {
            return res.status(404).json({
                message: 'Receta no encontrada'
            });
        }

        res.json({
            message: 'Receta actualizada correctamente',
            receta
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar receta',
            error: error.message
        });
    }
};

// ELIMINAR
const eliminarReceta = async (req, res) => {
    try {
        const receta = await Receta.findByIdAndDelete(
            req.params.id
        );

        if (!receta) {
            return res.status(404).json({
                message: 'Receta no encontrada'
            });
        }

        res.json({
            message: 'Receta eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar receta',
            error: error.message
        });
    }
};

module.exports = {
    crearReceta,
    obtenerRecetas,
    obtenerReceta,
    actualizarReceta,
    eliminarReceta
};