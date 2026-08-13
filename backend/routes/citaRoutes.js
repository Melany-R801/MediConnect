const express = require('express');

const {
    crearCita,
    obtenerCitas,
    obtenerCita,
    actualizarCita,
    eliminarCita
} = require('../controllers/citaController');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verificarToken,
    permitirRoles('admin'),
    crearCita
);

router.get(
    '/',
    verificarToken,
    obtenerCitas
);

router.get(
    '/:id',
    verificarToken,
    obtenerCita
);

router.put(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    actualizarCita
);

router.delete(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    eliminarCita
);

module.exports = router;