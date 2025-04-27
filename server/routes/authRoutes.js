const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Inscription
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Erreur lors de l’inscription :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.status(201).json({ message: 'Utilisateur inscrit avec succès ✅' });
  });
});

// Connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (results.length > 0) {
      res.json({ message: 'Connexion réussie ✅', user: results[0] });
    } else {
      res.status(401).json({ error: 'Email ou mot de passe incorrect ❌' });
    }
  });
});

module.exports = router;
