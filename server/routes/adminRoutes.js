

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/verifyToken');

// Middleware pour vérifier le rôle admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Accès refusé. Réservé aux administrateurs.' });
  }
};

router.post('/add-game', verifyToken, isAdmin, (req, res) => {
  const { Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age } = req.body;

  const sql = `INSERT INTO Jeu (Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age, Est_Loue)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, false)`;

  db.query(sql, [Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.status(201).json({ message: 'Jeu ajouté avec succès par admin', id: result.insertId });
  });
});


// Supprimer un jeu (admin uniquement)
router.delete('/jeux/:id', verifyToken, isAdmin, (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM Jeu WHERE ID_Jeu = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du jeu :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }

    res.status(200).json({ message: 'Jeu supprimé avec succès' });
  });
});

// Modifier un jeu (admin uniquement)
router.put('/jeux/:id', verifyToken, isAdmin, (req, res) => {
  const id = req.params.id;
  const {
    Nom, Genre, Description, Note_moyenne,
    Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age
  } = req.body;

  const sql = `
    UPDATE Jeu SET
      Nom = ?, Genre = ?, Description = ?, Note_moyenne = ?, Url = ?, Image = ?,
      Min_Joueurs = ?, Max_Joueurs = ?, Duree = ?, Age = ?
    WHERE ID_Jeu = ?
  `;

  db.query(sql, [Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }

    res.status(200).json({ message: 'Jeu modifié avec succès' });
  });
});

module.exports = router;