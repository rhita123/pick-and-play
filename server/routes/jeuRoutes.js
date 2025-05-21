const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const jeuController = require('../controllers/jeuController');

router.post('/add', jeuController.addGame);
router.get('/', jeuController.getAllGames);
router.get('/avis', jeuController.getAvisUtilisateurs);
router.get('/:id', jeuController.getGameById);
router.post('/secure-test', verifyToken, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.email}, tu es authentifié.` });
});
router.patch('/:id/louer', verifyToken, jeuController.louerJeu);
router.post('/:id/note', verifyToken, jeuController.noterJeu);

module.exports = router;