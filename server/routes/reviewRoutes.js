// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// ➡️ Route pour créer une critique
router.post('/reviews', reviewController.createReview);

// ➡️ Route pour récupérer toutes les critiques
router.get('/reviews', reviewController.getAllReviews);
// ➡️ Route pour récupérer les critiques par film (work_id)
router.get('/reviews/:work_id', reviewController.getReviewsByWorkId);


module.exports = router;
