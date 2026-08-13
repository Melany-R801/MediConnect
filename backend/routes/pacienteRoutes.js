const express = require('express');

const {
    crearPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
} = require('../controllers/pacienteController');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verificarToken,
    permitirRoles('admin'),
    crearPaciente
);

router.get(
    '/',
    verificarToken,
    obtenerPacientes
);

router.get(
    '/:id',
    verificarToken,
    obtenerPaciente
);

router.put(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    actualizarPaciente
);

router.delete(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    eliminarPaciente
);

module.exports = router;
