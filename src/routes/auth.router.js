import { Router } from 'express';
import { signUp, signIn } from '../controllers/user.controller.js';
import { signinValidation } from '../middlewares/signinValidation.middleware.js';
import { signupValidation } from '../middlewares/signupValidation.middleware.js';
import { userSchemaValidationSignIn, userSchemaValidationSignUp } from '../middlewares/userSchemaValidation.middleware.js';

export const authRouter = Router();
authRouter.post('/',userSchemaValidationSignIn, signinValidation, signIn);
authRouter.post('/signup', userSchemaValidationSignUp, signupValidation, signUp);