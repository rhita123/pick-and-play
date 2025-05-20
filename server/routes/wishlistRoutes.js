

const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add', verifyToken, wishlistController.addToWishlist);
router.get('/', verifyToken, wishlistController.getWishlist);
router.delete('/:id', verifyToken, wishlistController.removeFromWishlist);

module.exports = router;