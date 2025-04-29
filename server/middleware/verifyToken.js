// server/middleware/verifyToken.js

module.exports = (req, res, next) => {
    const userHeader = req.headers['x-user'];
  
    if (!userHeader) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
  
    try {
      req.user = JSON.parse(userHeader); // on transforme le texte en objet
      next(); // on continue vers le contrôleur
    } catch (e) {
      return res.status(400).json({ message: 'Utilisateur invalide' });
    }
  };