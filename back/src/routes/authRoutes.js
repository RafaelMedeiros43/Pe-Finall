const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Rota para registar novo utilizador

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;