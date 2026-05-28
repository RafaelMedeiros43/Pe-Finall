const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registar novo utilizador

const register = async (req, res) => {
    try {
        // Verifica se o utilizador preencheu todos os campos
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
        }
        // Verifica se o email já está em uso
        const userExists = await User.findOne({ where: { email } }); // User.findOne = SELECT * FROM User WHERE email = ... do mySQL
        if (userExists) {
            return res.status(400).json({ message: 'Email já está em uso.' });
        }

        // Encriptar password utilizando o bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criar novo utilizador no mySQL
        const newUser = await User.create({ // User.create = INSERT INTO User (username, email, password, role) VALUES (...) do mySQL
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        return res.status(201).json({
            message: 'Utilizador registado com sucesso.', 
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Erro ao registar utilizador:', error);
        return res.status(500).json({ message: 'Ocorreu um erro ao registar o utilizador.' });
    }
}


// Login utilizador
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verifica se o utilizador preencheu todos os campos
        if (!email || !password) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
        }
        const user = await User.findOne({ where: { email } });

        // Verifica se o utilizador existe
        if (!user || !user.email) {
            return res.status(400).json({ message: 'Email não está registado.' });
        }
        // Verifica se a password é correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou password inválidos.' });
        }
        // Gerar token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login bem-sucedido.',
            token
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Ocorreu um erro ao fazer login.' });
    }
}

module.exports = {
    register,
    login
};