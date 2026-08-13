const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const generarToken = (usuario) => {
    return jwt.sign(
        {
            id: usuario._id,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        }
    );
};

const registrar = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: 'Nombre, email y password son obligatorios'
            });
        }

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(409).json({
                message: 'El email ya está registrado'
            });
        }

        const passwordCifrado = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({
                nombre,
                email,
                password: passwordCifrado,
                rol: 'user'
        });

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y password son obligatorios'
            });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        const passwordCorrecto = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecto) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        const token = generarToken(usuario);

        res.json({
            message: 'Login exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

module.exports = {
    registrar,
    login
};
