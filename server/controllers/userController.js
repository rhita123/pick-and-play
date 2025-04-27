// controllers/userController.js
const db = require('../config/db');

exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, username, email, role FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur récupération utilisateurs :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(200).json(results);
  });
};