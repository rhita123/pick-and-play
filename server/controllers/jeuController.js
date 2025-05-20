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

exports.getGamesByMinNote = (req, res) => {
  const minNote = parseFloat(req.query.minNote);

  if (isNaN(minNote)) {
    return res.status(400).json({ error: 'minNote doit être un nombre valide' });
  }

  const sql = 'SELECT * FROM Jeu WHERE Note_moyenne >= ?';

  db.query(sql, [minNote], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des jeux filtrés :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.status(200).json(results);
  });
};
exports.noterJeu = (req, res) => {
  const jeuId = req.params.id;
  const { note } = req.body;

  if (typeof note !== 'number' || note < 0 || note > 10) {
    return res.status(400).json({ error: 'La note doit être un nombre entre 0 et 10.' });
  }

  // On commence par récupérer l'ancienne moyenne et le nombre de notes (s'il existe une colonne pour ça)
  const getSql = 'SELECT Note_moyenne FROM Jeu WHERE ID_Jeu = ?';

  db.query(getSql, [jeuId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de la note :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }

    const ancienneNote = results[0].Note_moyenne || 0;

    // Nouvelle moyenne simple (à ajuster si tu veux stocker nombre de votes)
    const nouvelleNote = (ancienneNote + note) / 2;

    const updateSql = 'UPDATE Jeu SET Note_moyenne = ? WHERE ID_Jeu = ?';
    db.query(updateSql, [nouvelleNote, jeuId], (err2) => {
      if (err2) {
        console.error('Erreur lors de la mise à jour de la note :', err2);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }

      res.status(200).json({ message: 'Note enregistrée avec succès.' });
    });
  });
};