import express from 'express';
const router = express.Router();
const fairytaleController = require('../controllers/fairytaleController');

router.post('/', fairytaleController.trimNewSentence);
//router.get('/:bookID', fairytaleController.readMyBook);
//router.delete('/:bookID', fairytaleController.deleteMyBook);

module.exports = router;
