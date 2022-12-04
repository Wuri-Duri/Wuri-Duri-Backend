import express from 'express';
const router = express.Router();
const fairytaleController = require('../controllers/fairytaleController');

router.get('/main/:userID', fairytaleController.readUserInfo);
router.get('/book/:bookID', fairytaleController.readBook);
router.post('/create/first', fairytaleController.createFirstSentence);
router.post('/create/others', fairytaleController.createNewSentence);
router.post('/create', fairytaleController.createNewBook);
//router.delete('/:bookID', fairytaleController.deleteBook);

module.exports = router;
