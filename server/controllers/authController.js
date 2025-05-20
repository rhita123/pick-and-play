const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'vraimentUnSecretChangeLeDansEnv'; // à sécuriser plus tard

exports.registerUser = (req, res) => {
  const { Nom, Email, Mot_de_passe } = req.body;

  bcrypt.hash(Mot_de_passe, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Erreur lors du hash du mot de passe' });

    const sql = 'INSERT INTO Utilisateur (Nom, Email, Mot_de_passe) VALUES (?, ?, ?)';
    db.query(sql, [Nom, Email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email déjà utilisé' });
        }
        return res.status(500).json({ error: 'Erreur serveur' });
      }

      const userId = result.insertId;
      const wishlistSql = 'INSERT INTO Wishlist (ID_Utilisateur) VALUES (?)';

      db.query(wishlistSql, [userId], (wishlistErr) => {
        if (wishlistErr) {
          return res.status(500).json({ error: 'Utilisateur créé mais erreur sur la wishlist' });
        }

        res.status(201).json({ message: 'Utilisateur enregistré avec succès et wishlist créée' });
      });
    });
  });
};

exports.loginUser = (req, res) => {
  const { Email, Mot_de_passe } = req.body;

  const sql = 'SELECT * FROM Utilisateur WHERE Email = ?';
  db.query(sql, [Email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (results.length === 0) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const user = results[0];
    bcrypt.compare(Mot_de_passe, user.Mot_de_passe, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

      const token = jwt.sign({ id: user.ID_Utilisateur, email: user.Email, role: user.Role }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Connexion réussie', token });
    });
  });
};