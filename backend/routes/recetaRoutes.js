const express = require('express');

const {
    crearReceta,
    obtenerRecetas,
    obtenerReceta,
    actualizarReceta,
    eliminarReceta
} = require('../controllers/recetaController');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verificarToken,
    permitirRoles('admin'),
    crearReceta
);

router.get(
    '/',
    verificarToken,
    obtenerRecetas
);

router.get(
    '/:id',
    verificarToken,
    obtenerReceta
);

router.put(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    actualizarReceta
);

router.delete(
    '/:id',
    verificarToken,
    permitirRoles('admin'),
    eliminarReceta
);

module.exports = router;