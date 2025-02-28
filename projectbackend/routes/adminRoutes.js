const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/admin-login', adminController.adminLogin);

// Add other admin routes here

module.exports = router;