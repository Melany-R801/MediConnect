const express = require('express');

const {
    crearHistorial,
    obtenerHistoriales,
    obtenerHistorial,
    actualizarHistorial,
    eliminarHistorial
} = require('../controllers/historialController');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verificarToken,
    permitirRoles('admin'),
    crearHistorial
);

router.get(
    '/',
    verificarToken,
    obtenerHistoriales
);

router.get(
    '/:id',
    verificarToken,
    obtenerHistorial
);

router.put(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    actualizarHistorial
);

router.delete(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    eliminarHistorial
);

module.exports = router;