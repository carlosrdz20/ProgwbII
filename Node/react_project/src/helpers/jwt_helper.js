const JWT = require('jsonwebtoken');

function crearToken(usuarioInfo){
    return new Promise ((resolve) => {
        const token = JWT.sign(usuarioInfo, 'Secret', { expiresIn: '30m'});
        resolve(token);
    })
}

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 1, mensaje: "ACCESO DENEGADO" });
    }

    const token = authHeader.split(' ')[1];
    JWT.verify(token, 'Secret', (err, payload) => {
        if (err) {
            const msg = (err.name === 'JsonWebTokenError' ? 'ACCESO DENEGADO' : err.message);
            return res.status(401).json({ error: 1, mensaje: msg });
        }
        req.payload = payload;
        next();
    });
}

module.exports = {
    crearToken,
    verifyToken
}