const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const crearAdmin = async () => {
    try {
        const emailAdmin = 'admin@mediconnect.com';

        const adminExistente = await Usuario.findOne({
            email: emailAdmin
        });

        if (adminExistente) {
            console.log('Administrador ya existe');
            return;
        }

        const passwordCifrado = await bcrypt.hash(
            'Admin123*',
            10
        );

        await Usuario.create({
            nombre: 'Administrador MediConnect',
            email: emailAdmin,
            password: passwordCifrado,
            rol: 'admin'
        });

        console.log('Administrador creado correctamente');

    } catch (error) {
        console.error(
            'Error al crear administrador:',
            error.message
        );
    }
};

module.exports = crearAdmin;
