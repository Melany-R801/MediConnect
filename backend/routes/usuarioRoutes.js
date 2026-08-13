const express = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();


// GET - Obtener todos los usuarios
router.get(
    '/',
    verificarToken,
    permitirRoles('admin'),
    async (req, res) => {

        try {

            const usuarios = await Usuario.find()
                .select('-password')
                .sort({ createdAt: -1 });

            res.json(usuarios);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al obtener los usuarios'
            });

        }
    }
);


// POST - Crear usuario
router.post(
    '/',
    verificarToken,
    permitirRoles('admin'),
    async (req, res) => {

        try {

            const {
                nombre,
                email,
                password,
                rol
            } = req.body;

            if (!nombre || !email || !password) {

                return res.status(400).json({
                    message: 'Nombre, email y contraseña son obligatorios'
                });

            }

            const usuarioExistente = await Usuario.findOne({
                email
            });

            if (usuarioExistente) {

                return res.status(400).json({
                    message: 'El email ya está registrado'
                });

            }

            const passwordHash = await bcrypt.hash(password, 10);

            const usuario = new Usuario({
                nombre,
                email,
                password: passwordHash,
                rol: rol || 'user'
            });

            await usuario.save();

            res.status(201).json({
                message: 'Usuario creado correctamente',
                usuario: {
                    id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rol
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al crear el usuario'
            });

        }
    }
);


// PUT - Actualizar usuario
router.put(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    async (req, res) => {

        try {

            const {
                nombre,
                email,
                password,
                rol
            } = req.body;

            const usuario = await Usuario.findById(
                req.params.id
            );

            if (!usuario) {

                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });

            }

            usuario.nombre = nombre;
            usuario.email = email;
            usuario.rol = rol;

            // Solo cambiar contraseña si se escribió una nueva
            if (password && password.trim() !== '') {

                usuario.password = await bcrypt.hash(
                    password,
                    10
                );

            }

            await usuario.save();

            res.json({
                message: 'Usuario actualizado correctamente',
                usuario: {
                    id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rol
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al actualizar el usuario'
            });

        }
    }
);


// DELETE - Eliminar usuario
router.delete(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    async (req, res) => {

        try {

            const usuario = await Usuario.findById(
                req.params.id
            );

            if (!usuario) {

                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });

            }

            // Evitar eliminar el administrador actual
            if (
                usuario.email === 'admin@mediconnect.com'
            ) {

                return res.status(400).json({
                    message: 'No se puede eliminar el administrador principal'
                });

            }

            await Usuario.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message: 'Usuario eliminado correctamente'
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al eliminar el usuario'
            });

        }
    }
);


module.exports = router;