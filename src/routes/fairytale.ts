import express from 'express';
const router = express.Router();
const fairytaleController = require('../controllers/fairytaleController');

//추후 checkUser middleware 추가 예정
router.get('/main/:userIDX', fairytaleController.readUserInfo);
router.get('/book/:bookIDX', fairytaleController.readBook);
router.post('/create/first', fairytaleController.createFirstSentence);
router.post('/create/others', fairytaleController.createNewSentence);
router.post('/create', fairytaleController.createNewBook);
//router.delete('/:bookID', fairytaleController.deleteBook);

module.exports = router;
