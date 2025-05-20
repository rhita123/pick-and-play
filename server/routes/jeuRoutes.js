const express = require('express');
const router = express.Router();
const jeuController = require('../controllers/jeuController');

router.post('/add', jeuController.addGame);
router.get('/', jeuController.getAllGames);
router.get('/:id', jeuController.getGameById);

module.exports = router;