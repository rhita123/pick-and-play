const express = require('express');
const router = express.Router();
const jeuController = require('../controllers/jeuController');

router.post('/add', jeuController.addGame);

module.exports = router;