const express = require('express');

const {
    registrar,
    login
} = require('../controllers/authController');

const {
    verificarToken,
    permitirRoles
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registrar);

router.post('/login', login);

router.get('/perfil', verificarToken, (req, res) => {
    res.json({
        message: 'Acceso autorizado',
        usuario: req.usuario
    });
});

router.get(
    '/admin',
    verificarToken,
    permitirRoles('admin'),
    (req, res) => {
        res.json({
            message: 'Acceso exclusivo para administradores',
            usuario: req.usuario
        });
    }
);

module.exports = router;
