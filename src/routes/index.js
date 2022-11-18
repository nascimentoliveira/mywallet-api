import { Router } from 'express';
import authRouter from './authRouter.js';
import walletRouter from './walletRouter.js';
import entryRouter from './entryRouter.js';

const router = Router();

router.use(authRouter);
router.use(walletRouter);
router.use(entryRouter);

export default router;