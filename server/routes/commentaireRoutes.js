const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');
const verifyToken = require('../middleware/verifyToken');

// Ajouter un commentaire à un jeu
router.post('/:id/commentaire', verifyToken, commentaireController.createCommentaire);

// Récupérer les commentaires d’un jeu
router.get('/:id/commentaires', commentaireController.getCommentairesByJeu);

// Supprimer un commentaire
router.delete('/commentaire/:id', commentaireController.deleteCommentaire);

// Modifier un commentaire
router.put('/commentaire/:id',  commentaireController.updateCommentaire);

module.exports = router;
