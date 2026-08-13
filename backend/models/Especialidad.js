const mongoose = require('mongoose');

const especialidadSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        descripcion: {
            type: String,
            required: true,
            trim: true
        },

        estado: {
            type: String,
            enum: ['activa', 'inactiva'],
            default: 'activa'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    'Especialidad',
    especialidadSchema
);