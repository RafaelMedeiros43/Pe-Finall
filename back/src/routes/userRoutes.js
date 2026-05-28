const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authorizeAdmin } = require('../middlewares/authMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/getprofile', authenticateToken, userController.getProfile);
router.put('/updateprofile', authenticateToken, userController.updateProfile);

// Admin routes
router.get('/getallprofiles', authenticateToken, authorizeAdmin, userController.getAllUsers);
router.delete('/deleteprofile/:id', authenticateToken, authorizeAdmin, userController.deleteUser);
module.exports = router;