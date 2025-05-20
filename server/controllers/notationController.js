


const db = require('../config/db');

// Ajouter une notation à un jeu
exports.addNotation = (req, res) => {
  const idUtilisateur = req.user.id;
  const idJeu = req.params.id;
  const { Note, Commentaire } = req.body;

  const sql = `
    INSERT INTO Notation (ID_Utilisateur, ID_Jeu, Note, Commentaire, Date)
    VALUES (?, ?, ?, ?, CURDATE())
    ON DUPLICATE KEY UPDATE
      Note = VALUES(Note),
      Commentaire = VALUES(Commentaire),
      Date = CURDATE()
  `;

  db.query(sql, [idUtilisateur, idJeu, Note, Commentaire], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la notation :', err);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout de la notation' });
    }
    res.status(200).json({ message: 'Notation enregistrée avec succès' });
  });
};

// Récupérer les notations d’un jeu
exports.getNotations = (req, res) => {
  const idJeu = req.params.id;

  const sql = `
    SELECT u.Nom AS Utilisateur, n.Note, n.Commentaire, n.Date
    FROM Notation n
    JOIN Utilisateur u ON n.ID_Utilisateur = u.ID_Utilisateur
    WHERE n.ID_Jeu = ?
    ORDER BY n.Date DESC
  `;

  db.query(sql, [idJeu], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des notations :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.status(200).json(results);
  });
};