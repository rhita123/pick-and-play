const express = require('express');
const router = express.Router();
const jeuController = require('../controllers/jeuController');

router.post('/add', jeuController.addGame);
router.get('/', jeuController.getAllGames);

module.exports = router;