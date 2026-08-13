const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema(
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

        especialidad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Especialidad',
            required: true
        },

        fecha: {
            type: Date,
            required: true
        },

        hora: {
            type: String,
            required: true
        },

        motivo: {
            type: String,
            required: true,
            trim: true
        },

        estado: {
            type: String,
            enum: [
                'programada',
                'confirmada',
                'atendida',
                'cancelada'
            ],
            default: 'programada'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Cita', citaSchema);