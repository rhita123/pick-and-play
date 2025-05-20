

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

module.exports = router;