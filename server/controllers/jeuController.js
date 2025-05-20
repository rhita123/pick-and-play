const db = require('../config/db');

exports.addGame = (req, res) => {
  const { Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age } = req.body;

  const sql = `INSERT INTO Jeu (Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age, Est_Loue)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, false)`;

  db.query(sql, [Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(201).json({ message: 'Jeu ajouté avec succès', gameId: result.insertId });
  });
};