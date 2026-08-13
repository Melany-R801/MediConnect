const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema(
    {
        paciente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Paciente',
            required: true
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },

        medicamento: {
            type: String,
            required: true,
            trim: true
        },

        dosis: {
            type: String,
            required: true,
            trim: true
        },

        duracion: {
            type: String,
            required: true,
            trim: true
        },

        indicaciones: {
            type: String,
            trim: true
        },

        fecha: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Receta', recetaSchema);