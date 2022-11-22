import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('Wuri-Duri');
});

router.use('/fairytale', require('./fairytale'));

module.exports = router;
