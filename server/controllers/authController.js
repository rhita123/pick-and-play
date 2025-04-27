// controllers/authController.js
const db = require('../config/db');

// ➡️ Inscription
exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const role = 'user'; // 🔥 On force le rôle "user" à l'inscription

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, password, role], (err, result) => {
    if (err) {
      console.error('Erreur lors de l’inscription :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(201).json({ message: '✅ Utilisateur inscrit avec succès' });
  });
};

// ➡️ Connexion (on récupère le rôle aussi)
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  const sql = 'SELECT id, username, email, role FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    if (results.length > 0) {
      res.status(200).json({ message: '✅ Connexion réussie', user: results[0] });
    } else {
      res.status(401).json({ error: '❌ Email ou mot de passe incorrect' });
    }
  });
};