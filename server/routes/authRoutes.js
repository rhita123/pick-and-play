// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ➡️ Route pour l'inscription
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Erreur lors de l’inscription :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.status(201).json({ message: '✅ Utilisateur inscrit avec succès' });
  });
});

// ➡️ Route pour la connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (results.length > 0) {
      res.status(200).json({ message: '✅ Connexion réussie', user: results[0] });
    } else {
      res.status(401).json({ error: '❌ Email ou mot de passe incorrect' });
    }
  });
});

module.exports = router;
