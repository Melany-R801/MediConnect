const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        cedula: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        especialidad: {
            type: String,
            required: true,
            trim: true
        },

        horario: {
            type: String,
            required: true,
            trim: true
        },

        telefono: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Doctor', doctorSchema);
