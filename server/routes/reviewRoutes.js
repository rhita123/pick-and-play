// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// ➡️ Route pour ajouter une critique
router.post('/', reviewController.createReview);

// ➡️ Route pour récupérer toutes les critiques
router.get('/', reviewController.getAllReviews);

// ➡️ Route pour récupérer les critiques d'un film précis
router.get('/:work_id', reviewController.getReviewsByWorkId);

router.put('/:id', reviewController.updateReview);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;
