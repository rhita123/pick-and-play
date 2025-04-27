// controllers/commentController.js
const db = require('../config/db');

// ➡️ Ajouter un commentaire
exports.createComment = (req, res) => {
  const { review_id, user_id, content } = req.body;

  if (!review_id || !user_id || !content) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const sql = 'INSERT INTO comments (review_id, user_id, content) VALUES (?, ?, ?)';
  db.query(sql, [review_id, user_id, content], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du commentaire :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(201).json({ message: '✅ Commentaire ajouté avec succès' });
  });
};

// ➡️ Récupérer les commentaires d'une critique spécifique
exports.getCommentsByReviewId = (req, res) => {
  const { review_id } = req.params;

  const sql = 'SELECT * FROM comments WHERE review_id = ? ORDER BY created_at DESC';
  db.query(sql, [review_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des commentaires :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(200).json(results);
  });
};
