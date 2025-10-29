const express = require('express');
const authController = require('./authController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', verifyToken, authController.logout);

module.exports = authRoutes = router;