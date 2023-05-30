import { Router } from 'express';
import fairytaleController from '../controllers/fairytaleController';
import multer from 'multer';
import upload from "../modules/multer";
const router = Router();

//추후 checkUser middleware 추가 예정
router.get('/main/:userIDX', fairytaleController.readAllBooks);
router.get('/book/:ticketIDX', fairytaleController.readSelectedBook);
router.post('/preset', fairytaleController.createNewTicket);
router.post('/page', fairytaleController.addNewPage);
router.post('/cover', fairytaleController.addCoverInfo);

export default router;
