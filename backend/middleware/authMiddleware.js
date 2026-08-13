const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Token no proporcionado'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido o expirado'
        });
    }
};

const permitirRoles = (...roles) => {
    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(401).json({
                message: 'Usuario no autenticado'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({
                message: 'No tienes permisos para realizar esta acción'
            });
        }

        next();
    };
};

module.exports = {
    verificarToken,
    permitirRoles
};