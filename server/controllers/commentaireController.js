

const db = require('../config/db');

exports.createCommentaire = (req, res) => {
  const { commentaire } = req.body;
  const id_jeu = req.params.id;
  const id_utilisateur = req.user.id;

  if (!commentaire || !id_jeu || !id_utilisateur) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  const sql = 'INSERT INTO Commentaire (ID_Utilisateur, ID_Jeu, Texte) VALUES (?, ?, ?)';
  db.query(sql, [id_utilisateur, id_jeu, commentaire], (err, result) => {
    if (err) {
      console.error("Erreur ajout commentaire :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(201).json({ message: "Commentaire ajouté avec succès" });
  });
};

exports.getCommentairesByJeu = (req, res) => {
  const id_jeu = req.params.id;
  const sql = `
    SELECT u.Nom AS utilisateur, c.Texte, c.Date
    FROM Commentaire c
    JOIN Utilisateur u ON c.ID_Utilisateur = u.ID_Utilisateur
    WHERE c.ID_Jeu = ?
    ORDER BY c.Date DESC
  `;
  db.query(sql, [id_jeu], (err, results) => {
    if (err) {
      console.error("Erreur récupération commentaires :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
};