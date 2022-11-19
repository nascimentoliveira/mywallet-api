import { Router } from 'express';
import { authRouter } from './auth.router.js';
import { walletRouter } from './wallet.router.js';
import { entryRouter } from './entry.router.js';

export const router = Router();
router.use(authRouter);
router.use(walletRouter);
router.use(entryRouter);