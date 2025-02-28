const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/store-bmi', authenticateToken, bmiController.storeBmi);

module.exports = router;
