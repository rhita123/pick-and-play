const db = require('../config/db');

// Ajouter un jeu à la wishlist de l'utilisateur connecté
exports.addToWishlist = (req, res) => {
  const idJeu = req.body.ID_Jeu;
  const idUtilisateur = req.user.id;

  const insertSql = 'INSERT IGNORE INTO Wishlist (ID_Utilisateur, ID_Jeu) VALUES (?, ?)';
  db.query(insertSql, [idUtilisateur, idJeu], (err) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de l\'ajout à la wishlist' });
    res.status(200).json({ message: 'Jeu ajouté à la wishlist' });
  });
};

// Supprimer un jeu de la wishlist
exports.removeFromWishlist = (req, res) => {
  const idJeu = req.params.id;
  const idUtilisateur = req.user.id;

  const getWishlistIdQuery = 'SELECT ID_Wishlist FROM Wishlist WHERE ID_Utilisateur = ?';
  db.query(getWishlistIdQuery, [idUtilisateur], (err, rows) => {
    if (err || rows.length === 0) return res.status(500).json({ error: 'Wishlist introuvable' });

    const idWishlist = rows[0].ID_Wishlist;
    const sql = 'CALL Supprimer_Jeu_Wishlist(?, ?)';
    db.query(sql, [idWishlist, idJeu], (err) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de la wishlist' });
      res.status(200).json({ message: 'Jeu supprimé de la wishlist' });
    });
  });
};

// Voir les jeux de la wishlist
exports.getWishlist = (req, res) => {
  const idUtilisateur = req.user.id;
  console.log("ID utilisateur (token):", idUtilisateur);

  const sql = `
    SELECT j.*
    FROM Wishlist w
    JOIN Jeu j ON w.ID_Jeu = j.ID_Jeu
    WHERE w.ID_Utilisateur = ?
  `;

  db.query(sql, [idUtilisateur], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération de la wishlist' });
    console.log("Jeux récupérés dans la wishlist:", rows);
    res.status(200).json(rows);
  });
};