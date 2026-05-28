const sequelize = require('sequelize');
const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Obtém o ID do utilizador a partir do token de autenticação
        const user = await User.findByPk(userId, { // User.findByPk   SELECT * FROM User WHERE id = ... do mySQL
            attributes: ['id', 'username', 'email', 'role']
        });
        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }
        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar perfil do utilizador:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Obtém o ID do utilizador a partir do token de autenticação
        const { username, email } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }

        await user.update({ username, email }); 
        return res.json({ 
            message: 'Perfil atualizado com sucesso.', 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email, 
                role: user.role 
            } 
        });
    } catch (error) {
        console.error('Erro ao atualizar perfil do utilizador:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role']
        });
        return res.json(users);
    } catch (error) {
        console.error('Erro ao buscar todos os utilizadores:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }
        await user.destroy();
        return res.json({ message: 'Utilizador eliminado com sucesso.' });
    } catch (error) {
        console.error('Erro ao eliminar utilizador:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    deleteUser
};