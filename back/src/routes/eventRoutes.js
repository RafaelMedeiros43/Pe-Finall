const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authorizeAdmin } = require('../middlewares/authMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/create', authenticateToken, authorizeAdmin, eventController.createEvent);
router.get('/all',authenticateToken, eventController.getAllEvents);
router.put('/update/:id',authenticateToken, authorizeAdmin, eventController.updateEvent);
router.delete('/delete/:id', authenticateToken, authorizeAdmin, eventController.deleteEvent);

module.exports = router;