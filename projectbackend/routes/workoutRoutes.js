const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/store-workout', authenticateToken, workoutController.storeWorkout);

module.exports = router;