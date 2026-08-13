const Historial = require('../models/Historial');

// CREAR
const crearHistorial = async (req, res) => {
    try {
        const historial = await Historial.create(req.body);

        const historialCompleto = await Historial.findById(historial._id)
            .populate('paciente')
            .populate('doctor');

        res.status(201).json({
            message: 'Historial creado correctamente',
            historial: historialCompleto
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear historial',
            error: error.message
        });
    }
};

// OBTENER TODOS
const obtenerHistoriales = async (req, res) => {
    try {
        const historiales = await Historial.find()
            .populate('paciente')
            .populate('doctor');

        res.json(historiales);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener historiales',
            error: error.message
        });
    }
};

// OBTENER UNO
const obtenerHistorial = async (req, res) => {
    try {
        const historial = await Historial.findById(req.params.id)
            .populate('paciente')
            .populate('doctor');

        if (!historial) {
            return res.status(404).json({
                message: 'Historial no encontrado'
            });
        }

        res.json(historial);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener historial',
            error: error.message
        });
    }
};

// ACTUALIZAR
const actualizarHistorial = async (req, res) => {
    try {
        const historial = await Historial.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate('paciente')
            .populate('doctor');

        if (!historial) {
            return res.status(404).json({
                message: 'Historial no encontrado'
            });
        }

        res.json({
            message: 'Historial actualizado correctamente',
            historial
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar historial',
            error: error.message
        });
    }
};

// ELIMINAR
const eliminarHistorial = async (req, res) => {
    try {
        const historial = await Historial.findByIdAndDelete(
            req.params.id
        );

        if (!historial) {
            return res.status(404).json({
                message: 'Historial no encontrado'
            });
        }

        res.json({
            message: 'Historial eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar historial',
            error: error.message
        });
    }
};

module.exports = {
    crearHistorial,
    obtenerHistoriales,
    obtenerHistorial,
    actualizarHistorial,
    eliminarHistorial
};