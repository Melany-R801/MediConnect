const express = require('express');

const {
    crearDoctor,
    obtenerDoctores,
    obtenerDoctor,
    actualizarDoctor,
    eliminarDoctor
} = require('../controllers/doctorController');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verificarToken,
    permitirRoles('admin'),
    crearDoctor
);

router.get(
    '/',
    verificarToken,
    obtenerDoctores
);

router.get(
    '/:id',
    verificarToken,
    obtenerDoctor
);

router.put(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    actualizarDoctor
);

router.delete(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    eliminarDoctor
);

module.exports = router;