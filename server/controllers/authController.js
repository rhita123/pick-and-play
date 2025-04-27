// controllers/authController.js
const db = require('../config/db');

exports.register = (req, res) => {
  const { username, email, password, role } = req.body;  // <-- Ajout de role

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Si aucun rôle précisé, par défaut mettre 'user'
  const userRole = role || 'user';

  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, password, userRole], (err, result) => {
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

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    if (results.length > 0) {
      const user = results[0];
      res.status(200).json({
        message: '✅ Connexion réussie',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role // <-- important de renvoyer le rôle !
        }
      });
    } else {
      res.status(401).json({ error: '❌ Email ou mot de passe incorrect' });
    }
  });
};

// Vérification pour que seul l'admin puisse accéder aux utilisateurs
exports.getAllUsers = (req, res) => {
  const user = req.user; // L'utilisateur connecté, supposé être mis en place par un middleware d'authentification

  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès interdit. Vous devez être un administrateur.' });
  }

  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(200).json(results);
  });
};