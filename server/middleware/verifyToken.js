const jwt = require('jsonwebtoken');

const JWT_SECRET = 'vraimentUnSecretChangeLeDansEnv'; // à sécuriser dans .env plus tard

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ error: 'Aucun token fourni' });

  const token = authHeader.split(' ')[1]; // Format "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Token manquant ou mal formaté' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });

    req.user = decoded; // On attache les infos du token à la requête
    next();
  });
};

module.exports = verifyToken;