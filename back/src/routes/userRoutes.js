const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authorizeAdmin } = require('../middlewares/authMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);

// Admin routes
router.get('/all', authenticateToken, authorizeAdmin, userController.getAllUsers);
router.delete('/:id', authenticateToken, authorizeAdmin, userController.deleteUser);
module.exports = router;