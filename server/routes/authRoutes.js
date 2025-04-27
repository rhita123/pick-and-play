// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ➡️ Route pour inscription
router.post('/register', authController.register);

// ➡️ Route pour connexion
router.post('/login', authController.login);

module.exports = router;
