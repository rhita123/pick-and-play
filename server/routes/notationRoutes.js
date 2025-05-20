const express = require('express');
const router = express.Router();
const notationController = require('../controllers/notationController');
const verifyToken = require('../middleware/verifyToken');

router.post('/:id/notation', verifyToken, notationController.addNotation);
router.get('/:id/notations', notationController.getNotations);

module.exports = router;
