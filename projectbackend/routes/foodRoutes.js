const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/api/store-food-calories', authenticateToken, foodController.storeFoodCalories);

module.exports = router;