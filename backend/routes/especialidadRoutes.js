const express = require('express');

const {
    crearEspecialidad,
    obtenerEspecialidades,
    obtenerEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
} = require('../controllers/especialidadController');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verificarToken,
    permitirRoles('admin'),
    crearEspecialidad
);

router.get(
    '/',
    verificarToken,
    obtenerEspecialidades
);

router.get(
    '/:id',
    verificarToken,
    obtenerEspecialidad
);

router.put(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    actualizarEspecialidad
);

router.delete(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    eliminarEspecialidad
);

module.exports = router;