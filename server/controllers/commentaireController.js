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



exports.updateCommentaire = (req, res) => {
  const id_commentaire = req.params.id;
  const id_utilisateur = req.user.id;
  const { texte } = req.body;

  const sql = 'UPDATE Commentaire SET Texte = ? WHERE ID_Commentaire = ?';
  db.query(sql, [texte, id_commentaire], (err, result) => {
    if (err) {
      console.error("Erreur modification commentaire :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Non autorisé à modifier ce commentaire" });
    }
    res.status(200).json({ message: "Commentaire modifié avec succès" });
  });
};

exports.deleteCommentaire = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM Commentaire WHERE ID_Commentaire = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur suppression commentaire :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(200).json({ message: "Commentaire supprimé" });
  });
};