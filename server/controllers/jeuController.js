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

exports.getAllGames = (req, res) => {
  const sql = 'SELECT * FROM Jeu';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des jeux :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.status(200).json(results);
  });
};

exports.getGameById = (req, res) => {
  const gameId = req.params.id;
  const sql = 'SELECT * FROM Jeu WHERE ID_Jeu = ?';

  db.query(sql, [gameId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du jeu :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }

    res.status(200).json(results[0]);
  });
};

exports.louerJeu = (req, res) => {
  const jeuId = req.params.id;

  const sql = 'UPDATE Jeu SET Est_Loue = true WHERE ID_Jeu = ?';

  db.query(sql, [jeuId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la location :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }

    res.status(200).json({ message: 'Jeu loué avec succès' });
  });
};