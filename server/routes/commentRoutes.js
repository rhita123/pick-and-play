// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// ➡️ Route pour ajouter un commentaire
router.post('/', commentController.createComment);

// ➡️ Route pour récupérer les commentaires d'une critique spécifique
router.get('/:review_id', commentController.getCommentsByReviewId);
router.get('/', commentController.getAllComments);
module.exports = router;
