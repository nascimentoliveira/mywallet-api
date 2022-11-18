import { Router } from 'express';
import { wallet } from '../controllers/wallet.controller.js';
import { authValidation } from '../middlewares/authValidation.middleware.js';

export const walletRouter = Router();
walletRouter.use(authValidation);
walletRouter.get('/wallet', wallet);