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

// ➡️ Récupérer les critiques pour un film précis
exports.getReviewsByWorkId = (req, res) => {
    const { work_id } = req.params;
  
    const sql = 'SELECT * FROM reviews WHERE work_id = ?';
  
    db.query(sql, [work_id], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des critiques par work_id :', err);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }
      res.status(200).json(results);
    });
  };

  // Update les critiques pour un film précis
  
  exports.updateReview = (req, res) => {
    const reviewId = req.params.id;
    const { title, content, rating } = req.body;
  
    const sql = 'UPDATE reviews SET title = ?, content = ?, rating = ? WHERE id = ?';
    db.query(sql, [title, content, rating, reviewId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la modification' });
      }
      res.json({ message: 'Critique mise à jour ✅' });
    });
  };

    // Supprimer les critiques pour un film précis

  exports.deleteReview = (req, res) => {
    const reviewId = req.params.id;
  
    const sql = 'DELETE FROM reviews WHERE id = ?';
    db.query(sql, [reviewId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la suppression' });
      }
      res.json({ message: 'Critique supprimée ✅' });
    });
  };