import { Router } from 'express';
import { wallet } from '../controllers/walletController.js';

const walletRouter = Router();

walletRouter.get('/wallet', wallet);

export default walletRouter;