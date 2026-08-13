const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema(
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

        diagnostico: {
            type: String,
            required: true,
            trim: true
        },

        notas: {
            type: String,
            required: true,
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

module.exports = mongoose.model('Historial', historialSchema);