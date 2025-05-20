

const express = require('express');
const router = express.Router();
const { addGame } = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');

// Middleware pour vérifier le rôle admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Accès refusé. Réservé aux administrateurs.' });
  }
};

router.post('/add-game', verifyToken, isAdmin, addGame);

module.exports = router;