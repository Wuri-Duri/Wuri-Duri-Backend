import express from 'express';
const router = express.Router();
const fairytaleController = require('../controllers/fairytaleController');

router.post('/', fairytaleController.trimNewSentence);

module.exports = router;
