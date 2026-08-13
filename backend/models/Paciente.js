const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema(
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

        fechaNacimiento: {
            type: Date,
            required: true
        },

        telefono: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        direccion: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Paciente', pacienteSchema);
