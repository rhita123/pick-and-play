// controllers/reviewController.js
const db = require('../config/db');

// ➡️ Créer une nouvelle critique
exports.createReview = (req, res) => {
  const { work_id, user_id, title, content, rating } = req.body;

  if (!work_id || !user_id || !title || !content || !rating) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const sql = 'INSERT INTO reviews (work_id, user_id, title, content, rating) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [work_id, user_id, title, content, rating], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de la critique :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(201).json({ message: '✅ Critique ajoutée avec succès' });
  });
};

// ➡️ Récupérer toutes les critiques
exports.getAllReviews = (req, res) => {
  const sql = 'SELECT * FROM reviews';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des critiques :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(200).json(results);
  });
};
