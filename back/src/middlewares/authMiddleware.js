const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader &&authHeader.split(' ')[1]; // Extrai o token do header (&& para garantir que authHeader existe antes de tentar dividir)
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token de autenticação inválido.' });
        req.user = user;
        next();
    });
}

const authorizeAdmin = (req, res, next) => {

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
    }
}

module.exports = {
    authenticateToken,
    authorizeAdmin
};