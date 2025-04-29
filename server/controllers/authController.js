// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// INSCRIPTION
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const userRole = role || 'user';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, hashedPassword, userRole], (err, result) => {
      if (err) {
        console.error('Erreur lors de l’inscription :', err);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }
      res.status(201).json({ message: '✅ Utilisateur inscrit avec succès' });
    });
  } catch (err) {
    console.error('Erreur de hash :', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// CONNEXION
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: '❌ Email ou mot de passe incorrect' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: '❌ Email ou mot de passe incorrect' });
    }

    res.status(200).json({
      message: '✅ Connexion réussie',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  });
};

// GET ALL USERS (admin only)
// GET ALL USERS (admin only)
exports.getAllUsers = async (req, res) => {
  console.log('🧩 Utilisateur connecté dans getAllUsers :', req.user);

  try {
    const user = req.user;

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Accès interdit. Administrateur uniquement." });
    }

    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }
      res.json(results);
    });

  } catch (error) {
    console.error('Erreur récupération utilisateurs :', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};