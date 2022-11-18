import { Router } from 'express';
import { signUp, signIn } from '../controllers/user.controller.js';
import { signinValidation } from '../middlewares/signinValidation.middleware.js';
import { signupValidation } from '../middlewares/signupValidation.middleware.js';
import { userSchemaValidation } from '../middlewares/userSchemaValidation.middleware.js';

export const authRouter = Router();

authRouter.post('/sign-up', userSchemaValidation, signupValidation, signUp);
authRouter.post('/sign-in', signinValidation, signIn);