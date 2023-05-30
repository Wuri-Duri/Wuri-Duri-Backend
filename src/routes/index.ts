import { Router } from 'express';
import fairytaleRouter from './fairytale';
import userRouter from './user';
const router: Router = Router();

router.use('/fairytale', fairytaleRouter);
router.use('/user', userRouter);

export default router;
