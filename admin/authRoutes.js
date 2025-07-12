const express = require('express');
const authController = require('./authController');
const router = express.Router();

router.post('/', authController.login);

module.exports = authRoutes = router;