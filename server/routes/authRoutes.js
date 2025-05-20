/*// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken'); // middleware pour vérifier l'utilisateur

// ROUTES
router.post('/register', authController.register);
router.post('/login', authController.login);

// Pour afficher tous les utilisateurs (admin uniquement)
router.get('/users', verifyToken, authController.getAllUsers);

module.exports = router;*/