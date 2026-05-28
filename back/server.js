const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db.js');
const User = require('./src/models/User');
const authRoutes = require('./src/routes/authRoutes');
const userController = require('./src/controllers/userController');
const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API do CACA com MySQL" });
});

const PORT = process.env.PORT || 5000;

// Sincronizar a base de dados e iniciar o servidor
sequelize.sync()
    .then(() => {
        console.log("Base de dados sincronizada com sucesso.");
        app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao sincronizar a base de dados:", err);
    });